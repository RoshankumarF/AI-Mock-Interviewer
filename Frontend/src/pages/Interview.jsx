import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { api } from "../api"

import Button from "../components/Button"

export default function Interview() {
    const { sessionId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const question = location.state?.question

    const [answer, setAnswer] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const questionNumber = location.state?.questionNumber || 1
    const totalQuestions = 5

    const handleSubmit = async (e) => {
        e.preventDefault()
 

        if (!answer.trim()) {
            setError("Please write an answer before submitting.")
            return
        }

        try {
            setIsSubmitting(true)
            setError("")

            

            const response = await api.post(
                `/v1/interview/submit-answer/${sessionId}`,
                {
                    answer: answer.trim(),
                },
                
            )

            const {
                feedback,
                nextQuestion,
                questionsAsked,
                isLastQuestion,
            } = response.data
 

            navigate(`/interview/${sessionId}/feedback`, {
                state: {
                    feedback,
                    nextQuestion,
                    questionsAsked,
                    isLastQuestion,

                    
                    currentQuestion: question,
                    userAnswer: answer,
                },
            })

        } catch (error) {
            console.error("Submit answer error:", error)

            setError(
                error.response?.data?.message ||
                "Unable to submit your answer. Please try again."
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">

            
            <header className="h-16 border-b border-gray-800">
                <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">

                    
                    <div>
                        <h2 className="text-sm font-semibold">
                            AI Interviewer
                        </h2>

                        <p className="mt-0.5 text-xs text-gray-500">
                            JavaScript • Frontend Developer • Medium
                        </p>
                    </div>


            

                    <div className="flex items-center gap-4">

                        <div className="text-right">
                            <p className="text-xs text-gray-500">
                                Question
                            </p>

                            <p className="text-sm font-medium text-gray-200">
                                {questionNumber} / {totalQuestions}
                            </p>
                        </div>

                        <div className="w-24">

                            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">

                                <div
                                    className="h-full rounded-full bg-indigo-500 transition-all duration-300"
                                    style={{
                                        width: `${(
                                            (questionNumber / totalQuestions) *
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>
            </header>


     

            <main className="mx-auto max-w-4xl px-6 py-12">

               

                <section>

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                        Question {String(questionNumber).padStart(2, "0")}
                    </p>

                    <h1 className="mt-4 max-w-3xl text-2xl font-medium leading-relaxed text-gray-100 sm:text-3xl">
                        {question || "No question found."}
                    </h1>

                </section>

 

                <form onSubmit={handleSubmit}>

                    <section className="mt-12">

                        <div className="flex items-center justify-between">

                            <label
                                htmlFor="answer"
                                className="text-sm font-medium text-gray-200"
                            >
                                Your Answer
                            </label>

                            <span className="text-xs text-gray-500">
                                {answer.length} / 2000
                            </span>

                        </div>


                    

                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => {
                                setAnswer(e.target.value)
                                setError("")
                            }}
                            maxLength={2000}
                            disabled={isSubmitting}
                            placeholder="Type your answer here..."
                            className="
                                mt-3
                                min-h-64
                                w-full
                                resize-y
                                rounded-xl
                                border
                                border-gray-800
                                bg-gray-900
                                px-5
                                py-4
                                text-sm
                                leading-7
                                text-gray-100
                                placeholder:text-gray-600
                                outline-none
                                transition
                                duration-200
                                focus:border-indigo-500
                                focus:ring-1
                                focus:ring-indigo-500
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        />


                        {/* Error */}

                        {error && (
                            <p className="mt-2 text-sm text-red-400">
                                {error}
                            </p>
                        )}


                       

                        <div className="mt-4 flex items-center justify-between">

                            <p className="text-xs text-gray-600">
                                Explain your reasoning clearly.
                            </p>

                            <Button
                                type="submit"
                                size="md"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Evaluating..."
                                    : "Submit Answer →"}
                            </Button>

                        </div>

                    </section>

                </form>

            </main>

        </div>
    )
}