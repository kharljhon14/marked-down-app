import { Button, Input } from '@chakra-ui/react';

export default function RegisterForm() {
  return (
    <form action="">
      <div className="space-y-2">
        <Input placeholder="Username" />
        <Input
          placeholder="Password"
          type="password"
        />
        <Input
          placeholder="Confirm Password"
          type="password"
        />
      </div>

      <Button
        className="mt-4 w-full"
        colorScheme="teal"
      >
        Register
      </Button>
    </form>
  );
}
