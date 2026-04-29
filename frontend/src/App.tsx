import { useState } from 'react';
import './App.css';
import { Accordion, AccordionItem, Checklist, Timeline } from './components';

type Status = 'Registered' | 'Not Registered' | 'Unsure' | null;
type Category = 'General' | 'NRI/Overseas' | null;

interface GuideData {
  checklist: { title: string; description: string; link?: string }[];
  timeline: { date: string; title: string; description: string }[];
}

function App() {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState<string>('');
  const [status, setStatus] = useState<Status>(null);
  const [category, setCategory] = useState<Category>(null);
  const [loading, setLoading] = useState(false);
  const [guideData, setGuideData] = useState<GuideData | null>(null);

  const handleNext = () => {
    if (step === 1 && (!age || isNaN(Number(age)))) return;
    if (step === 2 && !status) return;
    if (step === 3 && !category) return;
    
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: Number(age),
          status,
          category,
        }),
      });
      const data = await response.json();
      setGuideData(data);
      setStep(4);
    } catch (error) {
      console.error("Error fetching guide:", error);
      alert("Failed to generate guide. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setAge('');
    setStatus(null);
    setCategory(null);
    setGuideData(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="container">
          <h1 className="text-blue" style={{ marginBottom: 0 }}>Election Guide Assistant</h1>
          <p className="text-muted">Your personalized guide to the Indian electoral process.</p>
        </div>
      </header>
      
      <main className="container" style={{ padding: '2rem 1rem', flex: 1 }}>
        {step < 4 ? (
          <div className="questionnaire-container fade-in">
            <div className="card">
              <div className="stepper">
                <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
                <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
              </div>

              {step === 1 && (
                <div className="fade-in">
                  <h2 className="text-center">Welcome! Let's get started.</h2>
                  <p className="text-center text-muted mb-4">First, please tell us your age to check eligibility.</p>
                  <div className="input-group">
                    <label className="input-label" htmlFor="age">Your Age</label>
                    <input 
                      type="number" 
                      id="age"
                      className="input-field" 
                      value={age} 
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 25"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="fade-in">
                  <h2 className="text-center">Are you registered to vote?</h2>
                  <p className="text-center text-muted mb-4">Select your current voter registration status.</p>
                  <div className="options-grid">
                    <div 
                      className={`option-card ${status === 'Registered' ? 'selected' : ''}`}
                      onClick={() => setStatus('Registered')}
                    >
                      <h3>Yes</h3>
                      <p className="text-muted">I have a Voter ID card and my name is on the electoral roll.</p>
                    </div>
                    <div 
                      className={`option-card ${status === 'Not Registered' ? 'selected' : ''}`}
                      onClick={() => setStatus('Not Registered')}
                    >
                      <h3>No</h3>
                      <p className="text-muted">I have never registered or my name was deleted.</p>
                    </div>
                    <div 
                      className={`option-card ${status === 'Unsure' ? 'selected' : ''}`}
                      onClick={() => setStatus('Unsure')}
                      style={{ gridColumn: '1 / -1' }}
                    >
                      <h3>I'm Not Sure</h3>
                      <p className="text-muted">I need help checking my status.</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="fade-in">
                  <h2 className="text-center">What is your voter category?</h2>
                  <p className="text-center text-muted mb-4">This helps us determine which forms apply to you.</p>
                  <div className="options-grid">
                    <div 
                      className={`option-card ${category === 'General' ? 'selected' : ''}`}
                      onClick={() => setCategory('General')}
                    >
                      <h3>General Voter</h3>
                      <p className="text-muted">Resident citizen of India.</p>
                    </div>
                    <div 
                      className={`option-card ${category === 'NRI/Overseas' ? 'selected' : ''}`}
                      onClick={() => setCategory('NRI/Overseas')}
                    >
                      <h3>NRI / Overseas</h3>
                      <p className="text-muted">Citizen of India living abroad.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-8 pt-4 border-t" style={{ borderTop: '1px solid var(--color-border)' }}>
                 <button 
                  className="btn btn-secondary" 
                  onClick={handleBack}
                  disabled={step === 1 || loading}
                 >
                   Back
                 </button>
                 
                 {step < 3 ? (
                   <button 
                    className="btn btn-primary" 
                    onClick={handleNext}
                    disabled={(step === 1 && (!age || isNaN(Number(age)))) || (step === 2 && !status)}
                   >
                     Next
                   </button>
                 ) : (
                   <button 
                    className="btn btn-primary" 
                    onClick={handleSubmit}
                    disabled={!category || loading}
                   >
                     {loading ? 'Generating...' : 'Get My Guide'}
                   </button>
                 )}
              </div>
            </div>
          </div>
        ) : (
          <div className="dashboard-view fade-in">
             <div className="flex justify-between items-center mb-6">
                <h2>Your Personalized Election Guide</h2>
                <button className="btn btn-outline" onClick={resetForm}>Start Over</button>
             </div>
             
             {guideData && (
               <div className="dashboard-grid">
                 <div className="flex-col gap-6">
                   <Checklist items={guideData.checklist} />
                   
                   <div className="card fade-in">
                     <h3 className="mb-4">Information Hub</h3>
                     <Accordion>
                       <AccordionItem title="What to bring on Voting Day?">
                         <p className="mb-2">You can vote only if your name appears in the Voter List. You need to show one of the following approved photo ID documents:</p>
                         <ul style={{ paddingLeft: '1.5rem' }}>
                           <li>Voter ID Card (EPIC)</li>
                           <li>Aadhaar Card</li>
                           <li>PAN Card</li>
                           <li>Driving License</li>
                           <li>Indian Passport</li>
                         </ul>
                       </AccordionItem>
                       <AccordionItem title="How to use EVM / VVPAT?">
                         <ol style={{ paddingLeft: '1.5rem' }}>
                           <li className="mb-2">Enter the polling booth and proceed to the EVM compartment.</li>
                           <li className="mb-2">Press the blue button against the name/symbol of your chosen candidate.</li>
                           <li className="mb-2">A red light will glow next to the symbol.</li>
                           <li>Check the VVPAT machine window. A printed slip showing the candidate's serial number, name, and symbol will be visible for 7 seconds before falling into the sealed box.</li>
                         </ol>
                       </AccordionItem>
                     </Accordion>
                   </div>
                 </div>
                 
                 <div>
                   <Timeline events={guideData.timeline} />
                 </div>
               </div>
             )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
