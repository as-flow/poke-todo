export type Task = {
  id: string;
  text: string;
  completed: boolean;
  timeRequired: string;
  category: "recurring" | "urgent" | "future";
};