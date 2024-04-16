import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";
import Head from 'next/head';

type Props = {};


const Docs = () => {
  return (
    <div className="p-8">
      <Head>
        <title>Husky AI Documentation</title>
      </Head>

      <h1 className="text-3xl font-bold mb-4">Husky AI Documentation</h1>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Overview</h2>
        <p>Husky AI is a web application project leveraging Next.js for SSR (Server Side Rendering) and SSG (Static Site Generation), TailwindCSS for styling, and Prisma as an ORM (Object Relational Mapping) for database interactions. This documentation aims to provide a detailed guide to the project setup, structure, and development guidelines.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Technologies used:</h2>
        <ul className="list-disc pl-6">
          <li>Next.Js</li>
          <li>Open.ai whisper api</li>
          <li>Vertex api</li>
          <li>Planetscale</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">Getting Started</h2>
        <h3 className="text-xl font-semibold mt-4">Prerequisites</h3>
        <p>Node.js (version specified in `package.json` or `.nvmrc`), npm (comes with Node.js), A supported database installed and running (Prisma configuration suggests...)</p>

        <h3 className="text-xl font-semibold mt-4">Installation</h3>
        <pre className="bg-gray-100 p-4">
          {`# Clone the repository\ngit clone <repository-url>\n\n# Navigate into the project directory\ncd husky-ai\n\n# Install dependencies\nnpm install\n\n# Setup and migrate your database (if using Prisma)\nnpx prisma migrate dev\n\n# Start the development server\nnpm run dev`}
        </pre>
        <p>This will start the development server, usually accessible at `http://localhost:3000`.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">
        Project Structure
        </h2>
        <ul className="list-disc pl-6">
        <li><strong>src/</strong>: Contains the source code of the application.
                <ul className=" list-decimal pl-6 leading-7">
                        <li><strong>app/</strong>: Core application logic and entry points.</li>
                        <li><strong>components/</strong>: Reusable UI components.</li>
                        <li><strong>lib/</strong>: Shared libraries and utilities.</li>
                        <li><strong>validators/</strong>: Validation logic for data inputs.</li>
                    </ul>
                </li>
          <li><strong>prisma/</strong>: Contains Prisma schema file(s) for database models and migrations.</li>
          <li><strong>public/</strong>: Static files like images and icons.</li>
          <li><strong>next.config.js & tailwind.config.js</strong>: Configuration files for Next.js and TailwindCSS, respectively.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">
        Development Guidelines
        </h2>
        <ul className="list-disc pl-6">
            <li><strong>Component Development:</strong> Place new components in the <code>src/components</code> directory. Use TailwindCSS for styling according to the project design system.</li>
            <li><strong>Database Management:</strong> Use Prisma CLI for creating models and handling migrations. The <code>schema.prisma</code> file within the <code>prisma</code> directory defines your database schema.</li>
            <li><strong>Styling:</strong> Define custom styles within component classes and extend Tailwind CSS config in <code>tailwind.config.js</code> as needed.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-3">
          Module OverView
        </h2>
        <ul className="list-disc pl-6">
                <li><strong>app:</strong> Core application module with functional components and utilities like settings, course, danjob, gallery, create, API routes, layout and page components, and global styles.</li>
                <li><strong>components:</strong> Reusable UI components module with elements like Navbar, GalleryCourseCard, ChapterCard, SubscriptionButton, etc.</li>
                <li><strong>lib:</strong> Library functions and utilities supporting backend logic or integrations with services like GPT, Stripe, YouTube, and Unsplash.</li>
                <li><strong>validators:</strong> Validation logic for application data, particularly course data.</li>
            </ul>
      </section>

    </div>
  );
};

export default Docs;