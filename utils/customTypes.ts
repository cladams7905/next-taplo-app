export type ActiveProject = {
  created_at: string;
  id: number;
  project_name: string | null;
  user_id: string | null;
  SessionData: {
    last_opened: string | null;
  }[];
} | null;
