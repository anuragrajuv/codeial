# Codeial Social Media

## Description

This project is a full-stack web application built using Node.js, Express, and EJS. It incorporates various features such as authentication, user interactions, notifications, real-time chat, and optimized asset management. The application follows best practices in structuring code, utilizing modern JavaScript techniques, and integrating essential web development tools.

## Features

- **Authentication & Authorization**

  - User sign-up and sign-in using Passport.js
  - Google OAuth and Facebook login integration
  - JWT-based authentication for API requests

- **User Management**

  - Profile creation and updates
  - Profile picture upload and replacement
  - Friends list management (adding and deleting friends)

- **Posts & Comments**

  - Creating, editing, and deleting posts
  - Adding and deleting comments
  - Like functionality for posts
  - Mail notifications for post comments

- **Real-time Chat**

  - Chatbox implementation using Socket.io
  - Active chatting functionality

- **AJAX & Notifications**

  - Asynchronous post creation and deletion
  - AJAX-based comment management
  - Noty.js notifications for user actions

- **Performance & Optimization**

  - GULP for asset management
  - Environment variable configuration
  - MongoDB session storage using mongoStore
  - Code refactoring with async/await

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, EJS, Noty.js
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Passport.js, JWT, Google OAuth, Facebook Login
- **Real-time Communication:** Socket.io
- **Build Tools:** GULP
- **Database:** MongoDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/anuragrajuv/codeial.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add required variables (e.g., database URL, OAuth credentials, etc.).
5. Start the application:
   ```sh
   npm start
   ```

## Usage

- Users can sign up, sign in, and manage their profiles.
- Posts and comments can be created, liked, and deleted.
- Friends can be added and removed.
- Chat functionality enables real-time messaging.

## Contributions

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
