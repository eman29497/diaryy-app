import  AuthForm  from '../components/AuthForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-indigo-50">
      <AuthForm type="signup" />
    </main>
  );
}