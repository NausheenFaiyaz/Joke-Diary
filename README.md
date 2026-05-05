# Joke Diary

A playful, notebook-themed **Jokes Viewer Application** built with **React + Vite** using the FreeAPI public jokes endpoint.

## Live Demo

- **Deployed URL:** https://joke-diary.vercel.app/

## Project Overview

This project was built for:

- **FreeAPI: Jokes Viewer Application**

The app fetches jokes from the API and presents them in a clean, interactive card-based interface with pagination.

## Features

- Fetches all available jokes from the API (paginated fetch loop)
- Displays jokes in a responsive grid
- Shows **9 joke cards per page**
- Pagination controls with `Prev` and `Next`
- Notebook-inspired card design (rings, ruled lines, pastel accents)
- Loading and error state handling
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- **React** (functional components + hooks)
- **Vite** (build/dev tooling)
- **CSS** (custom styling, no UI framework)
- **FreeAPI** public jokes endpoint

## API Used

Base endpoint:

`https://api.freeapi.app/api/v1/public/randomjokes`

The app fetches paginated data using:

`?page=<pageNumber>&limit=10`

## Folder Structure

```text
Jokes-Viewer-Application/
+- src/
¦  +- components/
¦  ¦  +- Header.jsx
¦  ¦  +- JokeCard.jsx
¦  ¦  +- PrevButton.jsx
¦  ¦  +- NextButton.jsx
¦  +- App.jsx
¦  +- App.css
¦  +- index.css
¦  +- main.jsx
+- index.html
+- package.json
+- README.md
```

## Component Architecture

- `Header`
  - Displays app title and loaded joke count
- `JokeCard`
  - Renders each joke in notebook-style card UI
- `PrevButton` / `NextButton`
  - Navigates between paginated joke pages
- `App`
  - Handles fetching all joke pages, state management, and page slicing (9 per page)

## How Pagination Works

- All jokes are fetched from the API page-by-page until no `nextPage` exists.
- Results are normalized and stored in state.
- UI slices jokes into pages of 9 items each.
- `Prev` and `Next` change the active UI page.

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Jokes-Viewer-Application
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Runs the Vite development server
- `npm run build` - Creates production build
- `npm run preview` - Serves production build locally
- `npm run lint` - Runs ESLint checks

## Deployment

This project is deployed on **Vercel**:

- https://joke-diary.vercel.app/

## Future Improvements

- Add search/filter by joke text
- Add category/tag filtering if API supports categories
- Add copy-to-clipboard button on each card
- Add favorites list using local storage

## Author

Built by **Logme** as part of FreeAPI practice projects.
