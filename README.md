# Today — Your Daily Sanctuary

A high-fidelity, fully interactive wellness and intentionality app built as a single HTML file. No installs, no accounts, no internet required after the first load. Just open it in your browser.

---

## What It Is

**Today** is a personal daily companion designed around the idea of a "digital sanctuary" — a calm, uncluttered space to set intentions, track your wellbeing, and reflect on your day. The aesthetic is Soft UI (Neumorphism): gentle shadows, pastel tones of peach, mint, and sky blue, and rounded surfaces that feel tactile and warm.

All your data stays local — saved in your browser's `localStorage` and restored automatically every time you open the file.

---

## How to Use

### Opening the App
Double-click `today-app.html` or drag it into any modern browser (Chrome, Safari, Firefox, Edge). No server needed.

---

### Today Tab 🏠

This is your main screen. Work through it top to bottom each morning.

**Greeting & Clock**
The header shows a live clock and greets you by name with the correct time of day (Morning / Afternoon / Evening). Update your name in Settings and the greeting updates instantly.

**Breathing Bubble**
- Tap the glowing sphere to start a guided 4-4-6-2 breathing cycle (Inhale → Hold → Exhale → Hold)
- The countdown and label update in real time
- Tap again to pause; tap once more to resume

**Hydration**
- 8 glass buttons (💧 / 🫙) represent your daily water goal
- Tap an empty glass to fill up to that point
- Tap a filled glass to remove it and everything above it
- Change your daily goal (1–20 glasses) in Settings → Daily glasses goal

**Vibe Check**
Tap one of the five mood buttons (😔 😐 🌸 😊 ✨) to log how you're feeling. Your pick updates the Trends tab's Sunday bar automatically.

**The Big 3**
Three tasks — your most important intentions for the day.
- Tap the checkbox to mark a task done (or undone)
- Tap the task text to edit it inline; press Enter or click away to save
- The progress counter ("1 / 3 done") updates live

**Three Good Things**
Three gratitude fields. Tap any line and type what you're grateful for today. Saved automatically as you type.

**One Win of the Day**
A freeform text area at the bottom. Write your single biggest win. Tap anywhere in the frosted box to start typing.

---

### Trends Tab 📊

A snapshot of your week. Opens automatically refreshed with your current data.

- **Day Streak** — your consecutive days using the app (static demo)
- **Glasses Today** — syncs live with your hydration count
- **Tasks Done** — syncs live with your Big 3 checkboxes
- **Task Completion grid** — Mon–Sun view of the week
- **Mood This Week** — bar chart of daily mood; Sunday bar updates when you change your vibe on the Today tab

---

### Reflect Tab 🌙

Your evening wind-down space.

- Pick how today felt overall with the mood chip row (Hard / Meh / Nice / Great / Epic)
- Write freely into three guided prompts:
  - *"What made today meaningful?"*
  - *"What would you do differently?"*
  - *"One thing I want to carry into tomorrow…"*

All text is saved as you type and restored on your next visit.

---

### Settings Tab ⚙️

**Profile**
| Field | What it does |
|---|---|
| Name | Updates the greeting on the Today tab instantly |
| Daily glasses goal | Changes the number of glass buttons (1–20) |
| Location | Stored for display (weather integration not yet live) |

**Notifications** — toggle Morning reminder, Hydration nudges, and Evening reflection on/off. State is saved.

**Appearance**
| Option | What it does |
|---|---|
| Theme | Switch between Warm Peach, Ocean Mint, and Lavender Dream color palettes |
| Reduce motion | Pauses all CSS animations site-wide for a calmer experience |

---

## Data & Privacy

Everything is stored in your browser's `localStorage` under the key `today-app-v1`. Nothing is sent anywhere. To reset all data, open your browser's DevTools → Application → Local Storage → delete the `today-app-v1` entry, then refresh.

---

## Browser Support

Works best in **Chrome** or **Safari**. Requires a modern browser with support for CSS custom properties, `localStorage`, and `backdrop-filter`.

---

*Made with intention. Open daily for best results.*
