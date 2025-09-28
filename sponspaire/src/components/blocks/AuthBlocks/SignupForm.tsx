import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";

interface SignupFormProps {
  heading?: string;
  //   logo: {
  //     url: string;
  //     src: string;
  //     alt: string;
  //     title?: string;
  //   };

  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const SignupForm = ({
  heading = "Signup",
  //   logo = {
  //     url: "https://www.shadcnblocks.com",
  //     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
  //     alt: "logo",
  //     title: "shadcnblocks.com",
  //   },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = `${baseUrl}/auth/login`,
}: SignupFormProps) => {

  // Auth Signup
  const supabase = createClient();

  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storingData = async (firstName: string, lastName: string, email: string, plan: string) => {
    const { data, error } = await supabase.from('users').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      plan_type: plan,
    })

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  }

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!firstName || !lastName) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (data && data.user) {
        
        const dataStored = await storingData(firstName, lastName, email, selectedPlan);
        
        if (dataStored) {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
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
          
          {/* Name Fields */}
          <div className="flex gap-2 w-full">
            <Input
              type="text"
              placeholder="First Name"
              className="text-sm"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="text-sm"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
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
          <Input
            type="password"
            placeholder="Confirm Password"
            className="text-sm"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Plan Selection Card */}
          <div className="w-full space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Choose your plan</h3>
            <div className="grid grid-cols-2 gap-2">
              <div 
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedPlan === 'free' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => setSelectedPlan('free')}
              >
                <div className="text-sm font-medium">Free</div>
                <div className="text-xs text-muted-foreground">100 credits</div>
              </div>
              <div 
                className={`p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedPlan === 'pro' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted hover:border-primary/50'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <div className="text-sm font-medium">Pro</div>
                <div className="text-xs text-muted-foreground">Unlimited + 24/7 support</div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" onClick={handleSignup} disabled={isLoading}>
            {isLoading ? 'Loading...' : buttonText}
          </Button>
        </div>
        <div className="text-muted-foreground flex justify-center gap-1 text-sm">
          <p>{signupText}</p>
          <a
            href={signupUrl}
            className="text-primary font-medium hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

export { SignupForm };