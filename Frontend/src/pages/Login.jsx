import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username:"",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Remove old error when user starts typing again
        if (error) {
            setError("")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

       

        if (!formData.email.trim() || !formData.password ) {
            setError("Please enter your email and password.")
            return
        }

        try {
            setIsLoading(true)
            setError("")

            const response = await axios.post(
                ` /v1/user/login`,
                {
                    email: formData.email.trim(),
                    password: formData.password,
                    username:formData.username
                },
                 
            )

            console.log("Login successful:", response.data)

           

            navigate("/dashboard")

        } catch (error) {
            console.error("Login error:", error)

            setError(
                error.response?.data?.message ||
                "Unable to login. Please check your credentials."
            )
        } finally {
            setIsLoading(false)
        }
    }

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

                      

                        <div>
                            <h1 className="text-2xl font-semibold">
                                Welcome back
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Continue your interview preparation.
                            </p>
                        </div>


                     

                        {error && (
                            <div className="mt-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">

                                <p className="text-sm text-red-400">
                                    {error}
                                </p>

                            </div>
                        )}


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

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

                            {/* Username */}

                            <Input
                                label="username"
                                name="username"
                                type="username"
                                placeholder="you123"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                disabled={isLoading}
                            />


                            {/* Password */}

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                disabled={isLoading}
                            />


                            {/* Forgot password */}

                            <div className="flex justify-end">

                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-gray-500 transition hover:text-indigo-400"
                                >
                                    Forgot password?
                                </Link>

                            </div>


                            {/* Submit */}

                            <Button
                                type="submit"
                                className="w-full"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Signing in..."
                                    : "Sign In"}
                            </Button>

                        </form>


                        {/* Register */}

                        <div className="mt-8 border-t border-gray-800 pt-6 text-center">

                            <p className="text-sm text-gray-500">
                                Don't have an account?
                            </p>

                            <Link
                                to="/register"
                                className="mt-2 inline-block text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                            >
                                Create an account →
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
    )
}