import { useNotesDispatch } from '@/context/notesContext';
import { createNote } from '@/lib/client/api';
import { Button } from '@chakra-ui/react';

export default function CreateNoteButton() {
  const dispatch = useNotesDispatch();

  const handleClick = async () => {
    const json = await createNote();
    console.log(json);

    dispatch({
      type: 'add_new_note_to_root_notes',
      payload: json,
    });
  };

  return <Button onClick={handleClick}>Cread Note</Button>;
}
