export type PromptItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  tags: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PromptDraft = {
  title: string;
  description?: string;
  imageUrl: string;
  tags: string[];
  content: string;
};
