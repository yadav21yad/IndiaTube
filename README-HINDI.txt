INDIATUBE - ANDROID APK BUILD KIT

Is project mein YouTube-jaisa original IndiaTube mobile interface hai: Home feed, category filters, search, Shorts preview, Subscriptions, profile tab aur sample video preview.

IMPORTANT: Yeh abhi front-end demo hai. Real accounts, video upload/storage, live streaming, comments, subscriptions aur moderation backend abhi connect nahi hain.

REDMI 9 SE APK BANANE KE LIYE (GitHub Actions cloud build):
1. GitHub account mein sign in karein.
2. New repository banayein: indiatube-app
3. Is ZIP ko extract karke saari files repository ke root mein upload karein. Hidden .github folder bhi upload hona chahiye.
4. GitHub repository ke Actions tab mein workflow enable karein.
5. Actions tab > Build IndiaTube APK > Run workflow.
6. Build successful hone par run page ke Artifacts mein IndiaTube-debug-APK download karein.
7. Downloaded artifact ZIP extract karein; app-debug.apk ko install karein.

NOTE: APK debug/testing build hai, Play Store release nahi. Is ChatGPT environment mein Android SDK/Gradle installed nahi hai, isliye APK yahan directly compile nahi hua. Cloud build ke liye GitHub par project upload karna hoga.
