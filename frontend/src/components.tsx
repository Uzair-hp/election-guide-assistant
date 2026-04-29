import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, CalendarPlus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className="accordion-content">
        {children}
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="accordion">
      {children}
    </div>
  );
};

interface Action {
  title: string;
  description: string;
  link?: string;
}

export const Checklist: React.FC<{ items: Action[] }> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="card fade-in">
      <h3>Your Action Plan</h3>
      <div className="mt-4">
        {items.map((item, index) => (
          <div key={index} className="checklist-item">
             <CheckCircle className="checklist-icon" size={24} />
             <div>
                <h4 className="mb-1">{item.title}</h4>
                <p className="text-muted mb-2">{item.description}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem'}}>
                    Take Action
                  </a>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  calendarLink?: string;
}

export const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="card fade-in">
      <h3>Upcoming Events</h3>
      <div className="timeline mt-4">
        {events.map((event, index) => (
          <div key={index} className="timeline-event">
            <span className="timeline-date">{event.date}</span>
            <h4>{event.title}</h4>
            <p className="text-muted">{event.description}</p>
            {event.calendarLink && (
               <a href={event.calendarLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-2" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                  <CalendarPlus size={14} /> Add to Calendar
               </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
