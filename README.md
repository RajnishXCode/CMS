# Next.js CMS Project

## Project Overview

This project is a modern, secure, and extensible Content Management System (CMS) built with Next.js, MongoDB Atlas, and GitHub integration. It provides a user-friendly dashboard for managing homepage content, images, and features, with robust admin authentication and session management.


## Current Capabilities

- **Admin Authentication:**
  - Secure registration and login for admin users.
  - Passwords are hashed and stored in MongoDB Atlas.
  - JWT-based session management with HttpOnly cookies for security.
  - Automatic validation of admin session on every page reload and route change.

- **Dashboard UI:**
  - Edit homepage title, description, features, and main image.
  - Add, update, and delete homepage features dynamically.
  - Select images from the public folder or add external image links.
  - Preview homepage image.
  - Save homepage content changes directly to a GitHub repository.
  - Edit About page content, including team and contact info.
  - Manage blogs and images via dedicated admin sections.

- **Admin Management:**
  - Register new admin accounts (with domain and project association).
  - Validate admin credentials before dashboard access.

- **Session & Security:**
  - JWT tokens validated on backend for every session.
  - Loader animation during authentication.
  - Dashboard access denied until admin validation.

- **Extensible Structure:**
  - Easily add new content types, features, or admin roles.
  - Centralized authentication for multiple projects/sites.
  - Modular React components for easy extension.

- **API Endpoints:**
  - Validate admin and token via `/api/validate-admin` and `/api/validate-token`.
  - Create admin via `/api/create-admin`.
  - Commit changes via `/api/commit`.
  - List public images via `/api/list-public-images`.

- **Technology Stack:**
  - Next.js (React framework)
  - MongoDB Atlas
  - GitHub REST API integration
  - Tailwind CSS for styling

