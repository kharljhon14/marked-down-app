import AuthCard from '@/features/auth/AuthCard';
import LoginForm from '@/features/auth/login/LoginForm';

export default function Page() {
  return (
    <AuthCard title="Log In">
      <LoginForm />
    </AuthCard>
  );
}
