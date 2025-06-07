# NexCart - Stock, Sell & Scale

## Project Overview

NexCart is a modern e-commerce platform built with Next.js 15, featuring both customer-facing and admin interfaces, robust supplier management system, and secure authentication. The project uses a comprehensive tech stack and follows a well-organized structure for scalability and maintainability.

## Features

- 🔐 Secure Authentication with NextAuth.js
- 👤 User Management
- 🏪 Admin Dashboard
- 📦 Supplier Management System
- 📊 Inventory Management
- 🛍️ Product Management
- 🛒 Purchase Management
- 🎨 Modern UI with Tailwind CSS
- 🌓 Dark/Light Theme Support
- 🔄 Real-time Updates with SWR
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 15 with TypeScript and App Router
- **Styling:** Tailwind CSS, Radix UI Components
- **State Management:** SWR for data fetching
- **Icons:** Lucide React
- **Database:** MySQL
- **Authentication:** NextAuth.js
- **ORM:** Drizzle ORM
- **Form Handling:** Formik
- **Validation:** Yup
- **UI Components:**
  - Radix UI primitives
  - Custom components with class-variance-authority
  - shadcn/ui integration
- **Development Tools:**
  - TypeScript
  - ESLint
  - Drizzle Kit for database migrations
  - TurboPack for fast builds

## Project Structure

### Core Directories

- /app - Next.js application routes and pages

  - /admin - Admin dashboard and management interface
  - /api - API routes for backend functionality
  - /auth - Authentication-related pages and components

- /components - Reusable UI components

  - /Layout - Layout components for Admin and Customer interfaces
  - /Theme - Theme-related components including theme toggle
  - /ui - Core UI components (buttons, inputs, dialogs, etc.)

- /db - Database schema and configurations

  - Schema files for inventory, products, purchases, suppliers, and users

- /lib - Utility functions and configurations

  - /auth - Authentication configuration and server-side auth utilities
  - Constants.ts - Application constants
  - utils.ts - General utility functions

### Key Features

1. Multi-interface Support

   - Customer-facing storefront
   - Admin dashboard for management

2. Theme Support

   - Dark/Light mode toggle
   - Customizable theme components

3. Authentication System

   - Sign-in and sign-up functionality
   - Server-side authentication

4. Database Management

   - Structured schemas for:
     - Inventory management
     - Product catalog
     - Purchase tracking
     - Supplier management
     - User management

## Prerequisites

- Node.js 18+ and yarn
- MySQL 8.0+
- Git

## Getting Started

### 1. Installation

```bash
git clone [repository-url]
cd nexcart
yarn install
```

### 2. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=mysql://user:password@localhost:3306/nexcart
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Generate migration files
yarn db:generate

# Push changes to database
yarn db:push
```

### 4. Development

```bash
# Start development server with TurboPack
yarn dev
```

### 5. Build for Production

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## Available Scripts

- `yarn dev` - Start development server with TurboPack
- `yarn build` - Build the production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn db:generate` - Generate database migrations
- `yarn db:push` - Push database changes
- `yarn db:migrate` - Run database migrations
- `yarn db:studio` - Open Drizzle Studio

## Project Configuration

- TypeScript configuration in tsconfig.json
- Next.js configuration in next.config.ts
- ESLint configuration in eslint.config.mjs
- Component configuration in components.json
- Drizzle ORM configuration in drizzle.config.ts

## Custom Hooks

- scroll.tsx - Custom hook for scroll functionality

## Type Definitions

- apptypes.d.ts - Application-specific type definitions
- next-auth.d.ts - Authentication type definitions

## Database Management

NexCart uses Drizzle ORM with MySQL. The database schema is organized into multiple domains:

- User Management (user.schema.ts)
- Products (product.schema.ts)
- Inventory (inventory.schema.ts)
- Suppliers (supplier.schema.ts)
- Purchases (purchase.schema.ts)

To manage the database:

1. Generate migrations: `yarn db:generate`
2. Apply migrations: `yarn db:push`
3. View/Edit data: `yarn db:studio`

## Authentication

Authentication is implemented using NextAuth.js with the following features:

- Secure session management
- Login/Register functionality
- Protected API routes and middleware
- Role-based access control (Admin/User)

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/feature-name`
3. Make your changes
4. Push to the branch: `git push origin feature/feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
