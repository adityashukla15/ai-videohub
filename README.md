# 🎬 AI VideoHub

> A full-stack AI-powered video hosting platform built with **Next.js, TypeScript, MongoDB, Mongoose, NextAuth, ImageKit, and Tailwind CSS**.

AI VideoHub is a modern video platform where users can create an account, authenticate securely, upload and manage videos, and access video content through a responsive web interface.

The project is designed as a full-stack **Next.js application**, with frontend UI, backend API routes, authentication, database integration, and media handling inside the same application.

---

## 🚀 Live Demo

🌐 **Live Application:**
https://ai-videohub.vercel.app

💻 **GitHub Repository:**
https://github.com/adityashukla15/ai-videohub

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Secure password hashing using bcrypt
* NextAuth-based authentication
* Protected routes using authentication middleware
* Public and private route handling
* Session/token-based authorization
* Logout functionality

### 🎥 Video Management

* Video upload and management
* Video metadata handling
* Video title and description
* Thumbnail support
* Video URL management
* Video transformation settings
* Video controls
* Responsive video experience

### ☁️ Media Storage

The project integrates **ImageKit** for handling media-related functionality and optimized media delivery.

### 🗄️ Database

MongoDB is used as the primary database with Mongoose for:

* User management
* Video data
* Schema validation
* Database operations
* Timestamps
* Reusable database connection handling

### 🎨 Modern UI

* Responsive design
* Tailwind CSS
* Clean component-based architecture
* Mobile-friendly interface
* Modern forms and controls
* Loading and error handling
* User-friendly navigation

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**

### Backend

* **Next.js API Routes / Route Handlers**
* **Node.js runtime**
* **Mongoose**
* **MongoDB**

### Authentication

* **NextAuth.js**
* **bcrypt / bcryptjs**
* Authentication middleware

### Media

* **ImageKit**

### Deployment

* **Vercel**

---

## 🏗️ Architecture

The application follows a full-stack Next.js architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ React + TypeScript   │
                    │    Tailwind CSS     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   API Route Layer   │
                    │  Next.js Route API  │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
       ┌──────────────────┐        ┌──────────────────┐
       │     NextAuth     │        │     Mongoose     │
       │ Authentication   │        │ Database Layer   │
       └──────────────────┘        └────────┬─────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │   MongoDB Atlas   │
                                   └──────────────────┘

                         │
                         ▼
                  ┌──────────────┐
                  │   ImageKit   │
                  │ Media Storage│
                  └──────────────┘
```

---

## 📂 Project Structure

```text
ai-videohub/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── videos/
│   │
│   ├── login/
│   ├── register/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── authentication
│   └── database utilities
│
├── models/
│   ├── user.model.ts
│   └── video.model.ts
│
├── public/
│   └── static assets
│
├── proxy.ts
├── next-auth.d.ts
├── types.d.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Authentication Flow

The authentication flow works approximately as follows:

```text
User
 │
 ▼
Register Page
 │
 ▼
POST /api/auth/register
 │
 ▼
Validate User Data
 │
 ▼
Hash Password using bcrypt
 │
 ▼
Create User in MongoDB
 │
 ▼
Registration Successful
 │
 ▼
Login
 │
 ▼
NextAuth Authentication
 │
 ▼
Session / Token
 │
 ▼
Protected Routes
```

Protected routes are handled through authentication middleware.

Public routes such as login, registration, authentication APIs, and publicly accessible video routes can be accessed without authentication, while protected application routes require a valid authenticated session.

---

## 🗄️ Database Design

### User

The User model stores authentication-related information.

Typical structure:

```text
User
├── _id
├── email
├── password
├── createdAt
└── updatedAt
```

Passwords are hashed before being stored in the database.

### Video

The Video model stores video-related information such as:

```text
Video
├── _id
├── title
├── description
├── videoUrl
├── thumbnailUrl
├── controls
├── transformation
│   ├── height
│   ├── width
│   └── quality
├── createdAt
└── updatedAt
```

