
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const videos = [
  ['Romantic Hits | Hindi Love Songs', 'Music Junction', 'Music', '♫', 'pink'],
  ['Beautiful Kashmir', 'Travel India', 'Travel', '🏔️', 'green'],
  ['Learn English in 10 Minutes', 'Study Smart', 'Learning', 'A+', 'blue'],
  ['Top Gaming Moments', 'Game Zone', 'Gaming', '🎮', 'purple'],
  ['Indian Street Food', 'Food Explorer', 'Food', '🍜', 'orange'],
  ['Relaxing Instrumental Music', 'Peaceful Vibes', 'Music', '♪', 'teal']
];

function App() {
  const [tab, setTab] = useState('Home');
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [video, setVideo] = useState(null);
  const [login, setLogin] = useState(false);
  const [liked, setLiked] = useState(() => JSON.parse(localStorage.getItem('likes') || '[]'));
  const [subs, setSubs] = useState(() => JSON.parse(localStorage.getItem('subs') || '[]'));

  const categories = ['All', 'Music', 'Gaming', 'Learning', 'Travel', 'Food'];
  const nav = [['Home', '⌂'], ['Shorts', '▣'], ['Subscriptions', '▤'], ['You', '●']];

  const filtered = useMemo(() => videos.filter(v =>
    (cat === 'All' || v[2] === cat) &&
    v.join(' ').toLowerCase().includes(q.toLowerCase())
  ), [cat, q]);

  function like(title) {
    const next = liked.includes(title)
      ? liked.filter(x => x !== title)
      : [...liked, title];
    setLiked(next);
    localStorage.setItem('likes', JSON.stringify(next));
  }

  function subscribe(channel) {
    const next = subs.includes(channel)
      ? subs.filter(x => x !== channel)
      : [...subs, channel];
    setSubs(next);
    localStorage.setItem('subs', JSON.stringify(next));
  }

  return <div className="app">
    <header>
      <div className="brand"><i>▶</i><b>IndiaTube</b><small>IN</small></div>
      <div className="search">
        <input placeholder="Search videos" value={q} onChange={e => setQ(e.target.value)} />
        <button>⌕</button>
      </div>
      <button onClick={() => setLogin(true)}>＋ Upload</button>
      <button className="avatar" onClick={() => setTab('You')}>A</button>
    </header>

    <div className="layout">
      <aside>
        {nav.map(([n, icon]) =>
          <button key={n} onClick={() => setTab(n)} className={tab === n ? 'active' : ''}>
            <span>{icon}</span>{n}
          </button>
        )}
      </aside>

      <main>
        <div className="chips">
          {categories.map(c =>
            <button key={c} className={cat === c ? 'chosen' : ''} onClick={() => setCat(c)}>{c}</button>
          )}
        </div>

        {tab === 'You' ? <>
          <h2>Guest Profile</h2>
          <button onClick={() => setLogin(true)}>Login / Sign up</button>
          <p>Liked videos: {liked.length}</p>
          <p>Subscriptions: {subs.length}</p>
          <button onClick={() => setLogin(true)}>Create Channel</button>
          <button onClick={() => setLogin(true)}>Upload Video</button>
        </> : tab === 'Subscriptions' ? <>
          <h2>My Subscriptions</h2>
          {subs.map(s => <p key={s}>{s}</p>)}
        </> : <>
          <h2>{tab === 'Shorts' ? 'Shorts' : 'Recommended Videos'}</h2>
          <div className="grid">
            {filtered.map(v => <article key={v[0]}>
              <div className={'thumb ' + v[4]} onClick={() => setVideo(v)}>
                <span>{v[3]}</span>
                <small>Video</small>
              </div>
              <div className="details">
                <div className="channel">{v[1][0]}</div>
                <div className="meta">
                  <b onClick={() => setVideo(v)}>{v[0]}</b>
                  <p>{v[1]}</p>
                </div>
              </div>
              <button onClick={() => like(v[0])}>
                {liked.includes(v[0]) ? '♥ Liked' : '♡ Like'}
              </button>
              <button onClick={() => subscribe(v[1])}>
                {subs.includes(v[1]) ? 'Subscribed' : 'Subscribe'}
              </button>
            </article>)}
          </div>
        </>}
      </main>
    </div>

    <nav className="bottom">
      {nav.map(([n, icon]) =>
        <button key={n} onClick={() => setTab(n)}>
          <span>{icon}</span><small>{n}</small>
        </button>
      )}
    </nav>

    {video && <div className="overlay" onClick={() => setVideo(null)}>
      <div className="player" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setVideo(null)}>✕</button>
        <div className={'screen ' + video[4]}>{video[3]}</div>
        <h3>{video[0]}</h3>
        <p>{video[1]}</p>
        <button onClick={() => like(video[0])}>♡ Like</button>
        <button onClick={() => subscribe(video[1])}>Subscribe</button>
        <p>Demo preview only. Real video streaming needs a backend.</p>
      </div>
    </div>}

    {login && <div className="overlay" onClick={() => setLogin(false)}>
      <div className="player" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setLogin(false)}>✕</button>
        <h2>Login to IndiaTube</h2>
        <p>Upload और Channel बनाने के लिए Login जरूरी है।</p>
        <button onClick={() => alert('Google Login backend setup pending')}>Continue with Google</button>
        <p>Email Login</p>
        <input placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <button onClick={() => alert('Email Login backend setup pending')}>Login</button>
        <p>Authentication setup अभी बाकी है।</p>
      </div>
    </div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);

