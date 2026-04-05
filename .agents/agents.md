# GiftSense Agent Guidelines

Welcome to the **GiftSense** codebase. This project is a modern web application built with a cutting-edge stack. As an agent, follow these guidelines to maintain consistency and quality.

## 🛠 Tech Stack
- **Framework**: [Next.js 16.2.2](https://nextjs.org/) (Custom/Experimental version with breaking changes)
- **Core**: React 19.2.4
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Language**: TypeScript 5.x
- **Package Manager**: [Bun](https://bun.sh/) (indicated by `bun.lock`)
- **Linting**: ESLint 9.x with `eslint-config-next`

## 📂 Project Structure
- `/app`: Contains the App Router, layouts, and page-level components.
  - `layout.tsx`: Root layout defining the global structure.
  - `page.tsx`: The primary entry point for the application.
  - `globals.css`: Global styles including Tailwind imports.
- `/public`: Static assets (images, icons, etc.).
- `.agents/`: Configuration and metadata for AI agents.

## ⚠️ Special Instructions (Breaking Changes)
> [!IMPORTANT]
> This project uses a non-standard/experimental version of Next.js (16.2.2). 
> - **DO NOT** assume standard Next.js APIs or file structures from earlier training data are always applicable.
> - Always check `node_modules/next/dist/docs/` if available, or heed deprecation warnings from the build/lint tools.
> - Patterns like `use server` or `use client` should be used according to React 19/Next.js 16 conventions.

## 🎨 Coding Standards
- **Styling**: Use Tailwind CSS 4 utility classes. Prefer semantic class names where appropriate or use standard Tailwind primitives.
- **Components**: Functional components with TypeScript interfaces for props. Use React 19 features where applicable.
- **State Management**: Prefer server components for data fetching. For client-side state, use standard React hooks (`useState`, `useReducer`, `useContext`).
- **SEO**: Ensure each page has appropriate title tags and meta descriptions (even though currently minimal).

## 🚀 Key Commands
- `bun dev`: Start the development server.
- `bun build`: Build for production.
- `bun start`: Start the production server.
- `bun lint`: Run ESLint for code quality checks.

## 🧩 UI/UX Onboarding Flow Patterns
When building multi-step onboarding sections seamlessly derived from designs (like Stitch exports/HTML):
1. **Top Navigation**: Always include a translucent z-10 header containing: a `Back` link on the left, `GiftSense` brand colored primary in the center, and `Exit` link on the right.
2. **Standard Progress Bar**: Do not follow ad-hoc progress trackers. Use the fixed 6-step sequence (`w-2` dots, with the active dot being `w-8 bg-gradient-to-r from-primary to-[#FF7043]`). Set the label strictly to `Step X of 6`.
3. **Pill Topic Tag**: Use the standard `inline-flex items-center px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-4` layout.
4. **Sticky Bottom Action Area (Explicit Next Button)**: 
   - **Do not use auto-forwarding** timeouts (`setTimeout`) when an option is selected.
   - Use the fixed `bottom-0` absolute footer pattern wrapping a "Next Question" button explicitly. 
   - The button must remain gray (`bg-surface-container-highest`) and `disabled` until `selected` state is satisfied. Upon selection, switch it to the full `bg-gradient-to-br from-primary to-primary-container text-white` CTA.
   - Always ensure the parent body has padding-bottom `pb-32` to prevent the floating footer from clashing with the lowest form options.
