# FishSlayR — PWA Setup

This folder is a complete, installable Progressive Web App. Once it's live on GitHub Pages,
you can install it on your phone's home screen and it runs like a real app, offline.

## Files in this folder
- `index.html` — the whole app (this is what GitHub Pages serves by default)
- `manifest.webmanifest` — app name, icon, colors, full-screen setting
- `service-worker.js` — makes the app work offline once installed
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` — app icons

**Keep all these files together in the same folder.** They reference each other with relative paths.

---

## Step 1 — Get the files into your repo (github.com/bboard01/FishSlayr)

### Easiest (from a computer, drag-and-drop, no git commands)
1. Go to https://github.com/bboard01/FishSlayr
2. Click **Add file → Upload files**
3. Drag in ALL the files from this folder (index.html, manifest.webmanifest, service-worker.js, and all the .png icons)
4. Scroll down, click **Commit changes**

### From your phone
The GitHub mobile app can't upload arbitrary files easily, but the GitHub website in your
phone's browser can: open the repo, **Add file → Upload files**, and pick the files.

---

## Step 2 — Turn on GitHub Pages
1. In the repo, click **Settings** (top right of the repo page)
2. Left sidebar → **Pages**
3. Under **Source**, choose **Deploy from a branch**
4. Branch: pick **main** (or master), folder: **/ (root)**, then **Save**
5. Wait ~1 minute. The page will show your live URL, which will be:

   **https://bboard01.github.io/FishSlayr/**

---

## Step 3 — Install it on your phone
Open **https://bboard01.github.io/FishSlayr/** on your phone, then:

- **iPhone (must use Safari — Chrome on iOS can't install PWAs):**
  Tap the **Share** button → **Add to Home Screen** → **Add**.

- **Android (Chrome):**
  Tap the **⋮** menu → **Install app** (or **Add to Home Screen**).

You'll get a FishSlayR icon on your home screen. Launch it — no browser bars, works offline,
keeps your data locally just like before.

---

## Updating the app later
When you upload a new `index.html`, also bump the version number at the top of
`service-worker.js` (change `fishslayr-v1.2.0` to `v1.2.1`, etc.). That tells installed
phones to fetch the new version instead of serving the old cached one. Then re-upload both files.

## Notes
- Your fishing data (trips, catches, loadouts) and photos stay on your device, per browser.
  Installing the PWA does not upload anything to GitHub or anywhere else.
- If you want the data to sync across devices or back up to the cloud, that's the next step
  up (a real database like Supabase) — the PWA is the delivery layer, not cloud storage.
