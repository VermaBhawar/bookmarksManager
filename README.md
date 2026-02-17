# Smart Bookmark App

A simple bookmark manager built with Next.js and Supabase.

## Features

- Google sign-in with Supabase Auth
- Add and delete bookmarks
- User-scoped bookmark queries
- Real-time bookmark refresh when data changes
- URL validation on bookmark creation

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Supabase (`@supabase/supabase-js`)
- Tailwind CSS v4

## Project Structure

```text
src/
  app/
    auth/callback/page.tsx    # OAuth callback exchange
    page.tsx                  # Home page UI composition
  components/
    BookmarkForm.tsx
    BookmarkList.tsx
  hooks/
    useAuthSession.ts
    useBookmarks.ts
  lib/
    supabase.ts
    googleAuth.ts
    bookmark.ts
  types/
    bookmark.ts
```

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- A Supabase project
- Google OAuth provider configured in Supabase

## Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

Create a `bookmarks` table (SQL editor):

```sql
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamptz not null default now()
);
```

Recommended indexes:

```sql
create index if not exists bookmarks_user_id_idx on public.bookmarks(user_id);
create index if not exists bookmarks_created_at_idx on public.bookmarks(created_at desc);
```

Enable Google provider in Supabase Auth and set the site URL / redirect URL for local development:

- Site URL: `http://localhost:3000`
- Redirect URL: `http://localhost:3000/auth/callback`

## Install and Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- URL input accepts only valid `http` / `https` URLs.
- OAuth callback handler is implemented at `src/app/auth/callback/page.tsx`.
- Bookmark data logic lives in `src/lib/bookmark.ts` and `src/hooks/useBookmarks.ts`.

# Challenges & How I Solved Them

Working with a new stack (Next.js + Supabase)
My background is mainly MERN, so this stack was new to me. I relied a lot on ChatGPT and the VS Code Codex extension to guide me. Instead of generating the whole app at once, I built it step-by-step and tried to understand what each generated part was doing before moving forward.

Too much logic in one component
Initially most functionality was inside the Home component, which made things tightly coupled. I refactored it into smaller pieces (BookmarkForm, BookmarkList, and a useAuthSession hook) so each part had a clearer responsibility.

Handling auth and realtime together
Managing Supabase session state and realtime updates across components took some trial and error. I centralized auth logic in a small custom hook and made sure realtime subscriptions were properly created and cleaned up.

Learning to use AI as a development partner
Since this was my first Next.js + Supabase project, I used Codex and ChatGPT heavily. Rather than copying outputs blindly, I iterated with prompts, adjusted generated code, and compared alternatives to understand the implementation better.