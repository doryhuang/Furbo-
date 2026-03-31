export interface Option {
  label: string;
  nextId?: string;
  result?: Result;
}

export interface DeviceLink {
  name: string;
  url: string;
}

export interface Result {
  plan: string;
  device: string;
  link?: string;
  code?: string;
  macro?: string;
  notes?: string[];
  deviceLinks?: DeviceLink[];
}

export interface Node {
  id: string;
  question: string;
  options: Option[];
}

export interface DecisionTree {
  startNodeId: string;
  nodes: Record<string, Node>;
}
