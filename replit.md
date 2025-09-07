# Roadmap Planner Application

## Overview

This is a roadmap planning application built with React and Express.js that allows teams to create and manage product roadmaps with initiatives organized by quarters. The application provides drag-and-drop functionality for moving initiatives between quarters, filtering capabilities by team and priority, and a clean interface for roadmap visualization and management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React 18** using modern hooks and functional components. Key architectural decisions include:

- **UI Framework**: Uses Radix UI components with shadcn/ui styling for a consistent, accessible design system
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark mode)
- **State Management**: React Query (@tanstack/react-query) for server state management, with local React state for UI interactions
- **Routing**: Wouter for lightweight client-side routing
- **Drag & Drop**: React DnD with HTML5 backend for initiative management between quarters
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture

The backend follows a **RESTful API** pattern built with Express.js:

- **Server Framework**: Express.js with TypeScript for type safety
- **Storage Pattern**: Interface-based storage abstraction (IStorage) with in-memory implementation for development
- **API Structure**: RESTful endpoints for roadmaps and initiatives with proper HTTP status codes
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware

### Data Architecture

- **Database Schema**: Designed for PostgreSQL using Drizzle ORM with two main entities:
  - **Roadmaps**: Container entities with name, description, year
  - **Initiatives**: Individual work items with team, priority, quarter, owner, and progress tracking
- **Type Safety**: Shared TypeScript types between frontend and backend via shared schema definitions
- **Migration System**: Drizzle Kit for database schema migrations

### Key Design Patterns

- **Monorepo Structure**: Client, server, and shared code in organized directories
- **Component Architecture**: Atomic design with reusable UI components
- **Custom Hooks**: Encapsulated logic for mobile detection and toast notifications
- **Provider Pattern**: Context providers for drag-and-drop, tooltips, and query client
- **Repository Pattern**: Storage abstraction allowing easy swapping between in-memory and database implementations

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **react-dnd**: Drag and drop functionality
- **wouter**: Lightweight routing library

### UI and Styling
- **@radix-ui/***: Accessible component primitives (35+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management
- **lucide-react**: Icon library

### Form and Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Validation resolvers
- **zod**: Schema validation library
- **drizzle-zod**: Integration between Drizzle and Zod

### Development Tools
- **vite**: Build tool and dev server
- **typescript**: Type safety
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Additional Utilities
- **date-fns**: Date manipulation library
- **clsx**: Conditional className utility
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component
- **nanoid**: URL-safe unique ID generator