Mongoose schemas are used for validation, defaults, and database structure.

---

## 🔌 API Architecture

The frontend communicates with the backend through Next.js API routes.

Example:

```text
Frontend
   │
   ▼
fetch("/api/...")
   │
   ▼
Next.js API Route
   │
   ├── Authentication
   │
   ├── Validation
   │
   ├── Database Operation
   │
   └── Response
   │
   ▼
Frontend UI Update
```

This allows the application to remain a single full-stack Next.js project without requiring a separate Express backend.

---

## 🧩 TypeScript Architecture

TypeScript interfaces are used to maintain type safety across the application.

For example:

```ts
interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
```

The TypeScript interface defines the expected structure while the Mongoose schema defines database-level structure and validation.

Generics are also used with Mongoose:

```ts
const userSchema = new Schema<IUser>(...)
```

and:

```ts
model<IUser>("User", userSchema)
```

This keeps database operations strongly typed.

---

## 🗃️ MongoDB Connection

The application uses a cached MongoDB connection strategy.

The connection cache maintains:

```text
cached.conn
cached.promise
```

where:

* `conn` represents an established database connection.
* `promise` represents an ongoing connection attempt.

This prevents unnecessary database connections during repeated requests and is particularly useful in serverless environments such as Vercel.

---

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adityashukla15/ai-videohub.git
```

### 2. Navigate to the project

```bash
cd ai-videohub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

Add the required environment variables used by the application.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

NEXTAUTH_SECRET=your_nextauth_secret

NEXTAUTH_URL=http://localhost:3000

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Never commit `.env.local` or private API keys to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏭 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## ☁️ Deployment

The application is designed to be deployed on **Vercel**.

Basic deployment flow:

```text
GitHub Repository
       │
       ▼
     Vercel
       │
       ▼
Next.js Build
       │
       ▼
Production Application
```

### Vercel Environment Variables

Add all required environment variables in:

```text
Vercel
→ Project
→ Settings
→ Environment Variables
```

Make sure production credentials are configured correctly before deployment.

---

## 🔒 Security Considerations

* Passwords are hashed before database storage.
* Authentication middleware protects private routes.
* Environment variables are used for sensitive configuration.
* Private API keys should never be exposed to the client.
* MongoDB credentials should never be committed to the repository.
* Client-side environment variables should only contain values that are safe to expose publicly.

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The UI uses responsive Tailwind CSS utilities to adapt layouts across different screen sizes.

---

## 🧠 What I Learned From This Project

Building AI VideoHub helped strengthen my understanding of:

* Next.js App Router
* React Server and Client Components
* TypeScript
* TypeScript interfaces and generics
* NextAuth authentication
* Protected routes
* Next.js middleware
* MongoDB
* Mongoose schemas and models
* MongoDB connection caching
* REST API design
* API integration
* Password hashing
* ImageKit media handling
* Environment variables
* Responsive UI development
* Vercel deployment

---

## 🔮 Future Improvements

Potential improvements include:

* Video search
* Video categories
* Likes and comments
* User profiles
* Video recommendations
* Watch history
* Playlists
* Advanced video analytics
* AI-powered video summaries
* AI-generated chapters
* AI-powered recommendations
* Improved upload progress tracking
* Admin dashboard
* Content moderation
* Better video processing pipeline

---

## 📸 Screenshots

Add application screenshots here:

```text
screenshots/
├── home.png
├── login.png
├── register.png
├── dashboard.png
└── video-player.png
```

Example:

```md
![Home Page](./screenshots/home.png)

![Login Page](./screenshots/login.png)

![Dashboard](./screenshots/dashboard.png)
```

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Aditya Shukla**

GitHub:
https://github.com/adityashukla15

Project:
https://github.com/adityashukla15/ai-videohub

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is intended for educational and development purposes.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
