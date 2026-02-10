import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { googleLogin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google Login Failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    try {
      const result = await login(email, password);
      if (result.error) {
        setErrors({ submit: result.error.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login Failed", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-base p-4">
      <div className="w-full max-w-md bg-card-base retro-border p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold uppercase tracking-widest">
              Login
            </h1>
          </div>
          <p className="text-text-base/60 text-sm font-medium uppercase tracking-wide">
            Welcome back, Habit Tracker!
          </p>
        </div>

        {/* Global Error */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-500 text-red-700 text-sm font-bold retro-border">
            {errors.submit}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <InputBox
            label="EMAIL"
            placeholder="YOUR@EMAIL.COM"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <InputBox
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full retro-border bg-accent-base text-bg-base py-3 px-4 font-bold tracking-widest uppercase hover:bg-accent-base/90 transition-colors shadow-lg active:translate-y-0.5 active:shadow-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Accessing..." : "Access System"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-0.5 bg-border-base/20 flex-1"></div>
          <span className="text-xs font-bold text-text-base/40 uppercase tracking-widest">
            OR
          </span>
          <div className="h-0.5 bg-border-base/20 flex-1"></div>
        </div>

        <div
          className="flex justify-center cursor-pointer retro-border py-3 px-4"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-text-base/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-accent-base hover:underline decoration-2 underline-offset-4"
            >
              Initialize Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
