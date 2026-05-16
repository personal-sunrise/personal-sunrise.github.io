![Menu Screenshot](https://raw.githubusercontent.com/anafro/anafro/refs/heads/main/Screenshots/Personal-Sunrise-Index.png)

# 🌅 Personal Sunrise

> Which star would you like to wake up under?

**Personal Sunrise** is a browser-based alarm experience that gently brightens your screen during the last 20 minutes of your sleep — simulating a natural sunrise to wake you up softly, without a jarring alarm.

**[→ Try it live](https://personal-sunrise.github.io)**

---

## How It Works

Set your wake-up time and choose a "rising star" — each star has a different color temperature, from cool blue-white to warm orange-red. In the 20 minutes before your alarm, your screen gradually transitions from black to that star's light color, coaxing you awake naturally.

Just open the page, configure it, hit **Schedule your personal sunrise**, and leave your screen on overnight.

---

## Features

- 🕐 **Awake time selector** — choose from 4:00 to 11:00
- ⭐ **Rising star themes** — 8 color temperatures to pick from:

  | Star | Color |
  |------|-------|
  | Kriptonix | Green |
  | Spica | Cyan |
  | Vega | Blue-white |
  | Kappa 2 | White |
  | Arcturus | Pale yellow |
  | Sun | Yellow |
  | Konhab | Orange |
  | Puppis | Red-orange |

- 🌑 **Starts fully dark** — no light until the sunrise window begins
- 📱 **Responsive** — works on mobile and desktop

---

## Usage

No installation needed. Just open [personal-sunrise.github.io](https://personal-sunrise.github.io) in your browser:

1. Pick your **awake time**
2. Choose your **rising star** (color temperature)
3. Click **Schedule your personal sunrise**
4. Leave the tab open with your screen on overnight

For best results, set your screen brightness to maximum before sleeping and place your device where the light will reach you.

---

## Local Development

Clone the repo and open `index.html` directly — no build step required:

```bash
git clone https://github.com/personal-sunrise/personal-sunrise.github.io.git
cd personal-sunrise.github.io
# open index.html in your browser
```

Files:

```
index.html      # main page and UI
script.js       # sunrise scheduling and light animation logic
styles.css      # layout and theming
logo.svg        # app logo
star_1.svg      # falling star particle used by Sulfa lib*
```
<sub>* [Sulfa](https://github.com/anafro-incubator/sulfa) is a particle library written in pure JS</sub>

---

## License

MIT © [Anatoly Frolov (anafro)](https://github.com/anafro)
