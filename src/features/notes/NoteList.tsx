import { useNotesState } from '@/context/notesContext';
import Note from './Note';
import { StackDivider, VStack } from '@chakra-ui/react';
import { NoteData } from '@/types/note';

interface Props {
  notes: Array<NoteData>;
  depth?: number;
}

export default function NoteList({ notes, depth = 0 }: Props) {
  return (
    <VStack
      spacing={depth === 0 ? 4 : 1}
      divider={depth === 0 ? <StackDivider borderColor="gray.300" /> : <></>}
      marginLeft={`${depth * 10}px`}
    >
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          depth={depth}
        />
      ))}
    </VStack>
  );
}
