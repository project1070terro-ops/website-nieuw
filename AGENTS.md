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

## Supabase (donatiedatabase)

De donaties staan in het eigen Supabase-project van de gebruiker (organisatie `project1570`, project `project1070terro-ops's Project`, regio eu-west-2).

**Zo kom je er (voor de gebruiker):**

1. Ga naar https://supabase.com → **Sign in** → **Continue with GitHub** (account `project1070terro-ops`)
2. Klik op de organisatie **project1570** → project **"project1070terro-ops's Project"**
3. **Table Editor** (linkermenu) → tabel **donations**: hier kun je donaties bekijken, aanpassen of testdonaties verwijderen
4. **SQL Editor** (linkermenu): voor database-wijzigingen
5. **Project Settings → API Keys**: hier staan de Project URL en publishable key (staan ook in `.env`)

De tabel is opgezet via `supabase/migrations/20260830143653_create_project1070_donations.sql`. RLS-policies: publiek mag SELECT + INSERT, geen UPDATE/DELETE (wissen kan dus enkel via het dashboard).
