# 🧠 DevNotes — A Developer Notes App

DevNotes is a lightweight, markdown-based note-taking app tailored for developers. Take quick notes, jot down code snippets, tag your thoughts, and search across them — all while keeping everything local or syncing with GitHub Gists (coming soon).

---

## ✨ Features

- 📝 Write notes in **Markdown**
- 🏷️ Tag and categorize notes
- 🔍 Search by keyword or tag (powered by Fuse.js)
- 💾 Persistent storage with **localStorage** and **IndexedDB**
- 🧪 Fully tested (unit, integration, E2E with Playwright)
- 🚀 CI/CD with GitHub Actions
- 📊 Test coverage reports
- 🧠 (Optional) AI features: summarize notes, generate flashcards

---

## 📦 Tech Stack

| Area     | Tech                                        |
| -------- | ------------------------------------------- |
| Frontend | React + TypeScript                          |
| Styling  | Vanilla CSS (Tailwind coming soon)          |
| Markdown | `react-markdown`                            |
| Search   | `fuse.js`                                   |
| Testing  | `Vitest` + `Testing Library` + `Playwright` |
| CI/CD    | GitHub Actions                              |
| Storage  | `localStorage`, `IndexedDB`                 |
| Deploy   | Vercel / Netlify                            |

---

## 🧪 Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/devnotes.git
cd devnotes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

### 4. Run tests

```bash
npm run test
```

### 5. Check test coverage

```bash
npm run coverage
```

---

## 🧰 Available Scripts

| Script     | Description                  |
| ---------- | ---------------------------- |
| `dev`      | Runs app in dev mode         |
| `test`     | Runs unit/integration tests  |
| `coverage` | Outputs test coverage report |
| `build`    | Builds for production        |
| `preview`  | Serves built app locally     |

---

## 📁 Folder Structure

```
src/
├── components/       # React components
├── services/         # Storage & search services
├── hooks/            # Custom hooks
├── tests/            # Test helpers & configs
└── App.tsx           # Main app entry
```

---

## 🔧 CI/CD

- GitHub Actions runs all tests and linting on push.
- PRs must pass before merging.
- Test coverage reports are uploaded as artifacts.

---

## 🚧 Roadmap

- [x] Create note with markdown
- [x] Tagging + filtering
- [x] Full-text search
- [x] TDD + test coverage
- [ ] GitHub Gist sync
- [ ] AI features: summarize / flashcards

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request for discussion.

---

## 📄 License

MIT © [Your Name]
