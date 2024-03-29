import { NoteData } from '@/types/note';
import { DateTime } from 'luxon';
import { json } from 'stream/consumers';

function transformJsonToNote(json: any): NoteData {
  return {
    ...json,
    created_at: DateTime.fromISO(json.created_at),
    updated_at: DateTime.fromISO(json.updated_at),
    child_notes: [],
  };
}

export async function fetchNotes(parent_id?: string): Promise<NoteData[]> {
  let queryString = '';

  if (parent_id) {
    queryString += '?parent_id=' + parent_id;
  }

  const notesRes = await fetch('/api/notes' + queryString);

  const json = await notesRes.json();

  const transformed = json.notes?.map((data: any) => transformJsonToNote(data));

  return transformed;
}

export async function createNote() {
  const res = await fetch('/api/notes', { method: 'POST' });

  const json = await res.json();

  return transformJsonToNote(json.note);
}

export async function updateParent(currentDraggingId: string, newParentId: string) {
  await fetch(`/api/notes/${currentDraggingId}`, {
    method: 'POST',
    body: JSON.stringify({ parent_id: newParentId }),
  });
}
