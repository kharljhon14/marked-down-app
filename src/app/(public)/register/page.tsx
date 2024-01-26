import RegisterForm from '@/features/auth/register/RegisterForm';
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

export default function RegisterPage() {
  return (
    <div>
      <Card className="shadow-md max-w-lg">
        <CardHeader>
          <Heading>Sign Up</Heading>
        </CardHeader>

        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}
