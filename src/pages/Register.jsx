import { useState } from "react";
import InputBox from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { googleLogin, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const restructuredData = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      };
      const result = await register(restructuredData);
      if (result.user) {
        navigate("/");
      } else if (result.error) {
        setErrors({ submit: result.error.message || "Registration failed" });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error("Google Login Failed", error);
    }
  };

  return (
    <div
      className="
        min-h-screen w-full bg-bg-base
        flex justify-center
        px-4 py-4
        sm:items-center
      "
    >
      <div
        className="
          w-full max-w-md
          bg-card-base retro-border shadow-xl
          p-6 sm:p-8
        "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserPlus className="size-8 text-accent-base" />
            <h1 className="text-3xl font-bold uppercase tracking-widest">
              Register
            </h1>
          </div>
          <p className="text-text-base/60 text-sm font-medium uppercase tracking-wide">
            Begin your journey today
          </p>
        </div>

        {/* Global Error */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-500 text-red-700 text-sm font-bold retro-border">
            {errors.submit}
          </div>
        )}

        {/* Form */}
        <form className="space-y-3" onSubmit={handleRegister}>
          <InputBox
            label="FULL NAME"
            placeholder="ENTER YOUR FULL NAME"
            id="full_name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            error={errors.full_name}
          />
          <InputBox
            label="EMAIL"
            type="email"
            placeholder="YOUR@EMAIL.COM"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />
          <InputBox
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
          />
          <InputBox
            label="CONFIRM PASSWORD"
            type="password"
            placeholder="••••••••"
            id="confirm_password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
            error={errors.confirm_password}
          />

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full mt-4 py-3 px-4
              retro-border bg-accent-base text-bg-base
              font-bold tracking-widest uppercase
              hover:bg-accent-base/90 transition
              shadow-lg active:translate-y-0.5 active:shadow-sm
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-0.5 bg-border-base/20 flex-1" />
          <span className="text-xs font-bold text-text-base/40 uppercase tracking-widest">
            OR
          </span>
          <div className="h-0.5 bg-border-base/20 flex-1" />
        </div>

        {/* Google Login */}
        <div
          className="flex justify-center cursor-pointer retro-border py-3 px-4"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-text-base/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent-base hover:underline underline-offset-4"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
