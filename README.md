# Election Guide Assistant (India)

A Dynamic Personalized Assistant tailored for the Indian electoral system. The goal of this project is to provide citizens with a clear, step-by-step guide and personalized timeline based on their current voter registration status.

## Features

- **Onboarding Questionnaire:** An interactive step-by-step form to determine user eligibility (Age), current registration status, and voter category (General vs. NRI/Overseas).
- **Personalized Dashboard:** 
  - **Action Checklist:** A tailored step-by-step guide with relevant forms (Form 6, Form 6A, etc.) based on user inputs.
  - **Interactive Timeline:** A visual representation of upcoming election deadlines.
- **Information Hub:** Interactive accordions explaining Voting Day procedures (EVM/VVPAT) and acceptable ID documents.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Vanilla CSS.
- **Backend:** Node.js, Express, TypeScript.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on `http://localhost:3001` by default):
   ```bash
   npm run dev
   # OR run the compiled version
   # node src/index.js
   ```

### Running the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the provided local URL in your browser (usually `http://localhost:56310` or `http://localhost:5173`).

## Project Structure

- `frontend/` - Contains the React application. Key logic is located in `src/App.tsx` and components are inside `src/components.tsx`.
- `backend/` - Contains the Express server. The main API endpoint (`/api/generate-guide`) is defined in `src/index.ts`.

## Design System

The application uses a custom design system built with vanilla CSS variables representing the Indian tricolor (Saffron, White, Green) with Ashoka Chakra Blue accents.

## License

MIT License
