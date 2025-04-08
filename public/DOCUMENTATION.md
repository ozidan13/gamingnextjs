# Gaming Boi - Next.js Gaming Website Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Core Features](#core-features)
6. [Authentication](#authentication)
7. [Data Models](#data-models)
8. [API Integration](#api-integration)
9. [Front-end Components](#front-end-components)
10. [User Interface](#user-interface)
11. [Deployment & Configuration](#deployment--configuration)
12. [Getting Started](#getting-started)

## Introduction

Gaming Boi is a modern web application built using Next.js that serves as a comprehensive gaming platform. It allows users to browse games, create wishlists, read and write reviews, and interact with other gamers through a comment system. The application leverages the power of Next.js App Router, MongoDB for data storage, and external gaming API integration to deliver a seamless gaming discovery experience.

## Project Overview

The application is designed with both gamers and developers in mind, offering:

- **Game Discovery**: Browse and search for games with advanced filtering options
- **User Accounts**: Create personal profiles with authentication
- **Social Features**: Review games and interact with other users' reviews
- **Personalization**: Create and manage game wishlists
- **Responsive Design**: Optimized for all device sizes

## Technology Stack

The project is built using the following technologies:

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | Next.js 15.0.1 (App Router) |
| **UI Library** | React 18.3.1 |
| **Styling** | Tailwind CSS, CSS Modules |
| **State Management** | React Context API, React Query |
| **Form Handling** | React Hook Form, Zod |
| **Database** | MongoDB (with Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens), Cookies |
| **Content Delivery** | Cloudinary (image uploads) |
| **UI Components** | Radix UI, Framer Motion |
| **API Integration** | External Gaming API |

## Project Structure

The project follows a modular structure organized around Next.js App Router conventions:

```
gamingnextjs/
├── app/                      # Main application code
│   ├── (grid)/               # Layout group for pages with grid layout
│   │   ├── game/             # Game detail pages
│   │   ├── games/            # Games listing pages
│   │   ├── wishlist/         # User wishlist pages
│   │   ├── layout.tsx        # Shared layout for grid pages
│   │   └── page.tsx          # Homepage
│   ├── actions/              # Server actions
│   ├── api/                  # API handlers and external API integration
│   ├── components/           # UI components
│   ├── constants/            # Constants and configuration values
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── models/               # Mongoose data models
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   └── types/                # TypeScript type definitions
├── components/               # Shared UI components
├── lib/                      # Utility functions and libraries
├── public/                   # Static assets
└── middleware.ts             # Next.js middleware for route protection
```

## Core Features

### Game Browsing and Discovery

The platform provides multiple ways to discover games:

- **Homepage Sliders**: Featured games organized by platform and rating
- **Search Functionality**: Find games by title with debounced search
- **Filtering**: Filter games by platform, genre, and other criteria
- **Game Details**: Comprehensive game information with screenshots and similar games

### User Account System

The application features a complete user account system:

- **Registration**: Create new accounts with email verification
- **Authentication**: Secure login with JWT tokens
- **Profile Management**: Update profile information and avatar
- **Data Persistence**: User preferences and activities stored in MongoDB

### Social Interaction

Users can interact with each other through:

- **Game Reviews**: Write and read reviews for games
- **Rating System**: Rate games on a scale of 0-10
- **Comments**: Reply to reviews
- **Like System**: Like reviews and replies

### Personalization

The platform offers personalization options:

- **Wishlist**: Save games to a personal wishlist
- **Top Ten List**: Create a list of favorite games
- **User Profile**: Customize profile with avatar and bio

## Authentication

Authentication is handled server-side using JWT tokens stored in HTTP-only cookies:

### Authentication Flow

1. **Registration**: User creates an account with email, password, and name
2. **Password Protection**: Passwords are hashed using bcrypt before storage
3. **Login**: User credentials are verified and JWT token is generated
4. **Session Management**: Token is stored in HTTP-only cookies
5. **Authorization**: Protected routes check for valid token using middleware
6. **Logout**: Cookie is cleared from the browser

### Security Measures

- **HTTP-Only Cookies**: Prevents client-side JavaScript access to tokens
- **Password Hashing**: Secures user passwords with bcrypt
- **JWT Expiration**: Tokens expire after 90 minutes
- **Server-Side Validation**: All user inputs are validated server-side

## Data Models

The application uses MongoDB with Mongoose ODM for data modeling:

### User Model

```typescript
// User data model with profile information and relationships
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  avatar: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  wishlist: [{ type: String }],
  topTenList: [{ type: String, max: 10 }],
  gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
  bio: { type: String, max: 500, default: "No bio" },
  createdAt: { type: Date, default: Date.now },
});
```

### Game Review Model

```typescript
// Game review with user relationship and interactions
const gameReviewSchema = new Schema({
  gameId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
});
```

### Review Reply Model

```typescript
// Reply to a review with user relationship
const reviewReplySchema = new Schema({
  reviewId: { type: Schema.Types.ObjectId, ref: "GameReview", required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true }, 
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], 
  createdAt: { type: Date, default: Date.now }, 
});
```

## API Integration

The application integrates with an external gaming API to fetch game data:

### API Modules

The `api.ts` module provides the following functions:

- `searchGames`: Search for games with filters and pagination
- `getGame`: Get detailed information about a specific game
- `getGameFromgenres`: Get games by genre
- `gamebyplatforms`: Get games by platform
- `getGamesByIds`: Get multiple games by their IDs

### Error Handling

API requests include comprehensive error handling to ensure a smooth user experience even when external services are unavailable.

## Front-end Components

The application is built using a component-based architecture with reusable UI elements:

### Key Components

- **NavBar**: Main navigation with search functionality
- **SideBar**: Secondary navigation with category filters
- **GamesSlider**: Horizontal scrollable game cards
- **Hero**: Featured game showcase
- **GameCard**: Individual game display
- **ReviewForm**: Form for submitting game reviews
- **ReplyForm**: Form for replying to reviews
- **WishlistButton**: Toggle button for adding/removing games from wishlist

### Context Providers

- **WishlistProvider**: Manages wishlist state across the application
- **QueryProvider**: Configures React Query for data fetching

### Custom Hooks

The application utilizes custom hooks for shared logic:

- **useWishlist**: Hook for wishlist operations
- **useAuth**: Hook for authentication status and operations

## User Interface

The UI is designed to be modern, responsive, and user-friendly:

### Design System

- **Color Scheme**: Dark theme with accent colors for gaming aesthetic
- **Typography**: Montserrat font for readability and modern feel
- **Responsiveness**: Grid-based layout that adapts to all screen sizes
- **Animations**: Subtle animations with Framer Motion for enhanced user experience

### Layout Structure

- **Grid Layout**: 12-column grid system for responsive design
- **Sidebar**: Navigation and filtering options
- **Main Content**: Game displays and interactive elements
- **Toasts**: Notifications for user actions

## Deployment & Configuration

### Environment Variables

The application requires the following environment variables:

```
# Authentication
JWT_SECRET=your_jwt_secret_key

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# External API
API_KEY=your_game_api_key
API_URL=https://api.example.com/

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Deployment Options

The application can be deployed using:

- **Vercel**: Optimized for Next.js applications
- **Netlify**: Alternative deployment platform
- **Self-hosted**: Traditional server deployment

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gamingnextjs.git
   cd gamingnextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `example.env` and fill in your environment variables.

### Development

Start the development server:
```bash
npm run dev
```

Access the application at `http://localhost:3000`.

### Production Build

Create a production build:
```bash
npm run build
npm start
```

### Testing

The project uses React Testing Library for component testing:
```bash
npm run test
```

---

## Technical Implementation Details

### Server-Side Rendering (SSR)

The application leverages Next.js SSR capabilities for:

- **Performance**: Faster initial page loads
- **SEO**: Better search engine optimization
- **Data Fetching**: Server-side data fetching for critical content

### API Routes

Next.js API routes are used for:

- **Authentication**: Login, signup, and user verification
- **Data Operations**: CRUD operations for user data
- **External API Proxying**: Secure communication with external APIs

### Middleware

Next.js middleware is used for:

- **Route Protection**: Ensuring authenticated access to protected routes
- **Request Modification**: Adding authentication headers to requests

### Image Optimization

The application uses Next.js Image component for:

- **Lazy Loading**: Only loading images when they enter the viewport
- **Responsive Sizing**: Automatically serving appropriate image sizes
- **Format Optimization**: Converting images to modern formats like WebP

---

This documentation provides a comprehensive overview of the Gaming Boi Next.js application. For further questions or additional information, please contact the development team.
