import { redirect } from 'next/navigation';
// redirect tos signup page fore now- soon session will be implemented
export default function AuthPage() {
  redirect('/auth/signup');
}
