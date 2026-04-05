<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GiftSense 🎁

**GiftSense** is a modern Next.js application designed to provide gift-related insights or services. 

## 🏗 Project Architecture

### 💎 Technology Stack
- **Next.js**: 16.2.2 (Experimental/Breaking Changes branch)
- **React**: 19.x (Modern hooks like `use`, hydration updates, etc.)
- **Tailwind CSS**: 4 (Dynamic PostCSS integration)
- **Runtime**: Bun (Preferred for development)

### 📂 Directory Structure
- `/app`: App Router strategy. Use for public and private routes.
- `/public`: Static images and branding.
- `.agents/`: Agent instructions and project logs.

## 📜 Agent Guidelines
1. **Prefer Bun**: Always use `bun` commands for package management or task execution unless standard npm is required by the user.
2. **Tailwind 4 Syntax**: Be aware of Tailwind 4's CSS dynamic processing and `@theme` blocks.
3. **TypeScript**: Strict type definitions are encouraged for all components.
4. **Hydration Warning**: Be cautious of React 19's hydration warnings when using date-sensitive or browser-only components.
