import { useNotesState } from '@/context/notesContext';
import Note from './Note';
import { Box, StackDivider, VStack } from '@chakra-ui/react';

export default function NoteList() {
  const state = useNotesState();

  return (
    <VStack
      spacing={4}
      divider={<StackDivider borderColor="gray.300" />}
    >
      {state.rootNotes.map((note) => (
        <Box key={note.id}>
          <Note note={note} />
        </Box>
      ))}
    </VStack>
  );
}
