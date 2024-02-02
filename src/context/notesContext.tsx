import { NoteData } from '@/types/note';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';

interface NotesState {
  rootNotes: Array<NoteData>;
  currentDragId: string | null;
  notesMap: Map<string, NoteData>;
}

interface ActionPayload<T> {
  type:
    | 'set_root_notes'
    | 'add_new_note_to_root_notes'
    | 'sort_notes'
    | 'update_current_drag_id'
    | 'change_parent'
    | 'add_child_notes_to_note';
  payload: T;
}

export const NotesContext = createContext<NotesState | undefined>(undefined);
export const NotesDispatchContext = createContext<Dispatch<ActionPayload<any>> | undefined>(
  undefined
);

export function useNotesState() {
  const context = useContext(NotesContext);
  if (!context) throw new Error('Must be inside NotesContext provider!');

  return context;
}

export function useNotesDispatch() {
  const context = useContext(NotesDispatchContext);
  if (!context) throw new Error('Must be inside NotesDispatchContext provider!');

  return context;
}

function addNotesToCache(notesMap: Map<string, NoteData>, notes: Array<NoteData>) {
  notes.forEach((note) => {
    notesMap.set(note.id, note);
  });
}

function setRootNotes(state: NotesState, action: ActionPayload<Array<NoteData>>) {
  addNotesToCache(state.notesMap, action.payload);

  return {
    ...state,
    rootNotes: action.payload,
  };
}

function addNewNoteToRootNotes(state: NotesState, action: ActionPayload<NoteData>) {
  addNotesToCache(state.notesMap, [action.payload]);

  const newRootNotes = [...state.rootNotes];

  newRootNotes.unshift(action.payload);

  return {
    ...state,
    rootNotes: newRootNotes,
  };
}

function sortNotes(state: NotesState, action: ActionPayload<string>) {
  const newState = {
    ...state,
  };

  sortNotesRecursively(newState.rootNotes, action.payload);

  return newState;
}

function sortNotesRecursively(notes: Array<NoteData>, sortKey: string) {
  notes.sort((a, b) => {
    const reverse = sortKey.startsWith('-');

    const key = reverse ? sortKey.slice(1) : sortKey;

    if (a[key as keyof NoteData] < b[key as keyof NoteData]) return reverse ? 1 : -1;

    if (a[key as keyof NoteData] > b[key as keyof NoteData]) return reverse ? -1 : 1;

    return 0;
  });

  notes.forEach((note) => {
    if (note.child_notes.length > 0) {
      sortNotesRecursively(note.child_notes, sortKey);
    }
  });
}

function updateCurrentDragId(state: NotesState, action: ActionPayload<string>) {
  return {
    ...state,
    currentDragId: action.payload,
  };
}

function changeParent(
  state: NotesState,
  action: ActionPayload<{ newParentId: string; currentDragId: string }>
) {
  // Get currently dragging note

  const { newParentId, currentDragId } = action.payload;
  const currentDraggingNote = state.notesMap.get(currentDragId);

  if (!currentDraggingNote) return state;

  // Get old parent
  const oldParentId = currentDraggingNote.parent_id;
  const oldParentNote = state.notesMap.get(oldParentId);

  // Get new Parent
  const newParent = state.notesMap.get(newParentId);

  if (!newParent) return state;

  const newState = {
    ...state,
  };

  // Remove the currently dragging note from old parent or root notes

  if (oldParentNote) {
    oldParentNote.child_notes.splice(
      oldParentNote.child_notes.findIndex((note) => note.id === currentDragId),
      1
    );
  } else {
    newState.rootNotes.splice(
      newState.rootNotes.findIndex((note) => note.id === currentDragId),
      1
    );
  }

  // Add the currently dragging note to new parent

  newParent.child_notes.push(currentDraggingNote);
  currentDraggingNote.parent_id = newParent.id;

  console.log(newState);

  return newState;
}

function addChildNotesToNote(
  state: NotesState,
  action: ActionPayload<{ parentId: string; childNotes: Array<NoteData> }>
) {
  addNotesToCache(state.notesMap, action.payload.childNotes);

  const newState = {
    ...state,
  };

  const note = newState.notesMap.get(action.payload.parentId);

  if (note) note.child_notes = action.payload.childNotes;

  return newState;
}

function reducer(state: NotesState, action: ActionPayload<any>) {
  switch (action.type) {
    case 'set_root_notes':
      return setRootNotes(state, action);

    case 'add_new_note_to_root_notes':
      return addNewNoteToRootNotes(state, action);

    case 'sort_notes':
      return sortNotes(state, action);

    case 'update_current_drag_id':
      return updateCurrentDragId(state, action);

    case 'change_parent':
      return changeParent(state, action);

    case 'add_child_notes_to_note':
      return addChildNotesToNote(state, action);

    default:
      return state;
  }
}

const initialState: NotesState = {
  rootNotes: [],
  currentDragId: null,
  notesMap: new Map<string, NoteData>(),
};

export function NotesProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotesContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>{children}</NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}
