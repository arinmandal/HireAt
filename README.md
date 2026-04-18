<div align="center">

<img src="public/HireAt_light.png" alt="HireAt Logo" height="60" />

# HireAt

**A modern full-stack job portal connecting recruiters with top candidates — built for speed, scale, and simplicity.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.io)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Workflows](#workflows)
- [Database Schema](#database-schema)
- [Supabase RLS Policies](#supabase-rls-policies)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## About

**HireAt** is a role-based job portal that supports two types of authenticated users:

- 🧑‍💼 **Candidates** — Search and filter jobs, save favorites, apply with a resume, and track application status.
- 🏢 **Recruiters** — Post jobs with markdown-formatted requirements, manage hiring status, review applicants, and delete listings.

Built with React 19, Vite 7, Supabase (PostgreSQL + Storage), and Clerk for authentication — every user action is secured by JWT-validated Row Level Security policies enforced at the database level.

---

## Features

### For Candidates
- 🔍 **Job Discovery** — Browse all open job listings with search by keyword, filter by location, and filter by company.
- ❤️ **Save Jobs** — Bookmark jobs to a personal saved list with real-time heart-toggle UI.
- 📄 **Apply to Jobs** — Submit applications with name, experience level, education, skills, and a resume PDF upload to Supabase Storage.
- 📋 **My Applications** — View a chronological list of all submitted applications with company and job title, and current status badge.

### For Recruiters
- ➕ **Post Jobs** — Create job listings with title, description, salary, location (country/city picker), and markdown-formatted requirements.
- 🏢 **Add Company** — Create a company profile with logo upload directly to Supabase Storage via an in-drawer form.
- 🚦 **Hiring Status Toggle** — Open or close a job listing directly from the job detail page.
- 🗑️ **Delete Jobs** — Remove job listings from the "My Jobs" dashboard with a loading indicator.
- 👥 **View Applicants** — See all applications per job on the job detail page.
- ✅ **Update Application Status** — Change candidate status (Applied / Interviewing / Hired / Rejected) per application card.

### General
- 🔐 **Authentication** — Sign in via Clerk with Google / Email; onboarding flow assigns roles (Candidate / Recruiter).
- 🌙 **Dark Mode** — Default dark theme with ThemeProvider context.
- ⚡ **Loading States** — `BarLoader` spinners on every async operation via a unified `useFetch` hook.
- 🛡️ **Protected Routes** — All authenticated routes are wrapped with `ProtectedRoute`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 7](https://vite.dev) |
| **Routing** | [React Router v7](https://reactrouter.com) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| **Authentication** | [Clerk](https://clerk.com) (`@clerk/clerk-react`) |
| **Database & Storage** | [Supabase](https://supabase.io) (PostgreSQL + Storage Buckets) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Markdown Editor** | [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Loading Spinners** | [react-spinners](https://www.davidhu.io/react-spinners) |
| **Location Data** | [country-state-city](https://github.com/harpreetkhalsagtbit/country-state-city) |
| **Linting** | ESLint 9 + eslint-plugin-react-hooks |

---

## Project Structure

```
hireat/
├── public/
│   ├── logo.png
│   └── banner.png
├── src/
│   ├── api/
│   │   ├── jobs.js              # getJobs, getSingleJob, savedJob, addNewJob,
│   │   │                        #   updateHiringStatus, getSavedJob,
│   │   │                        #   getMyJob, deleteJob
│   │   ├── apiApplications.js   # applyToJobs, updateApplications, getApplications
│   │   └── apiCompanies.js      # getCompanies, addNewCompany
│   ├── components/
│   │   ├── ui/                  # shadcn/ui base components
│   │   ├── AddCompanyDrawer.jsx # Drawer form to create company + upload logo
│   │   ├── ApplicationCard.jsx  # Application entry with status select (recruiter)
│   │   ├── ApplyJobs.jsx        # Drawer form to apply for a job
│   │   ├── CreatedApplications.jsx  # Candidate: list of their applications
│   │   ├── CreatedJobs.jsx      # Recruiter: grid of their posted jobs
│   │   ├── Header.jsx           # Global navbar with role-based nav links
│   │   ├── JobCards.jsx         # Job card with save toggle & delete (isMyJob)
│   │   ├── Logo.jsx             # SVG logo component
│   │   ├── ProtectedRoute.jsx   # Auth guard, redirects to onboarding if no role
│   │   └── theme-provider.jsx   # Dark/light mode context
│   ├── hooks/
│   │   └── useFetch.jsx         # Generic async data-fetching hook with loading/error state
│   ├── layout/
│   │   └── Rootlayout.jsx       # App shell with Header + <Outlet />
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing: hero, company carousel, banner, FAQ
│   │   ├── Onboarding.jsx       # Role selection (Candidate / Recruiter)
│   │   ├── JobListing.jsx       # Browse all jobs with search & filters
│   │   ├── Jobs.jsx             # Single job detail + apply/manage view
│   │   ├── PostJobs.jsx         # Recruiter: create new job listing
│   │   ├── SavedJobs.jsx        # Candidate: saved jobs grid
│   │   └── MyJobs.jsx           # Role-aware: My Applications or My Jobs
│   └── utils/
│       ├── supabase.js          # Supabase client + Clerk JWT integration
│       ├── companies.json       # Static carousel company logos
│       └── faq.json             # Static FAQ data
├── .env                         # Local environment variables (git-ignored)
├── .env.example                 # Environment variable template
├── index.html
├── vite.config.js
└── package.json
```

---

## Workflows

### Candidate Workflow

```
Sign Up / Sign In (Clerk)
        │
        ▼
  Onboarding → Select "Candidate"
        │
        ▼
  Browse Jobs (/jobs)
  ├── Search by keyword
  ├── Filter by location (Country/State)
  └── Filter by company
        │
        ├── ❤️ Save Job → Saved Jobs (/saved-jobs)
        │
        └── View Detail (/job/:id)
              │
              ├── Apply → Upload Resume (Supabase Storage)
              │            + Form: name, experience, education, skills
              │
              └── My Applications (/my-jobs)
                    └── View status: Applied / Interviewing / Hired / Rejected
```

### Recruiter Workflow

```
Sign Up / Sign In (Clerk)
        │
        ▼
  Onboarding → Select "Recruiter"
        │
        ▼
  Post a Job (/post-jobs)
  ├── Add Company (drawer) → Upload Logo (Supabase Storage)
  ├── Fill: title, description, salary, location, requirements (Markdown)
  └── Submit → Job created in Supabase
        │
        ▼
  Manage Jobs (/my-jobs)
  ├── View all posted jobs
  └── Delete a job listing (with loader)
        │
        ▼
  Job Detail (/job/:id)
  ├── Toggle Hiring Status (Open / Closed)
  └── View & Manage Applications
        └── Change status per candidate: Applied → Interviewing → Hired / Rejected
```

---

## Database Schema

### `companies`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `name` | text | Company name |
| `logo_url` | text | Supabase Storage URL |

### `jobs`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | Job title |
| `description` | text | Short description |
| `requirements` | text | Markdown-formatted requirements |
| `location` | text | City / State |
| `salary` | text | Salary range |
| `isOpen` | boolean | Hiring status |
| `recruiter_id` | text | Clerk user ID of the poster |
| `company_id` | uuid | FK → `companies.id` |

### `saved_jobs`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `job_id` | uuid | FK → `jobs.id` |
| `user_id` | text | Clerk user ID |

### `applications`
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `job_id` | uuid | FK → `jobs.id` |
| `candidate_id` | text | Clerk user ID of the applicant |
| `name` | text | Applicant's name |
| `status` | text | `applied` / `interviewing` / `hired` / `rejected` |
| `experience` | text | Experience level |
| `education` | text | Highest education |
| `skills` | text | Comma-separated skills |
| `resume` | text | Supabase Storage public URL |

### Supabase Storage Buckets
| Bucket | Contents |
|---|---|
| `resumes` | Uploaded candidate resume PDFs |
| `company_logo` | Uploaded company logo images |

---

## Supabase RLS Policies

All tables use Row Level Security. The Clerk JWT is forwarded as a Bearer token via the custom Supabase client.

| Table | Operation | Policy |
|---|---|---|
| `jobs` | SELECT | Authenticated users can read all open jobs |
| `jobs` | INSERT | `recruiter_id = auth.uid()` |
| `jobs` | UPDATE | `recruiter_id = auth.uid()` |
| `jobs` | DELETE | `recruiter_id = auth.uid()` |
| `saved_jobs` | SELECT | `user_id = auth.uid()` |
| `saved_jobs` | INSERT | `user_id = auth.uid()` |
| `saved_jobs` | DELETE | `user_id = auth.uid()` |
| `applications` | SELECT (recruiter) | Via joined job where `recruiter_id = auth.uid()` |
| `applications` | SELECT (candidate) | `candidate_id = auth.uid()` |
| `applications` | INSERT | `candidate_id = auth.uid()` |
| `applications` | UPDATE | Via joined job where `recruiter_id = auth.uid()` |
| `companies` | SELECT | All authenticated users |
| `companies` | INSERT | Authenticated recruiters |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.io) project with the schema above
- A [Clerk](https://clerk.com) application with JWT template configured for Supabase

### Installation

```bash
# Clone the repository
git clone https://github.com/arinmandal/HireAt.git
cd HireAt

# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in the root (see `.env.example`):

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJ...
```

> **Note:** All variables must be prefixed with `VITE_` to be exposed to the browser by Vite.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## License

[MIT](LICENSE) © Arin Mandal
