import { NoteData } from '@/types/note';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';

interface NotesState {
  rootNotes: Array<NoteData>;
}

interface ActionPayload<T> {
  type: 'set_root_notes' | 'add_new_note_to_root_notes' | 'sort_notes';
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

function setRootNotes(state: NotesState, action: ActionPayload<Array<NoteData>>) {
  return {
    ...state,
    rootNotes: action.payload,
  };
}

function addNewNoteToRootNotes(state: NotesState, action: ActionPayload<NoteData>) {
  const newRootNotes = [...state.rootNotes];

  newRootNotes.unshift(action.payload);

  return {
    ...state,
    rootNotes: newRootNotes,
  };
}

function reducer(state: NotesState, action: ActionPayload<any>) {
  switch (action.type) {
    case 'set_root_notes':
      return setRootNotes(state, action);

    case 'add_new_note_to_root_notes':
      return addNewNoteToRootNotes(state, action);

    default:
      return state;
  }
}

const initialState: NotesState = {
  rootNotes: [],
};

export function NotesProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotesContext.Provider value={state}>
      <NotesDispatchContext.Provider value={dispatch}>{children}</NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}
