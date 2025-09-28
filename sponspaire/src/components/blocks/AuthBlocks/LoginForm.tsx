import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  heading?: string;
  // logo: {
  //   url: string;
  //   src: string;
  //   alt: string;
  //   title?: string;
  // };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


const LoginForm = ({
  heading = "Login",
  // logo = {
  //   url: "https://www.shadcnblocks.com",
  //   src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
  //   alt: "logo",
  //   title: "shadcnblocks.com",
  // },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = `${baseUrl}/auth/signup`,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);

// Auth Login
const supabase = createClient();

const router = useRouter();

const handleLogin = async (email: string, password: string) => {
  setIsLoading(true);
  setError('');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error){
    setError(error.message);
    setIsLoading(false);
    return;
  }

  if (data){
    router.push('/dashboard');
    setIsLoading(false);
    return;
  }

  setIsLoading(false);
}
  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a> */}
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <Input
              type="email"
              placeholder="Email"
              className="text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              className="text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full" onClick={() => handleLogin(email, password)} disabled={isLoading}>
              {isLoading ? 'Loading...' : buttonText}
            </Button>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LoginForm };
