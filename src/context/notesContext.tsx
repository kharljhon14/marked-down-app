import { NoteData } from '@/types/note';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';

interface NotesState {
  rootNotes: Array<NoteData>;
}

interface ActionPayload {
  type: 'set_root_notes';
  payload: Array<NoteData>;
}

export const NotesContext = createContext<NotesState | undefined>(undefined);
export const NotesDispatchContext = createContext<Dispatch<ActionPayload> | undefined>(undefined);

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

function setRootNotes(state: NotesState, action: ActionPayload) {
  return {
    ...state,
    rootNotes: action.payload,
  };
}

function reducer(state: NotesState, action: ActionPayload) {
  switch (action.type) {
    case 'set_root_notes':
      return setRootNotes(state, action);

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
