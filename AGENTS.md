# Project 15/70 — Agent Notes

## Development

Start the Vite development server with:

```bash
npm run dev
```

This runs `vite --host 0.0.0.0 --cors` and makes the site available on the local network.

- Local URL: `http://localhost:5173/`
- Network URL (laptop on this Wi-Fi): `http://192.168.0.124:5173/`

The server must be restarted each session; it does not run in the background across sessions.

## Build & Preview

```bash
npm run build    # production build
npm run preview  # preview the production build
```

## Project Structure

- React + TypeScript + Vite
- CSS in `src/index.css`
- Translation content in `src/constants.ts` (NL, EN, ES)
- Client-side page switching in `src/App.tsx` (no React Router)

## Git

- Local branch: `master`
- Remote branch: `origin/main`
- Push command:

```bash
git push origin master:main
```

- Commit author for this project:

```bash
git -c user.name="Project 15/70" -c user.email="project1070terro@gmail.com" commit -a -m "..."
```
