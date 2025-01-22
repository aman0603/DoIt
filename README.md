# Todo App

![Todo App ](/src/assets/login.png "Sign In  ")
![Todo App ](/src/assets/img2.png "Todo App  ")
![Todo App ](/src/assets/img3.png "Todo App  ")

This is a Todo app built with React, Redux Toolkit, and TypeScript...

## Overview
This project is a **Todo List Application** built using modern web development technologies. The application allows users to manage tasks efficiently by adding notes, setting steps, due dates, weather and categorizing tasks into different sections like today's tasks and important tasks.

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
  - Weather update
    
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
   git clone [https://github.com/aman0603/DoIt.git]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
  

3. **Create a `.env` File**
   - Add necessary environment variables for authentication or API configurations. Example:
     ```env
     VITE_WEATHER_API_KEY=  
     ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
 

5. **Open in Browser**
   Visit [https://todo-web-xi.vercel.app/) to view the application.

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
6. **openweather api integration**
   -Display temprature and weather condition
## Available Scripts
- **`npm run dev`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production.

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
  
## Acknowledgements
- Redux Toolkit Documentation
- Tailwind CSS Documentation
- Chart.js Documentation

