'use client';

import { useNotesDispatch, useNotesState } from '@/context/notesContext';
import { fetchNotes } from '@/lib/client/api';
import { useEffect } from 'react';

import NoteList from './NoteList';
import { Box } from '@chakra-ui/react';
import { NoteData } from '@/types/note';
import CreateNoteButton from './CreateNoteButton';
import SortNotesSelect from './SortNotesSelect';

async function init(): Promise<NoteData[]> {
  const notes = await fetchNotes();

  return notes;
}

export default function NoteContainer() {
  const state = useNotesState();
  const dispatch = useNotesDispatch();

  const handleChange = (value: string) => {
    dispatch({
      type: 'sort_notes',
      payload: value,
    });
  };

  useEffect(() => {
    init().then((result) => dispatch({ type: 'set_root_notes', payload: result }));
  }, [dispatch]);

  if (!state.rootNotes) return <div>Loading...</div>;

  return (
    <Box>
      <SortNotesSelect onChange={handleChange} />
      <CreateNoteButton />
      <NoteList />
    </Box>
  );
}
