import React, { useState } from 'react';
import Header from './components/Header';
import WorkflowInput from './components/WorkflowInput';
import WorkflowVisualization from './components/WorkflowVisualization';

// Mock function to simulate AI processing
const processWorkflow = (text: string) => {
  // This would be replaced with actual AI processing
  return {
    nodes: [
      { id: '1', type: 'Trigger', label: 'Schedule: Daily at 9 AM' },
      { id: '2', type: 'Action', label: 'Check Emails' },
      { id: '3', type: 'Filter', label: 'Important Emails' },
      { id: '4', type: 'Action', label: 'Send to Slack' },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' },
    ],
  };
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [workflow, setWorkflow] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const result = processWorkflow(prompt);
      setWorkflow(result);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          <WorkflowInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          {workflow && (
            <WorkflowVisualization
              nodes={workflow.nodes}
              edges={workflow.edges}
            />
          )}

          {!workflow && !isLoading && (
            <div className="mt-8 text-center text-gray-500">
              <p>Enter your workflow description above to get started</p>
              <p className="text-sm mt-2">Example: "Every morning at 9 AM, check my emails, filter important ones, and send a summary to Slack"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;