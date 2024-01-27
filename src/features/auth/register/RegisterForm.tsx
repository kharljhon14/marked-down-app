'use client';

import { Button, Input, Stack } from '@chakra-ui/react';
import { useFormState } from 'react-dom';
import { registerAction } from './registerAction';
import PasswordInput from '@/components/PasswordInput';

const initialState = { message: null, errors: {} };

export default function RegisterForm() {
  const [state, action] = useFormState(registerAction, initialState);

  console.log(state.message);

  return (
    <form action={action}>
      <Stack spacing={3}>
        <div>
          <Input
            name="username"
            size="lg"
            placeholder="Username"
          />
          <span className="text-red-400 text-xs">{state.errors?.username}</span>
        </div>

        <div>
          <PasswordInput
            name="password"
            size="lg"
            placeholder="Password"
          />
          <span className="text-red-400 text-xs">{state.errors?.password}</span>
        </div>

        <div>
          <PasswordInput
            name="confirmPassword"
            size="lg"
            placeholder="Confirm Password"
          />
          <span className="text-red-400 text-xs">{state.errors?.confirmPassword}</span>
        </div>
      </Stack>

      <Button
        marginTop="1rem"
        w="100%"
        colorScheme="blue"
        type="submit"
      >
        Register
      </Button>
    </form>
  );
}
