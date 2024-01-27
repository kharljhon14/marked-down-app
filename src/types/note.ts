export interface NoteData {
  id: string;
  user_id: string;
  parent_id: string;
  title: string;
  content: string;
  is_published: boolean;
  created_At: Date;
  update_At: Date;
  child_notes: Array<NoteData>;
  child_count: number;
}
