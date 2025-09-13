# RedTeam C2 - Advanced Command & Control Center

## Overview

RedTeam C2 is a sophisticated Command and Control Center designed for Red Team operations and Adversary Simulation exercises. The platform provides real-time management of compromised assets, C2 sessions, and attack operations through an advanced web interface with a tactical cyberpunk aesthetic. It serves as a comprehensive solution for managing complex red team engagements, monitoring operation status, and coordinating adversary simulation activities in enterprise environments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application built with React 18 and TypeScript for type safety
- **Vite Build System**: Fast development server and optimized production builds
- **Wouter Routing**: Lightweight client-side routing for navigation between dashboard, targets, terminal, network map, scenarios, and telemetry pages
- **Component-Based Design**: Modular UI components including target machine cards, terminal interface, network topology visualizer, and telemetry panels
- **Styling Framework**: Tailwind CSS with custom cyberpunk/military theme variables and shadcn/ui component library
- **State Management**: TanStack React Query for server state management and caching

### Backend Architecture
- **Express.js Server**: Node.js backend with Express framework for API endpoints
- **TypeScript**: Full-stack TypeScript implementation for consistency and type safety
- **Modular Route System**: Centralized route registration with placeholder for API endpoints
- **Memory Storage**: In-memory storage implementation with interface for future database integration
- **Development Integration**: Vite middleware integration for hot module replacement in development

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Connection**: Neon serverless PostgreSQL database integration
- **Schema Management**: Centralized schema definitions in shared directory with user authentication models
- **Migration System**: Drizzle Kit for database schema migrations and version control

### Authentication and Authorization
- **User Management**: User schema with username/password authentication structure
- **Session Handling**: Infrastructure prepared for session-based authentication
- **Storage Interface**: Abstracted storage layer supporting user CRUD operations
- **Security Considerations**: Password hashing and session management framework in place

### External Dependencies

#### UI and Styling
- **Radix UI**: Comprehensive component library for accessible UI primitives (dialogs, dropdowns, navigation)
- **Tailwind CSS**: Utility-first CSS framework with custom cyberpunk color scheme
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **Class Variance Authority**: Component variant management for consistent styling patterns

#### Database and ORM
- **Neon Database**: Serverless PostgreSQL database service for production deployment
- **Drizzle ORM**: Type-safe ORM for database operations and schema management
- **Drizzle Kit**: CLI tool for database migrations and schema synchronization

#### Development and Build Tools
- **Vite**: Frontend build tool with React plugin and development server
- **ESBuild**: Fast JavaScript bundler for production server builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

#### Frontend State Management
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management with validation support
- **Zod**: Runtime type validation and schema parsing

#### Additional Utilities
- **Date-fns**: Date manipulation and formatting utilities
- **clsx/tailwind-merge**: Conditional CSS class name management
- **Embla Carousel**: Carousel component for UI interactions