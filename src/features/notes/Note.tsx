import { useNotesDispatch, useNotesState } from '@/context/notesContext';
import { fetchNotes, updateParent } from '@/lib/client/api';
import { NoteData } from '@/types/note';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { DragEvent, MouseEvent } from 'react';
import NoteList from './NoteList';
import { fa } from '@faker-js/faker';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  note: NoteData;
  depth: number;
}

export default function Note({ note, depth }: Props) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const state = useNotesState();
  const dispatch = useNotesDispatch();

  /**
   * Check if noteA is a descendant of noteB
   * @param notesMap
   * @param notaA
   * @param noteB
   * @returns
   */
  const checkIfNoteIsDescendant = (
    notesMap: Map<string, NoteData>,
    notaA?: NoteData,
    noteB?: NoteData
  ) => {
    let curNote = notaA;

    while (curNote?.parent_id) {
      curNote = notesMap.get(curNote.parent_id);

      if (curNote?.id === noteB?.id) return true;
    }

    return false;
  };

  const handleDragStart = (e: DragEvent) => {
    console.log('Drag Start');
    dispatch({ type: 'update_current_drag_id', payload: note.id });
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log('Drag End');
  };

  const handleDrop = async (e: DragEvent) => {
    if (note.id === state.currentDragId || !state.currentDragId) return;

    console.log('Drop', note.id);
    console.log('Current Drag Id', state.currentDragId);

    if (
      checkIfNoteIsDescendant(
        state.notesMap,
        state.notesMap.get(note.id),
        state.notesMap.get(state.currentDragId)
      )
    ) {
      alert('Invalid action');
      return;
    }
    // Update parent api call
    await updateParent(state.currentDragId, note.id);

    // Dispatch change parent event

    dispatch({
      type: 'change_parent',
      payload: { newParentId: note.id, currentDragId: state.currentDragId },
    });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    console.log('Drag Over');
  };

  const handleDragEnter = (e: DragEvent) => {
    console.log('Drag Enter');
  };

  const handleDragLeave = (e: DragEvent) => {
    console.log('Drag Leave');
  };

  const handleExpand = async (e: MouseEvent) => {
    const childNotes = await fetchNotes(note.id);

    dispatch({
      type: 'add_child_notes_to_note',
      payload: {
        parentId: note.id,
        childNotes,
      },
    });
  };

  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams);
    params.set('note_id', id);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Box w="100%">
      <Box
        w="100%"
        bg="blue.100"
        borderRadius=".8rem"
        shadow="lg"
        p="1.2rem"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        mb=".6rem"
        cursor="pointer"
        onClick={(e) => handleClick(e, note.id)}
      >
        <VStack
          spacing={4}
          align="stretch"
        >
          <Box>
            <Heading size="lg">{note.title}</Heading>
            <Text
              color="gray.500"
              fontSize="xs"
            >
              {note.id}
            </Text>
          </Box>

          <Text>{note.content}</Text>

          <Box
            display="flex"
            justifyContent="space-between"
            fontSize="sm"
            color="gray.500"
          >
            <Text>Created at: {note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</Text>
            <Text>Updated at: {note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</Text>
          </Box>

          <Text>
            Status: <span className="font-bold">{note.is_published ? 'Published' : 'Draft'}</span>
          </Text>
        </VStack>
      </Box>

      {note.child_count > 0 && (
        <Button
          colorScheme="blue"
          onClick={handleExpand}
        >
          Expand
        </Button>
      )}

      {note.child_notes.length > 0 && (
        <NoteList
          notes={note.child_notes}
          depth={depth + 1}
        />
      )}
    </Box>
  );
}
