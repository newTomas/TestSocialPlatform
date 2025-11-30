# TestSocialPlatform

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Express](https://img.shields.io/badge/Express-5.1-important)
![Prisma](https://img.shields.io/badge/Prisma-7.0-blueviolet)

A production-ready social media API backend built with TypeScript, Node.js, Express, and Prisma. Features clean architecture, JWT authentication, and comprehensive security measures for scalable social platform development.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based auth with access & refresh tokens
- **👥 User Management**: Complete user registration, login, and profile management
- **📝 Post Management**: Full CRUD operations with soft delete functionality
- **📄 Cursor Pagination**: Efficient pagination for large datasets
- **🛡️ Security First**: Password hashing, input validation, CORS protection
- **🏗️ Clean Architecture**: Domain-driven design with clear separation of concerns
- **🔍 Type Safety**: Full TypeScript implementation with strict type checking
- **📊 Prisma ORM**: Modern database toolkit with optimized queries

## 🚀 Quick Start

**Prerequisites**: Node.js 18+, MySQL/MariaDB database

```bash
# Clone and setup
git clone https://github.com/newTomas/TestSocialPlatform.git
cd TestSocialPlatform
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npm run db:generate
npm run db:migrate:dev

# Start the server
npm run build
npm start
```

Server will be running at `http://localhost:3000`

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.9.3
- **Database**: MySQL/MariaDB via Prisma ORM 7.0.1

### Security & Validation
- **Authentication**: JWT (access + refresh tokens)
- **Password Hashing**: bcryptjs
- **Input Validation**: class-validator & class-sanitizer
- **Security**: Helmet, CORS, env-schema

### Development
- **Build Tool**: TypeScript Compiler
- **Code Style**: Strict TypeScript configuration
- **Database**: Prisma Client with auto-generated types

## 📋 Detailed Setup

### 1. Environment Configuration

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# JWT Configuration
JWT_ACCESS_SECRET="your-access-secret-hex"
JWT_REFRESH_SECRET="your-refresh-secret-hex"
JWT_EXPIRATION=3600        # 1 hour in seconds
JWT_REFRESH_EXPIRATION=86400 # 24 hours in seconds

# Security
SALT_ROUNDS=10

# Server
PORT=3000
```

### 2. Database Setup

Ensure you have MySQL or MariaDB running, then:

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate:dev
```

### 3. Available Scripts

```bash
npm run build          # Compile TypeScript to JavaScript
npm run check          # Type checking without emitting files
npm run db:generate    # Generate Prisma client
npm run db:migrate:dev # Run database migrations
npm start              # Run the production server
```

## 📚 API Documentation

### Authentication Endpoints (`/api/auth`)

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid-v7",
    "name": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "tokens": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid-v7",
    "name": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "tokens": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

#### POST `/api/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response (200):**
```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token"
}
```

### User Endpoints (`/api/users`)

#### GET `/api/users`
Get all users with cursor-based pagination.

**Query Parameters:**
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (default: 10)

**Response (200):**
```json
{
  "users": [
    {
      "id": "uuid-v7",
      "name": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "cursor": "uuid-v7"
}
```

#### GET `/api/users/:id`
Get a specific user by ID.

**Response (200):**
```json
{
  "id": "uuid-v7",
  "name": "johndoe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Post Endpoints (`/api/posts`)

#### GET `/api/posts`
Get all posts (public endpoint) with pagination.

**Query Parameters:**
- `cursor` (optional): Cursor for pagination
- `limit` (optional): Number of items per page (default: 10)

**Response (200):**
```json
{
  "posts": [
    {
      "id": "uuid-v7",
      "text": "Hello world!",
      "userId": "user-uuid",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "cursor": "uuid-v7"
}
```

#### GET `/api/posts/:id`
Get a specific post by ID (public endpoint).

**Response (200):**
```json
{
  "id": "uuid-v7",
  "text": "Hello world!",
  "userId": "user-uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/api/posts` (🔒 Requires Authentication)
Create a new post.

**Request Headers:**
```
Authorization: Bearer jwt-access-token
```

**Request Body:**
```json
{
  "text": "This is my first post!"
}
```

**Response (201):**
```json
{
  "id": "uuid-v7",
  "text": "This is my first post!",
  "userId": "user-uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH `/api/posts/:id` (🔒 Requires Authentication)
Update an existing post (owner only).

**Request Headers:**
```
Authorization: Bearer jwt-access-token
```

**Request Body:**
```json
{
  "text": "Updated post content"
}
```

**Response (200):**
```json
{
  "id": "uuid-v7",
  "text": "Updated post content",
  "userId": "user-uuid",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

#### DELETE `/api/posts/:id` (🔒 Requires Authentication)
Delete a post (soft delete, owner only).

**Request Headers:**
```
Authorization: Bearer jwt-access-token
```

**Response (204):** No content

### Error Response Format

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Authentication

Protected endpoints require a valid JWT access token:

```
Authorization: Bearer <access-token>
```

Access tokens expire after 1 hour. Use the refresh endpoint to get new tokens.

## 🏗️ Project Architecture

This project follows **Clean Architecture** principles with **Domain-Driven Design**:

### Directory Structure

```
src/
├── controllers/        # HTTP request handlers
├── services/          # Business logic layer
├── repositories/      # Data access layer (Prisma)
├── routes/           # Express route definitions
├── middlewares/      # Express middleware
├── dtos/            # Data Transfer Objects with validation
├── domain/          # Domain entities
├── mappers/         # Entity-DTO converters
├── utils/           # Utility functions
├── interfaces/      # TypeScript interfaces
├── config/          # Configuration objects
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

### Architecture Layers

1. **Controllers**: Handle HTTP requests/responses, call services
2. **Services**: Contain business logic, orchestrate repositories
3. **Repositories**: Data access layer, interface with Prisma
4. **DTOs**: Data validation and transformation
5. **Entities**: Core domain models
6. **Mappers**: Convert between entities and DTOs

### Design Patterns

- **Repository Pattern**: Clean data access abstraction
- **DTO Pattern**: Validation and data transfer
- **Service Layer**: Business logic encapsulation
- **Dependency Injection**: Loose coupling between layers

## 🗄️ Database Schema

### Entity Relationships

```
User (1) ──────── (N) Post
  │
  └─── (1) ──────── (N) RefreshToken
```

### Tables

#### Users
- `id`: UUID v7 (Primary Key)
- `name`: String (alphanumeric, unique)
- `email`: String (unique)
- `password`: String (hashed with bcrypt)
- `createdAt`: DateTime

#### Posts
- `id`: UUID v7 (Primary Key)
- `text`: Text
- `userId`: UUID (Foreign Key → Users.id)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `deletedAt`: DateTime (nullable, for soft delete)

#### RefreshTokens
- `id`: Auto-incrementing Integer (Primary Key)
- `token`: String (255 chars, unique)
- `userId`: UUID (Foreign Key → Users.id)
- `expiredAt`: DateTime
- `createdAt`: DateTime

### Indexes

- Composite index on `deletedAt + userId` in Posts table for efficient queries
- Unique index on `token` in RefreshTokens table

## 🔒 Security Features

### Authentication & Authorization
- **JWT Access Tokens**: 1-hour expiration for API access
- **JWT Refresh Tokens**: 24-hour expiration for token renewal
- **Password Security**: bcrypt hashing with configurable salt rounds
- **Token Rotation**: New refresh tokens issued on refresh

### Input Validation & Sanitization
- **Request Validation**: class-validator with comprehensive rules
- **Data Sanitization**: class-sanitizer for XSS prevention
- **Environment Validation**: env-schema for configuration safety

### HTTP Security
- **Helmet**: Security headers for Express applications
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Protection against brute force attacks

### Data Protection
- **Soft Delete**: Posts are marked as deleted without permanent removal
- **User Authorization**: Users can only modify their own posts
- **Input Filtering**: All user inputs are validated and sanitized

## 🔧 Development Workflow

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Husky**: Git hooks for pre-commit checks

### Database Management
```bash
# Create new migration
npx prisma migrate dev --name migration-name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### Environment Management
- Environment variables are validated on startup
- Separate configurations for development and production
- Secure secret management recommended for production

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write TypeScript with strict type checking
- Add appropriate DTOs with validation for new endpoints
- Include error handling for all operations
- Update this README for any API changes
- Ensure all tests pass before submitting

## 🆘 Support

For questions, bug reports, or feature requests, please open an issue on the GitHub repository.

---

**Built with ❤️ for modern social platform development**