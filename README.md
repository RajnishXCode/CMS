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
  - Preview the current homepage image.
  - Save changes to homepage content directly to a GitHub repository (using the GitHub REST API).

- **Admin Management:**
  - Register new admin accounts (with domain and project association).
  - Validate admin credentials before granting access to dashboard features.

- **Session & Security:**
  - JWT tokens are validated on the backend for every session.
  - Loader animation is shown while authentication is being validated.
  - Access to dashboard is denied until admin validation is complete.

- **Extensible Structure:**
  - Easily add new content types, features, or admin roles.
  - Centralized authentication for multiple projects/sites.

