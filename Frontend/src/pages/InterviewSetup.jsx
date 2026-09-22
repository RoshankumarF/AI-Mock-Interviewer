import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import Select from "../components/Select";

const roles = [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Full Stack Developer" },
    { value: "software", label: "Software Engineer" },
];

const topics = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "node.js", label: "Node.js" },
    { value: "dsa", label: "Data Structures & Algorithms" },
];

const difficulties = [
    { value: "easy", label: "Easy", description: "Beginner" },
    { value: "medium", label: "Medium", description: "Intermediate" },
    { value: "hard", label: "Hard", description: "Advanced" },
];

export default function InterviewSetup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        topic: "",
        difficulty: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

         
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setApiError("");
    };

    const handleDifficulty = (difficulty) => {
        setFormData((prev) => ({
            ...prev,
            difficulty,
        }));

        setErrors((prev) => ({
            ...prev,
            difficulty: "",
        }));

        setApiError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.role) {
            newErrors.role = "Please select an interview role." 
        }

        if (!formData.topic) {
            newErrors.topic = "Please select a topic." 
        }

        if (!formData.difficulty) {
            newErrors.difficulty = "Please select a difficulty." 
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setApiError("");

            const response = await axios.post(
                `
                /api/v1/session/start-interview`,
                {
                    topic: formData.topic,
                    difficulty: formData.difficulty,
                    role: formData.role,
                },
                {
                    withCredentials: true,
                }
            );

            const { sessionId, question } = response.data 

            navigate(`/interview/${sessionId}`, {
                state: {
                    question,
                },
            });
        } catch (error) {
            console.error("Failed to start interview:", error);

            setApiError(
                error.response?.data?.message ||
                    "Unable to start the interview. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">
            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm text-gray-400 transition-colors hover:text-gray-200"
                >
                    ← Dashboard
                </button>

                {/* Header */}
                <div className="mt-6">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Start an Interview
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Configure your interview and put your skills to the test.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl mx-auto mt-8"
                >
                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-8">

                        {/* Role */}
                        <Select
                            label="Interview Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={roles}
                            placeholder="Select a role"
                            error={errors.role}
                        />

                        {/* Topic */}
                        <div className="mt-6">
                            <Select
                                label="Topic"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                options={topics}
                                placeholder="Select a topic"
                                error={errors.topic}
                            />
                        </div>

                        {/* Difficulty */}
                        <div className="mt-6">
                            <label className="block mb-2 text-sm font-medium text-gray-200">
                                Difficulty
                            </label>

                            <div className="grid grid-cols-3 gap-3">
                                {difficulties.map((difficulty) => {
                                    const isSelected =
                                        formData.difficulty === difficulty.value;

                                    return (
                                        <button
                                            key={difficulty.value}
                                            type="button"
                                            onClick={() =>
                                                handleDifficulty(
                                                    difficulty.value
                                                )
                                            }
                                            className={`
                                                relative rounded-lg border p-4 text-left
                                                transition-colors duration-200
                                                ${
                                                    isSelected
                                                        ? "border-indigo-500 bg-indigo-500/10"
                                                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
                                                }
                                            `}
                                        >
                                            {isSelected && (
                                                <span className="absolute right-3 top-3 text-xs text-indigo-400">
                                                    ✓
                                                </span>
                                            )}

                                            <p
                                                className={`text-sm font-medium ${
                                                    isSelected
                                                        ? "text-indigo-400"
                                                        : "text-gray-200"
                                                }`}
                                            >
                                                {difficulty.label}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                {difficulty.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            {errors.difficulty && (
                                <p className="mt-1.5 text-sm text-red-400">
                                    {errors.difficulty}
                                </p>
                            )}
                        </div>

                        {/* API Error */}
                        {apiError && (
                            <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {apiError}
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="mt-8">
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? "Creating interview..."
                                    : "Start Interview →"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}