'use client';

import { Button, Input } from '@chakra-ui/react';
import { useFormState } from 'react-dom';
import { registerAction } from './registerAction';

const initialState = { message: null, errors: {} };

export default function RegisterForm() {
  const [state, action] = useFormState(registerAction, initialState);

  console.log(state.message);

  return (
    <form action={action}>
      <div className="space-y-2">
        <Input
          name="username"
          placeholder="Username"
        />
        <span className="text-red-400 text-xs">{state.errors?.username}</span>

        <Input
          name="password"
          placeholder="Password"
          type="password"
        />
        <span className="text-red-400 text-xs">{state.errors?.password}</span>

        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
        />
        <span className="text-red-400 text-xs">{state.errors?.confirmPassword}</span>
      </div>

      <Button
        className="mt-4 w-full"
        colorScheme="teal"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
}
