# Resident Live Chat

This project was done as part to showcase my capabilities of writing code in Angular and use Websockets for a small live chat like application. I separated the stack into two: Frontend (Angular) and Backend (Node + Express)

This is not a complete solution but a partial one. It still needs Tests, Storybooks, optimization, better types, and a bit more planning.

## Resources

This app's backend is hosted on Render, and the frontend is on Vercel. The chat can be accessible from here. Note: I could have added a domain for this, but I already have too many so I choose not to.
Website is accessible following this [link here](https://resident-live-chat-two.vercel.app/)

## How to run locally

Several steps.

### Step 1: Clone the repository

```bash
git clone https://github.com/ToniAnton22/resident-live-chat.git
cd resident-live-chat
```

### Step 2: Run Backend

Open a terminal and run:

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3000`

### Step 3: Run Frontend

Open a **second terminal** and run:

```bash
cd frontend
npm install
ng serve
```

The frontend will start on `http://localhost:4200`

### Step 4: Open the application

Navigate to `http://localhost:4200` in your browser.

## Project Structure

```
resident-live-chat/
|-- backend/
|-- frontend/
|__ README.md
```

## What features were achieved against the requirements

- Real-time messaging using WebSockets
- User Join/leave notifications in chat
- Responsive UI, good UX/UI design
- Message timestamps
- Visual distinction between own messages, systems and others
- Active user count tracking (new)
- Hosted on both Render (backend) and Vercel (frontend)

Final note: As per requirments, messages are stored in memory not in a persisten storage, meaning any refresh will result in the messages being lost.
