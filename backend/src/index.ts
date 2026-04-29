import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

interface GuideRequest {
  age: number;
  status: 'Registered' | 'Not Registered' | 'Unsure';
  category: 'General' | 'NRI/Overseas';
}

interface Action {
  title: string;
  description: string;
  link?: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  calendarLink?: string;
}

interface GuideResponse {
  checklist: Action[];
  timeline: TimelineEvent[];
}

const generateCalendarLink = (title: string, description: string) => {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  return `${baseUrl}&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}`;
};

app.post('/api/generate-guide', (req: Request, res: Response) => {
  const { age, status, category } = req.body as GuideRequest;

  if (age < 18) {
    return res.json({
      checklist: [
        {
          title: "Wait until you're 18",
          description: "You must be 18 years or older to vote in India.",
        }
      ],
      timeline: []
    });
  }

  const checklist: Action[] = [];
  const timeline: TimelineEvent[] = [
    { 
      date: "Soon", 
      title: "Election Announcement", 
      description: "ECI announces election dates.",
      calendarLink: generateCalendarLink("Election Announcement Expected", "ECI announces election dates. Watch news for updates.")
    },
    { 
      date: "TBD", 
      title: "Last Date for Voter Registration", 
      description: "Ensure your name is on the electoral roll before this date.",
      calendarLink: generateCalendarLink("Voter Registration Deadline", "Ensure your name is on the electoral roll before this date.")
    },
    { 
      date: "TBD", 
      title: "Polling Day", 
      description: "Cast your vote at your designated polling booth.",
      calendarLink: generateCalendarLink("Election Polling Day", "Cast your vote at your designated polling booth.")
    },
    { 
      date: "TBD", 
      title: "Counting Day", 
      description: "Results are declared.",
      calendarLink: generateCalendarLink("Election Counting Day", "Results are declared.")
    }
  ];

  if (status === 'Not Registered' || status === 'Unsure') {
    if (category === 'NRI/Overseas') {
       checklist.push({
         title: "Fill Form 6A",
         description: "As an NRI, you need to fill Form 6A to register as an overseas elector.",
         link: "https://voters.eci.gov.in/"
       });
    } else {
      checklist.push({
        title: "Fill Form 6",
        description: "Apply online for registration as a new voter using Form 6.",
        link: "https://voters.eci.gov.in/"
      });
    }
    if (status === 'Unsure') {
       checklist.unshift({
        title: "Check Electoral Roll",
        description: "Search your name in the electoral roll to confirm if you are already registered.",
        link: "https://electoralsearch.eci.gov.in/"
      });
    }
  } else if (status === 'Registered') {
     checklist.push({
        title: "Verify Details",
        description: "Check your voter slip and verify your polling booth location.",
        link: "https://electoralsearch.eci.gov.in/"
     });
     checklist.push({
        title: "Know your Candidates",
        description: "Research the candidates contesting from your constituency using the KYC App."
     });
  }

  res.json({ checklist, timeline });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
