import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';

export default function PasswordInput({ ...props }: Omit<InputProps, 'type'>) {
  const [show, setShow] = useState(false);

  return (
    <InputGroup size="md">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
      />
      <InputRightElement
        w="4rem"
        h="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          colorScheme="gray"
          size="sm"
          onClick={() => setShow(!show)}
        >
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
