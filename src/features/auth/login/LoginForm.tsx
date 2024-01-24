'use client';

import { useFormState } from 'react-dom';
import { login } from './actions';

export default function LoginForm() {
  const initialState = { message: null, errors: {} };

  const [formState, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col space-y-2 max-w-lg">
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
        />

        <button>Log In</button>
      </div>
      <div>
        {formState.errors?.username}
        {formState.errors?.password}
        {formState.message}
      </div>
    </form>
  );
}
