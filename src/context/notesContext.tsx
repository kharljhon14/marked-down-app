import { NoteData } from '@/types/note';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';

interface NotesState {
  rootNotes: Array<NoteData>;
}

export const NotesContext = createContext<NotesState | undefined>(undefined);
export const NotesDispatchContext = createContext<Dispatch<any> | undefined>(undefined);

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

function reducer(state: NotesState, action: any) {
  console.log(state, action);

  switch (action.type) {
    default:
      return state;
  }
}

const initialState = {
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
