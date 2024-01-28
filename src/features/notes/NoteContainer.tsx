'use client';

import { useNotesDispatch, useNotesState } from '@/context/notesContext';
import { fetchNotes } from '@/lib/client/api';
import { useEffect } from 'react';

async function init() {
  console.log('Init');
  const notes = await fetchNotes();

  return notes;
}

export default function NoteContainer() {
  const state = useNotesState();
  const dispatch = useNotesDispatch();

  useEffect(() => {
    init().then((result) => dispatch({ type: 'set_root_notes', payload: result }));
  }, [dispatch]);

  if (!state.rootNotes) return <div>Loading...</div>;

  return (
    <div>
      <h1>Note Container</h1>
    </div>
  );
}
