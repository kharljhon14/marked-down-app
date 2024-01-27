import AuthCard from '@/features/auth/AuthCard';
import RegisterForm from '@/features/auth/register/RegisterForm';
import { Center } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <Center h="100vh">
      <AuthCard title="Register">
        <RegisterForm />
      </AuthCard>
    </Center>
  );
}
