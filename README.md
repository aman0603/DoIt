# Todo List Application

## Overview
This project is a **Todo List Application** built using modern web development technologies. The application allows users to manage tasks efficiently by adding notes, setting steps, due dates, and categorizing tasks into different sections like today's tasks and important tasks.

## Features
- **Add Tasks**: Users can add tasks with notes, steps, and due dates.
- **Task Categories**:
  - Today's Tasks
  - Important Tasks
  - All Tasks
  - Task assigned
  - Set due date
  - Write notes
  - Write steps
- **Login/Authentication**: Secure login system to manage tasks per user.
- **Responsive Design**: Styled with **Tailwind CSS** to ensure compatibility across devices.
- **State Management**: Powered by **Redux Toolkit** for managing application state seamlessly.
- **Type Safety**: Developed with **TypeScript** to ensure robust and maintainable code.

## Tech Stack
- **React**: Frontend library for building the user interface.
- **Redux Toolkit**: Simplified state management and global store.
- **TypeScript**: Adds type safety to JavaScript.
- **Tailwind CSS**: For responsive and utility-first styling.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Create a `.env` File**
   - Add necessary environment variables for authentication or API configurations. Example:
     ```env
     REACT_APP_API_URL=<your-api-url>
     REACT_APP_AUTH_KEY=<your-auth-key>
     ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Folder Structure
```
.
├── src
│   ├── assets       # Static assets like images
│   ├── components   # Reusable UI components
│   ├── features     # and feature logic
│   ├── store        # Redux store configuration  Redux slices
│   ├── styles       # Custom Tailwind CSS configurations
│   ├── types        # TypeScript type definitions
│   └── App.tsx      # Application entry point
├── public           # Public files (e.g., index.html)
├── .env             # Environment variables (excluded from version control)
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## Functionality
1. **Task Management**
   - Add tasks with detailed notes and steps.
   - Assign due dates to tasks.
   - Mark tasks as important.
2. **Filters**
   - View today's tasks.
   - View important tasks.
   - View all tasks.
3. **State Management**
   - Uses Redux Toolkit for efficient and predictable state management.
   - Task and filter states are stored globally.
4. **User Authentication**
   - A simple login system to authenticate users and segregate task data.
5. **Visual Charts**
   - Displays task completion stats (e.g., completed vs pending tasks) using charts.

## Available Scripts
- **`npm start`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm test`**: Launches the test runner.
- **`npm run eject`**: Ejects the app from Create React App (use with caution).

## Dependencies
- React
- Redux Toolkit
- TypeScript
- Tailwind CSS
- Chart.js (for task statistics visualization)
- lucide-react (for icons)

## Future Enhancements
- Implement drag-and-drop functionality for tasks.
- Add notifications for overdue tasks.
- Enable sharing tasks with other users.
- Add a calendar view for better task visualization.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Redux Toolkit Documentation
- Tailwind CSS Documentation
- Chart.js Documentation

