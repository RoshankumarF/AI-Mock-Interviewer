import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
       username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
 

        if (
            !formData.username.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }


        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }


        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        try {
            setIsLoading(true);
            setError("");

           

            const response = await api.post(
                "/v1/user/register",
                {
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                },
                
            );

            console.log("Registration successful:", response.data);

 

            navigate("/login");

        } catch (error) {
            console.error("Registration error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">

            <main className="flex min-h-screen items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">
 

                    <div className="mb-8 text-center">

                        <Link
                            to="/"
                            className="text-xl font-semibold tracking-tight"
                        >
                            Mock<span className="text-indigo-400">AI</span>
                        </Link>

                    </div>

 

                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">

                        {/* Heading */}

                        <div>

                            <h1 className="text-2xl font-semibold">
                                Create your account
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Start practicing smarter.
                            </p>

                        </div>

 

                        {error && (
                            <div className="mt-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">

                                <p className="text-sm text-red-400">
                                    {error}
                                </p>

                            </div>
                        )}


                      
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* username */}

                            <Input
                                label="username"
                                name="username"
                                type="text"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="name"
                                disabled={isLoading}
                            />


                            {/* Email */}

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                disabled={isLoading}
                            />


                            {/* Password */}

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="At least 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                disabled={isLoading}
                            />


                            {/* Confirm password */}

                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                disabled={isLoading}
                            />


                            {/* Submit */}

                            <div className="pt-2">

                                <Button
                                    type="submit"
                                    className="w-full"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Creating account..."
                                        : "Create Account"}
                                </Button>

                            </div>

                        </form>


                      

                        <div className="mt-8 border-t border-gray-800 pt-6 text-center">

                            <p className="text-sm text-gray-500">
                                Already have an account?
                            </p>

                            <Link
                                to="/login"
                                className="mt-2 inline-block text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                            >
                                Sign in →
                            </Link>

                        </div>

                    </div>


                    {/* Back home */}

                    <div className="mt-6 text-center">

                        <Link
                            to="/"
                            className="text-xs text-gray-600 transition hover:text-gray-400"
                        >
                            ← Back to home
                        </Link>

                    </div>

                </div>

            </main>

        </div>
    );
}