'use client';

import { useNotesDispatch, useNotesState } from '@/context/notesContext';
import { fetchNotes } from '@/lib/client/api';
import { useEffect } from 'react';

import NoteList from './NoteList';
import { Box } from '@chakra-ui/react';

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
    <Box>
      <NoteList />
    </Box>
  );
}
