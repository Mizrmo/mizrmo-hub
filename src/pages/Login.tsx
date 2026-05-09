import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginIllustration } from "@/components/LoginIllustration";
import mizrmoLogo from "@/assets/mizrmo/mizrmo_logo_white.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden md:flex md:w-1/2 bg-primary flex-col items-center justify-center p-12 relative overflow-hidden">
        <img
          src={mizrmoLogo}
          alt="Mizrmo Logo"
          className="h-12 w-auto object-contain mb-8 z-10"
        />
        <LoginIllustration className="w-full max-w-lg object-contain text-white z-10 drop-shadow-2xl" />
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-8 bg-secondary">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-10">
          <h2 className="text-xl font-semibold text-foreground mb-8">
            Sign in with your email
          </h2>
          <form onSubmit={handleSignIn} className="space-y-5">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full px-5 bg-secondary border-0"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-full px-5 bg-secondary border-0"
            />
            <Button
              type="submit"
              className="w-full h-12 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
