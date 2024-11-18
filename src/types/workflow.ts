export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'filter' | 'loop' | 'condition';
  label: string;
  description?: string;
  icon?: string;
}

export interface WorkflowEdge {
  source: string;
  target: string;
  label?: string;
}

export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface OpenAIResponse {
  workflow: WorkflowData;
  error?: string;
}