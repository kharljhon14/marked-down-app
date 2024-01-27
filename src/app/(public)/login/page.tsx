import AuthCard from '@/features/auth/AuthCard';
import LoginForm from '@/features/auth/login/LoginForm';
import { Center } from '@chakra-ui/react';

export default function Page() {
  return (
    <Center h="100vh">
      <AuthCard title="Log In">
        <LoginForm />
      </AuthCard>
    </Center>
  );
}
