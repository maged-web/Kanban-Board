# Kanban-Board
An online mental health clinic is building a new board to allow its operations team to keep track of new bookings.


# Kanban Board Bookings - Setup Instructions

This document outlines the steps to clone and run the Kanban Board project locally, including the backend and frontend setup along with the database configuration.

## Cloning the Project

1. Clone the repository to your local machine:
    git clone https://github.com/maged-web/Kanban-Board

cd kanban_board

Setting Up the Database
Start your XAMPP control panel and ensure that Apache and MySQL services are running.
Open phpMyAdmin by navigating to http://localhost/phpmyadmin.
Create a new database named kanban_board.

Running the Backend

Navigate to the backend directory:
cd backend

Install the required dependencies:
npm install

Start the development server:
npm run start:dev

The backend should now be running on http://localhost:3000.


Running the Frontend:

Navigate to the frontend directory:
cd frontend

Install the required dependencies:
npm install

Start the development server:
npm run dev

The frontend should now be accessible at http://localhost:5173.

Once both the backend and frontend servers are running, you can access the Kanban Board application in your web browser at http://localhost:5173.


