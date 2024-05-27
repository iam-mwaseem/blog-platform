# Blog platform

This project is a robust backend for a blog application, designed with security and efficiency in mind. It provides comprehensive features for user authentication, content management, and various other functionalities essential for a modern blogging platform.

## Features

### Authentication and Authorization

- JWT Authentication: Secure user authentication using JSON Web Tokens.
- Email Verification: Send OTPs (One-Time Passwords) to users' email addresses for account verification.
- Password Management:
  - Forgot Password: Allows users to reset their passwords if forgotten.
  - Reset Password: Securely update passwords using tokens sent to email.
- Protected Routes: Ensure that only authenticated users can access certain endpoints.

### Content Management

- File Uploading: Use libraries such as Multer and Busboy for efficient file handling and uploading.

- CRUD Operations: Perform Create, Read, Update, and Delete operations seamlessly on blog posts, comments, and other resources.

### Database Management

- Sequelize ORM: Utilize Sequelize to define models and interact with the MySQL database efficiently.
- MySQL: Relational database management system used to store and manage all data.

## Technologies used

- Node.js: JavaScript runtime environment.
- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- JWT: For secure authentication.
- Nodemailer: For sending emails (OTP for verification, password reset links).
- Multer & Busboy: Middleware for handling file uploads.
- Sequelize: Promise-based Node.js ORM for MySQL.
- MySQL: Relational database management system.
