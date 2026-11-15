# Robotics for Social Good

A free, open-source online course that introduces beginners with little or no hardware experience to robotics. Students start by brainstorming an application they care about, then learn the hardware, microcontroller, and software skills to build toward it.

Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, Clerk
(authentication), and UploadThing (file uploads).

## Setup

### Prerequisites

- Node.js 20.9 or newer
- A PostgreSQL database (see below)
- Free accounts at [Clerk](https://clerk.com) and [UploadThing](https://uploadthing.com)

### 1. Install

```bash
git clone <your-repository-url>
cd robotics-course
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

| Variable | Where to get it |
| --- | --- |
| `DATABASE_URL` | Your PostgreSQL connection string (plain `postgres://...`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard, API keys |
| `CLERK_SECRET_KEY` | Clerk dashboard, API keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `UPLOADTHING_TOKEN` | UploadThing dashboard, API keys |
| `NEXT_PUBLIC_TEACHER_IDS` | Comma-separated Clerk user IDs allowed to create courses |

Never commit `.env`.

### 3. Database

Use any PostgreSQL database. For quick local development, `npx prisma dev` starts one and
prints a direct `postgres://` connection string; free hosted options such as Neon or
Supabase also work. Put the connection string in `DATABASE_URL`, then:

```bash
npx prisma generate
npx prisma migrate dev
npx tsx scripts/seed.ts
```

The seed script creates the "Robotics" category.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create an account, then find your user
ID in the Clerk dashboard (Users) and add it to `NEXT_PUBLIC_TEACHER_IDS`. Restart the dev
server. A "Teacher mode" button now appears in the navbar.

## Adding a course or module

You need a user listed in `NEXT_PUBLIC_TEACHER_IDS`.

### Add a course

1. Click **Teacher mode**, then **New course**, and enter a title.
2. On the course setup page, fill in the description, image, and category.
3. Add modules (below).
4. When every field is complete, click **Publish**. A course needs a title, description, image, category, and at least one published module.

### Add a module

1. On the course setup page, under **Course modules**, click **Add a module** and enter a title. Drag modules to reorder them.
2. Click the pencil next to the module to open its setup page.
3. Write the module content in the editor. A video is optional: paste a YouTube or Vimeo link.
4. Click **Publish** on the module. A module needs a title and content to publish.

Attachments (files students may need) are added from the course setup page.

### Add a category

Add the name to `scripts/seed.ts` and run `npx tsx scripts/seed.ts`. To give the category a
custom icon on the browse page, add it to `iconMap` in
`app/(dashboard)/(routes)/search/_components/categories.tsx`.

## Contributing

Contributions are welcome.

- Open an issue to discuss larger changes before starting.
- Fork the repository and create a branch for your change.
- Keep pull requests small and focused.
- Follow the existing patterns: server components fetch data with Prisma, and API routes check the signed-in user and course ownership before changing data.
- Keep pages lightweight. The course is meant to work on slower internet connections.
- Run `npm run lint` and `npm run build` before opening a pull request.
- Never commit secrets or `.env` files.