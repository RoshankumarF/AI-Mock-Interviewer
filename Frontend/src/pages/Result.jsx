import { useLocation, useNavigate } from "react-router-dom";

export default function InterviewResult() {
    const location = useLocation();
    const navigate = useNavigate();

    const { result } = location.state || {};

    const {
        totalScore,
        totalQuestions,
        history = [],
        summary = {},
    } = result || {};

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">

            <main className="mx-auto max-w-4xl px-6 py-12">

                

                <div className="text-center">

                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                        Interview Complete
                    </p>

                    <h1 className="mt-4 text-3xl font-semibold">
                        Your Interview Results
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Here's how you performed across the interview.
                    </p>

                </div>


          

                <div className="mx-auto mt-10 w-fit text-center">

                    <p className="text-6xl font-semibold">
                        {totalScore}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Average score out of 10
                    </p>

                </div>

 

                <div className="mt-12 rounded-xl border border-gray-800 bg-gray-900 p-6">

                    <h2 className="text-lg font-medium">
                        Overall Summary
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-400">
                        {summary.overallSummary}
                    </p>

                </div>


         

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Top Strength
                        </p>

                        <p className="mt-3 text-sm leading-6 text-gray-300">
                            {summary.topStrength}
                        </p>

                    </div>


                    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Area To Improve
                        </p>

                        <p className="mt-3 text-sm leading-6 text-gray-300">
                            {summary.topAreaToImprove}
                        </p>

                    </div>

                </div>


                

                <section className="mt-10">

                    <h2 className="text-lg font-medium">
                        Question Breakdown
                    </h2>

                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-800">

                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="border-b border-gray-800 bg-gray-900 p-5 last:border-b-0"
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-xs text-gray-500">
                                            Question {index + 1}
                                        </p>

                                        <p className="mt-2 text-sm text-gray-300">
                                            {item.question}
                                        </p>

                                    </div>

                                    <span className="shrink-0 text-sm font-medium">
                                        {item.score}/10
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>

                </section>


                

                <div className="mt-8 flex justify-center">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="
                            rounded-lg
                            border
                            border-gray-700
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-300
                            transition
                            hover:border-gray-600
                            hover:bg-gray-900
                            hover:text-gray-100
                        "
                    >
                        Back to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
}