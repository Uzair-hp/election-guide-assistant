# Election Guide Assistant

A Dynamic Personalized Assistant built for the Hackathon Challenge. This project is tailored for the Indian electoral system to help citizens navigate the complex registration and voting process.

## 1. Chosen Vertical
**Civic Tech / Election Guide Assistant**
I chose this vertical to empower citizens by simplifying electoral procedures. The goal is to provide a highly localized, step-by-step guide and personalized timeline based on a user's current voter registration status and category.

## 2. Approach and Logic
The application logic revolves around a dynamic state-machine driven by user inputs:
1. **Eligibility Check:** The user inputs their age. If under 18, the system immediately returns an ineligible status.
2. **Status Determination:** The user selects if they are Registered, Not Registered, or Unsure.
3. **Category Selection:** The user specifies if they are a General Voter or NRI/Overseas.
4. **Dynamic Output:** Based on these three data points, the backend calculates the correct sequence of actions (e.g., prompting Form 6 for unregistered general voters, or Form 6A for NRIs) and generates a personalized action checklist and event timeline.

## 3. How the Solution Works
The solution uses a decoupled modern architecture to ensure clean code and fast performance:
- **Frontend (Vite + React + TypeScript):** Handles the interactive onboarding questionnaire and renders the personalized dashboard. It features a custom "Alerts System" using the native Browser Notifications API, an Interactive Timeline, and an Information Hub.
- **Backend (Node.js + Express + TypeScript):** Acts as the decision engine. It exposes a single `POST /api/generate-guide` endpoint that processes the user's state and returns the tailored checklist and timeline data.

## 4. Google Services Integration
This project integrates multiple meaningful Google Services to provide real-world usability:
1. **Google Calendar:** The interactive timeline automatically generates "Add to Calendar" links for each upcoming deadline, allowing users to schedule reminders instantly using the Google Calendar Template URL API.
2. **Google Maps:** The personalized dashboard embeds an interactive Google Map configured to automatically search for and display "polling stations near me", providing instant, localized logistical help without requiring the user to leave the app.

## 5. Assumptions Made
- The user is an Indian citizen navigating the Election Commission of India (ECI) process.
- Deadlines and specific election dates are marked as "TBD" or "Soon" in the mock data, assuming a real-world scenario where the backend would fetch live dates from a database or ECI API.
- The user's browser supports the `Notification` API for the Alerts feature.

---

## Getting Started

### Prerequisites
- Node.js (v18+)

### Running the App Easily
You can launch both the frontend and backend servers simultaneously by running the included batch script from the root folder:
```bash
.\start.bat
```
*(Or simply double-click `start.bat` in your File Explorer)*. The app will open at `http://localhost:56310/`.

### Running Manually

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
