import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type AuthStep = "initial" | "method" | "email-entry" | "password-entry";

interface UserData {
  email: string;
  password: string;
  authMethod: "google" | "email" | null;
}

const AuthFlow = () => {
  const [step, setStep] = useState<AuthStep>("initial");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Explicitly storing data in a variable
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    authMethod: null,
  });

  const handleAuthModeClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setStep("method");
  };

  const handleGoogleClick = () => {
    setUserData((prev) => ({ ...prev, authMethod: "google" }));
    setStep("email-entry");
  };

  const handleEmailClick = () => {
    setUserData((prev) => ({ ...prev, authMethod: "email" }));
    setStep("email-entry");
  };

  const handleEmailNext = () => {
    if (userData.email) {
      setStep("password-entry");
    }
  };

  const handlePasswordNext = () => {
    console.log("User Data:", userData);
    alert(
      `Auth complete!\nEmail: ${userData.email}\nMethod: ${userData.authMethod}`,
    );
  };

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  const LegalProjectLogo = () => (
    <div className="w-12 h-12 rounded-xl overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );

  // Initial screen with Login/Signup buttons
  if (step === "initial") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6">
          <LegalProjectLogo />
          <h1 className="text-3xl text-foreground">Legal Project</h1>
          <p className="text-muted-foreground">
            Welcome! Please sign in or create an account.
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleAuthModeClick("login")}
              className="px-8 py-2.5 rounded border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthModeClick("signup")}
              className="px-8 py-2.5 rounded bg-[hsl(var(--button-next))] text-[hsl(var(--button-next-foreground))] hover:opacity-90 transition-opacity font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Method selection screen
  if (step === "method") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="mb-8">
              <LegalProjectLogo />
            </div>
            <h2 className="text-2xl text-foreground mb-2">
              {authMode === "login" ? "Login" : "Sign Up"}
            </h2>
            <p className="text-muted-foreground mb-8">
              Choose your preferred method
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleClick}
                className="w-full flex items-center gap-3 px-4 py-3 rounded border border-border text-foreground hover:bg-secondary transition-colors"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-3 px-4 py-3 rounded border border-border text-foreground hover:bg-secondary transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Continue with Email</span>
              </button>
            </div>

            <button
              onClick={() => setStep("initial")}
              className="mt-6 text-link hover:underline text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Email entry screen (Page 1) - Exact Google style
  if (step === "email-entry") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[950px]">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <GoogleIcon />
              <span className="text-sm text-foreground">
                Sign in with Google
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Left side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <LegalProjectLogo />
                <h1 className="text-[40px] font-normal text-foreground mt-8 mb-1 leading-tight">
                  Sign in
                </h1>
                <p className="text-base text-foreground">
                  to continue to{" "}
                  <span className="text-link cursor-pointer hover:underline">
                    Legal Project
                  </span>
                </p>
              </div>

              {/* Right side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Email input - Google style floating label */}
                  <div className="relative">
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      className="w-full h-14 px-4 pt-4 pb-2 bg-card border rounded text-foreground outline-none transition-colors"
                      style={{
                        borderColor: emailFocused
                          ? "rgb(129, 152, 191)"
                          : "hsl(0, 0%, 40%)",
                        borderWidth: emailFocused ? "2px" : "1px",
                      }}
                    />
                    <label
                      className="absolute left-4 transition-all pointer-events-none"
                      style={{
                        top: emailFocused || userData.email ? "6px" : "50%",
                        transform:
                          emailFocused || userData.email
                            ? "none"
                            : "translateY(-50%)",
                        fontSize:
                          emailFocused || userData.email ? "12px" : "16px",
                        color: emailFocused
                          ? "hsl(211, 100%, 50%)"
                          : "hsl(0, 0%, 60%)",
                      }}
                    >
                      Email or phone
                    </label>
                  </div>

                  <button className="text-link hover:pointer text-sm font-medium">
                    Forgot email?
                  </button>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Before using this app, you can review Legal Project's{" "}
                    <span className="text-link hover:underline cursor-pointer">
                      privacy policy
                    </span>{" "}
                    and{" "}
                    <span className="text-link hover:underline cursor-pointer">
                      Terms of Service
                    </span>
                    .
                  </p>

                  <div className="flex justify-between items-center pt-4">
                    <button className="text-link hover:underline text-sm font-medium">
                      Create account
                    </button>
                    <button
                      onClick={handleEmailNext}
                      disabled={!userData.email}
                      className="px-6 py-2 rounded-3xl bg-[hsl(var(--button-next))] text-[hsl(var(--button-next-foreground))] hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 text-sm bg-background">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>English (United Kingdom)</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
              <div className="flex gap-8">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Help
                </span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Privacy
                </span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Terms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Password entry screen (Page 2) - Exact Google style
  if (step === "password-entry") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[850px]">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <GoogleIcon />
              <span className="text-sm text-foreground">
                Sign in with Google
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Left side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <LegalProjectLogo />
                <h1 className="text-[40px] font-normal text-foreground mt-8 mb-4 leading-tight">
                  Welcome
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="text-foreground text-sm">
                    {userData.email}
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <p className="text-foreground mb-6">
                  To continue, first verify that it's you
                </p>

                <div className="space-y-4">
                  {/* Password input - Google style floating label */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className="w-full h-14 px-4 pt-4 pb-2 bg-card border rounded text-foreground outline-none transition-colors"
                      style={{
                        borderColor: passwordFocused
                          ? "rgba(129, 152, 191)"
                          : "hsl(0, 0%, 40%)",
                        borderWidth: passwordFocused ? "2px" : "1px",
                      }}
                    />
                    <label
                      className="absolute left-4 transition-all pointer-events-none"
                      style={{
                        top:
                          passwordFocused || userData.password ? "6px" : "50%",
                        transform:
                          passwordFocused || userData.password
                            ? "none"
                            : "translateY(-50%)",
                        fontSize:
                          passwordFocused || userData.password
                            ? "12px"
                            : "16px",
                        color: passwordFocused
                          ? "hsl(211, 100%, 50%)"
                          : "hsl(0, 0%, 60%)",
                      }}
                    >
                      Enter your password
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="show-password"
                      checked={showPassword}
                      onCheckedChange={(checked) =>
                        setShowPassword(checked as boolean)
                      }
                      className="w-[18px] h-[18px] border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-sm"
                    />
                    <label
                      htmlFor="show-password"
                      className="text-sm text-foreground cursor-pointer select-none"
                    >
                      Show password
                    </label>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                    Before using this app, you can review Legal Project's{" "}
                    <span className="text-link hover:underline cursor-pointer">
                      privacy policy
                    </span>{" "}
                    and{" "}
                    <span className="text-link hover:underline cursor-pointer">
                      Terms of Service
                    </span>
                    .
                  </p>

                  <div className="flex justify-between items-center pt-4">
                    <button className="text-link hover:underline text-sm font-medium">
                      Forgot password?
                    </button>
                    <button
                      onClick={handlePasswordNext}
                      disabled={!userData.password}
                      className="px-6 py-2 rounded bg-[hsl(var(--button-next))] text-[hsl(var(--button-next-foreground))] hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-border text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>English (United Kingdom)</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
              <div className="flex gap-8">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Help
                </span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Privacy
                </span>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                  Terms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthFlow;
