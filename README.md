# Virtual Cat Park

A cat encyclopedia and virtual pet website built for a first-year programming lab.
It uses only HTML, CSS and vanilla JavaScript: no framework, no backend, no external
service and no package manager.

---

## 1. What this project is

The page has two parts.

- **Cat Encyclopedia** — three breeds, each with a short profile and a local
  illustration.
- **My Virtual Cat** — you adopt one cat, give it a name and take care of it over
  several days.

The visual design is deliberately simple so that a first-year student can read the
code and explain every part of it.

---

## 2. Features

**Cat Encyclopedia**

- Exactly three breeds: British Shorthair, Maine Coon and Siamese.
- Each card lists the size, the personality and the everyday care.
- Each card uses a project-created SVG drawing stored in `assets/`.
- Every illustration has descriptive `alt` text.

**Adoption**

- Pick a breed and type a name, then press **Adopt**.
- The name is checked before adoption, and a helpful message appears when it is not
  accepted.
- Only one cat can be owned at a time.

**Care**

- **Feed** and **Play** both raise happiness.
- **Next Day** moves the cat forward in time and shows the growth stage.

**Growth**

- A growth bar and a written caption both show the current stage.
- The stage is always written out as words, so it is never communicated by colour or
  size alone.

**Saved progress**

- The cat is saved automatically and comes back after a page refresh.
- **Start Over** deletes the saved cat, but only after you confirm.

---

## 3. How to preview the page

The page needs to be opened through a local web server. Opening the file directly
with a `file://` address is not recommended, because browser storage can behave
differently there.

**Option A — VS Code Live Server (recommended)**

1. Open the `virtual-cat-park` folder in VS Code.
2. Open the Extensions panel and install **Live Server** by Ritwick Dey.
3. Right-click `index.html` in the Explorer and choose **Open with Live Server**.
4. The browser opens a local address such as `http://127.0.0.1:5500`.

**Option B — Python built-in server**

```powershell
cd virtual-cat-park
py -m http.server 8000
```

Then open `http://localhost:8000` in the browser.

> Keep using the **same browser** and the **same local address** while testing saved
> progress. Changing the browser or the address means a different storage area, so
> the saved cat will look missing.

---

## 4. Happiness and growth rules

| Rule | Value |
| --- | --- |
| Starting happiness | 50 |
| Starting day | Day 1 |
| Feed | +10 happiness per click |
| Play | +10 happiness per click |
| Happiness range | Never below 0, never above 100 |
| Next Day | +1 day and −5 happiness |
| Day 1 | Kitten |
| Day 2 and Day 3 | Young Cat |
| Day 4 and later | Adult Cat |

The growth bar has three clearly different widths, one for each stage, and the
caption under it always states the stage in words.

---

## 5. Where the saved data lives

The cat's name, breed, day number and happiness are stored in the browser's
**localStorage**.

- The storage key is `virtualCatParkPetV1`.
- The data is saved right after adoption and again after every **Feed**, **Play** and
  **Next Day** action.
- The data stays in the browser on this computer. It is **not** stored in a GitHub
  account, it is **not** uploaded by Git, and it does **not** follow you to another
  computer or another browser.
- Clearing the browser's site data, or using **Start Over**, removes it.

So a GitHub repository shows the code, not the cat you raised.

---

## 6. About the illustrations

The three pictures in `assets/` are project-created SVG drawings written for this
lab. They are **not** real cat photographs, and this project does not link to any
copyrighted photo or external image website.

---

## 7. Manual testing checklist

Work through this list yourself in the browser before submitting. Tick each line
only after you have seen it happen.

**Encyclopedia**

- [ ] The page title and the welcome message appear.
- [ ] All three breed cards are visible with their notes.
- [ ] All three illustrations load. No broken image icon appears.
- [ ] Make the window narrow. The cards stack and no horizontal scrolling appears.

**Adoption**

- [ ] Pressing **Adopt** with an empty name shows a message and adopts nothing.
- [ ] A name that is only spaces is rejected.
- [ ] `   Mochi   ` is accepted and becomes `Mochi`.
- [ ] A name with an internal space, such as `Miss Mochi`, keeps that space.
- [ ] The input stops accepting characters at 20.
- [ ] A name containing `<` and `>` is shown as plain text, not as markup.
- [ ] A new cat shows Day 1, Kitten and happiness 50.

**Feed and Play**

- [ ] Feeding raises happiness by 10.
- [ ] Playing raises happiness by 10.
- [ ] Repeated clicking stops at 100 and never goes past it.

**Growth**

- [ ] Day 1 shows Kitten.
- [ ] Day 2 and Day 3 show Young Cat.
- [ ] Day 4 shows Adult Cat.
- [ ] Every Next Day click removes 5 happiness and happiness stops at 0.
- [ ] The growth bar has three visibly different lengths.

**Saved progress**

- [ ] Adopt a cat, refresh, and the same cat comes back.
- [ ] Press Play, refresh, and the new happiness is kept.
- [ ] Move to Day 4, press Feed, refresh, and the day and happiness are kept.

**Start Over**

- [ ] **Start Over** asks for confirmation.
- [ ] Choosing **Cancel** keeps the cat and its saved progress.
- [ ] Choosing **OK** returns to the adoption form and deletes the saved cat.
- [ ] After confirming and refreshing, the old cat does not come back.

---

## 8. Project files

```
virtual-cat-park/
├── .gitignore
├── README.md
├── index.html      page structure
├── style.css       appearance and responsive layout
├── script.js       behaviour: adoption, care, growth, storage
└── assets/
    ├── british-shorthair.svg
    ├── maine-coon.svg
    └── siamese.svg
```

HTML gives the page its structure, CSS gives it its appearance, and JavaScript gives
it its behaviour.
