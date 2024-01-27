'use client';

import { useFormState } from 'react-dom';
import { login } from './loginActions';
import PasswordInput from '@/components/PasswordInput';
import { Stack, Input, Button } from '@chakra-ui/react';

export default function LoginForm() {
  const initialState = { message: null, errors: {} };

  const [state, action] = useFormState(login, initialState);

  return (
    <form action={action}>
      <Stack spacing={3}>
        <div>
          <Input
            name="username"
            size="lg"
            placeholder="Username"
            isInvalid={!!state.errors?.username}
            errorBorderColor="red.400"
          />
          <span className="text-red-400 text-xs">{state.errors?.username}</span>
        </div>

        <div>
          <PasswordInput
            name="password"
            size="lg"
            placeholder="Password"
            isInvalid={!!state.errors?.password}
            errorBorderColor="red.400"
          />
          <span className="text-red-400 text-xs">{state.errors?.password}</span>
        </div>
      </Stack>
      <Button
        marginTop="1rem"
        w="100%"
        colorScheme="blue"
        type="submit"
      >
        Log In
      </Button>
    </form>
  );
}
