## Husky AI Documentation

### Overview
Husky AI is a web application project leveraging Next.js for SSR (Server Side Rendering) and SSG (Static Site Generation), TailwindCSS for styling, and Prisma as an ORM (Object Relational Mapping) for database interactions. This documentation aims to provide a comprehensive guide to the project's setup, structure, and development guidelines.

### Technologies used:

The application is built based on the following technologies.

1. Next.Js
2. Open.ai whisper api
3. Vertex api
4. Planetscale 
5. Pinecone
6. PlanetScale
7. Langchain
8. Prisma
9. zod

### Getting Started

1. **Prerequisites**
   - Node.js (version specified in `package.json` or `.nvmrc`)
   - npm (comes with Node.js)
   - A supported database installed and running (Prisma configuration suggests...)

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate into the project directory
   cd husky-ai

   # Install dependencies
   npm install

   # Setup and migrate your database (if using Prisma)
   npx prisma migrate dev

   # Start the development server
   npm run dev
   ```
   This will start the development server, usually accessible at `http://localhost:3000`.

### Project Structure

- **src/**: Contains the source code of the application.
  - **app/**: Core application logic and entry points.
  - **components/**: Reusable UI components.
  - **lib/**: Shared libraries and utilities.
  - **validators/**: Validation logic for data inputs.
- **prisma/**: Contains Prisma schema file(s) for database models and migrations.
- **public/**: Static files like images and icons.
- **next.config.js & tailwind.config.js**: Configuration files for Next.js and TailwindCSS, respectively.

### Development Guidelines

- **Component Development**: When developing new components, place them in the `src/components` directory. Use TailwindCSS for styling according to the project's design system.
- **Database Management**: Use Prisma CLI for creating models and handling migrations. The `schema.prisma` file within the `prisma` directory defines your database schema.
- **Styling**: This project uses TailwindCSS for styling. Define custom styles within component classes and extend Tailwind's config in `tailwind.config.js` as needed.


### Modules Overview

#### 1. **app**
This module seems to be the core of the application, containing key functional components and utilities:
- **settings**, **course**, **danjob**, **gallery**, **create**: These directories likely contain pages or components related to specific features or sections of the application (e.g., course management, job listings, image galleries).
- **api**: This directory might contain API route definitions used by the Next.js application for handling HTTP requests.
- **layout.tsx**: A React component for the application's layout, possibly used as a wrapper for pages to include common UI elements like headers or footers.
- **ssspage.tsx**, **page.tsx**: These components could be templates or specific implementations of server-side rendered and client-side pages.
- **globals.css**: A stylesheet for global CSS rules applied throughout the application.

#### 2. **components**
The components module contains reusable React components for the UI:
- **ui**: A directory that might contain more granular UI components or utilities.
- Components like `Navbar.tsx`, `GalleryCourseCard.tsx`, `ChapterCard.tsx`, `SubscriptionButton.tsx`, etc., suggest a variety of UI elements designed for navigation, displaying course information, user interactions, and more.

#### 3. **lib**
This module likely contains library functions and utilities supporting the application's backend logic or integrations:
- **gpt.ts**, **stripe.ts**, **youtube.ts**, **unsplash.ts**: Integration utilities with external services like GPT (presumably for AI text generation), Stripe (for payments), YouTube (for video content), and Unsplash (for images).
- **utils.ts**, **db.ts**, **auth.ts**, **subscription.ts**: General utilities for database operations, authentication, and subscription management.

#### 4. **validators**
Contains validation logic for the application:
- **course.ts**: This file suggests validation rules or functions related to course data, ensuring that inputs or data modifications adhere to expected formats and rules.
