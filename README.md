# Ethiopian TaskRabbit Frontend

A production-ready frontend for a service booking platform in Ethiopia, built with Next.js 14, TailwindCSS, and TypeScript.

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

- Node.js (v18 or v20 LTS recommended)
- npm, yarn, or pnpm

### 2. Installation

Clone the repository (if you haven't already) and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Copy the example environment file to create your local environment configuration:

```bash
cp .env.example .env.local
```

Open `.env.local` and update the variables if you have your Supabase credentials ready. For now, the default placeholders will work for the UI.

### 4. Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Backend/Auth**: [Supabase](https://supabase.com/)

## 📁 Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # React components
│   ├── ui/       # ShadCN UI primitives
│   ├── shared/   # Reusable components
│   └── features/ # Feature-specific components
├── lib/          # Utilities and libraries setup (Axios, React Query)
├── store/        # Zustand state stores
├── types/        # Global TypeScript interfaces
└── utils/        # Helper functions
```
