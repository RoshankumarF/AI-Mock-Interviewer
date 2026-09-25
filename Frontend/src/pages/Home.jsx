import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  {api} from "../api"

export default function Home() {
        const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get(
                    "/v1/user/current-user",
                     
                )

                setUser(response.data.data || response.data.user)

            } catch (error) {

                

                if (error.response?.status === 401) {
                    setUser(null)
                } else {
                    console.error("Auth check failed:", error)
                    setUser(null)
                }

            } finally {
                setIsCheckingAuth(false)
            }
        }

        checkAuth()
    }, [])


    

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)

            await api.patch(
                "/v1/user/logout",
                
                
               
            )

            setUser(null)

            navigate("/")

        } catch (error) {
            console.error("Logout failed:", error)

        } finally {
            setIsLoggingOut(false)
        }
    }


    

    if (isCheckingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0B0F19]">

                <div className="text-center">

                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-indigo-500" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading...
                    </p>

                </div>

            </div>
        )
    }


    const isLoggedIn = !!user
 
return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100">

            

            <header className="border-b border-gray-800">

                <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

                   
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Mock<span className="text-indigo-400">AI</span>
                    </Link>


                     

                    <div className="flex items-center gap-6">

                        <a
                            href="#features"
                            className="hidden text-sm text-gray-400 transition hover:text-gray-100 sm:block"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="hidden text-sm text-gray-400 transition hover:text-gray-100 sm:block"
                        >
                            How it works
                        </a>

 

                        {isLoggedIn ? (

                            <div className="flex items-center gap-3">

                                <Link
                                    to="/dashboard"
                                    className="
                                        text-sm
                                        text-gray-300
                                        transition
                                        hover:text-white
                                    "
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/profile"
                                    className="
                                        hidden
                                        text-sm
                                        text-gray-400
                                        transition
                                        hover:text-gray-100
                                        sm:block
                                    "
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="
                                        rounded-lg
                                        border
                                        border-gray-700
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-gray-300
                                        transition
                                        hover:border-gray-600
                                        hover:bg-gray-900
                                        hover:text-white
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    {isLoggingOut
                                        ? "Logging out..."
                                        : "Logout"}
                                </button>

                            </div>

                        ) : (

                           

                            <div className="flex items-center gap-3">

                                <Link
                                    to="/login"
                                    className="
                                        text-sm
                                        text-gray-300
                                        transition
                                        hover:text-white
                                    "
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="
                                        rounded-lg
                                        bg-indigo-500
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-indigo-400
                                    "
                                >
                                    Get Started
                                </Link>

                            </div>
                        )}

                    </div>

                </nav>

            </header>


         

            <main>


              
                <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">

                    <div className="max-w-3xl">

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                            AI-Powered Interview Practice
                        </p>


                        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">

                            {isLoggedIn ? (
                                <>
                                    Welcome back,
                                    <br />

                                    <span className="text-gray-500">
                                        ready for another interview?
                                    </span>
                                </>
                            ) : (
                                <>
                                    Practice interviews.
                                    <br />

                                    <span className="text-gray-500">
                                        Build better answers.
                                    </span>
                                </>
                            )}

                        </h1>


                        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">

                            {isLoggedIn
                                ? "Continue improving your interview skills with realistic AI-powered practice sessions."
                                : "Practice realistic technical interviews with an AI interviewer that asks questions, evaluates your answers, and shows you exactly where you can improve."
                            }

                        </p>


                       

                        <div className="mt-8 flex flex-wrap items-center gap-4">

                            {isLoggedIn ? (

                                <>
                                    <Link
                                        to="/interview/setup"
                                        className="
                                            rounded-lg
                                            bg-indigo-500
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-white
                                            transition
                                            hover:bg-indigo-400
                                        "
                                    >
                                        Start New Interview →
                                    </Link>

                                    <Link
                                        to="/dashboard"
                                        className="
                                            rounded-lg
                                            border
                                            border-gray-800
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-gray-300
                                            transition
                                            hover:border-gray-700
                                            hover:bg-gray-900
                                        "
                                    >
                                        View Dashboard
                                    </Link>
                                </>

                            ) : (

                                <>
                                    <Link
                                        to="/register"
                                        className="
                                            rounded-lg
                                            bg-indigo-500
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-white
                                            transition
                                            hover:bg-indigo-400
                                        "
                                    >
                                        Start Practicing →
                                    </Link>

                                    <a
                                        href="#how-it-works"
                                        className="
                                            rounded-lg
                                            border
                                            border-gray-800
                                            px-5
                                            py-3
                                            text-sm
                                            font-medium
                                            text-gray-300
                                            transition
                                            hover:border-gray-700
                                            hover:bg-gray-900
                                        "
                                    >
                                        See How It Works
                                    </a>
                                </>

                            )}

                        </div>

                    </div>


                   

                    <div className="mt-20 grid gap-5 md:grid-cols-3">

                        {/* Question */}

                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                AI Interviewer
                            </p>

                            <p className="mt-4 text-sm leading-6 text-gray-300">
                                Explain the difference between
                                <span className="text-indigo-400">
                                    {" "}let
                                </span>
                                ,
                                <span className="text-indigo-400">
                                    {" "}const
                                </span>
                                {" "}and
                                <span className="text-indigo-400">
                                    {" "}var
                                </span>
                                {" "}in JavaScript.
                            </p>

                            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-800">
                                <div className="h-full w-2/5 rounded-full bg-indigo-500" />
                            </div>

                            <p className="mt-2 text-right text-xs text-gray-500">
                                Question 2 / 5
                            </p>

                        </div>


                        

                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                AI Evaluation
                            </p>

                            <div className="mt-5 flex items-end gap-2">

                                <span className="text-4xl font-semibold">
                                    8.5
                                </span>

                                <span className="mb-1 text-sm text-gray-500">
                                    / 10
                                </span>

                            </div>

                            <p className="mt-4 text-sm leading-6 text-gray-400">
                                Strong understanding with a few areas
                                that could be explained in more depth.
                            </p>

                        </div>


                        

                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                Performance
                            </p>

                            <p className="mt-5 text-lg font-medium">
                                Know what to improve.
                            </p>

                            <div className="mt-5 space-y-3">

                                <div className="flex items-center gap-3">
                                    <span className="text-emerald-400">
                                        ✓
                                    </span>

                                    <span className="text-sm text-gray-400">
                                        Clear explanations
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-amber-400">
                                        !
                                    </span>

                                    <span className="text-sm text-gray-400">
                                        Technical depth
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

 

                <section
                    id="features"
                    className="border-t border-gray-800"
                >

                    <div className="mx-auto max-w-6xl px-6 py-20">

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                            What you get
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold">
                            Practice with purpose.
                        </h2>


                        <div className="mt-10 grid gap-5 md:grid-cols-3">

                            <Feature
                                title="Realistic Questions"
                                description="Questions are generated according to your chosen role, topic, and difficulty."
                            />

                            <Feature
                                title="Instant Evaluation"
                                description="Get a score, strengths, missing points, and an ideal answer after every response."
                            />

                            <Feature
                                title="Performance Insights"
                                description="Understand your overall performance and identify the areas you need to improve."
                            />

                        </div>

                    </div>

                </section>


                

                <section
                    id="how-it-works"
                    className="border-t border-gray-800"
                >

                    <div className="mx-auto max-w-6xl px-6 py-20">

                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
                            How it works
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold">
                            Three steps. One better interview.
                        </h2>


                        <div className="mt-12 grid gap-10 md:grid-cols-3">

                            <Step
                                number="01"
                                title="Choose your interview"
                                description="Select your role, topic, and difficulty level."
                            />

                            <Step
                                number="02"
                                title="Answer the questions"
                                description="The AI interviewer asks questions and evaluates your responses."
                            />

                            <Step
                                number="03"
                                title="Learn and improve"
                                description="Review your feedback, scores, and areas for improvement."
                            />

                        </div>

                    </div>

                </section>


                {/* =========================================
                    FINAL CTA
                ========================================= */}

                <section className="border-t border-gray-800">

                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">

                        <h2 className="text-3xl font-semibold sm:text-4xl">

                            {isLoggedIn
                                ? "Ready for another round?"
                                : "Ready for your next interview?"
                            }

                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
                            Practice before the real thing and find out
                            where you stand.
                        </p>

                        <div className="mt-8">

                            <Link
                                to={
                                    isLoggedIn
                                        ? "/interview/setup"
                                        : "/register"
                                }
                                className="
                                    inline-flex
                                    rounded-lg
                                    bg-indigo-500
                                    px-6
                                    py-3
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-indigo-400
                                "
                            >
                                {isLoggedIn
                                    ? "Start New Interview →"
                                    : "Create Free Account →"}
                            </Link>

                        </div>

                    </div>

                </section>

            </main>

 

            <footer className="border-t border-gray-800">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">

                    <p className="text-sm text-gray-600">
                        © 2026 MockAI
                    </p>

                    <p className="text-xs text-gray-600">
                        Practice. Improve. Repeat.
                    </p>

                </div>

            </footer>

        </div>
    )
}


/*  
   FEATURE COMPONENT */

function Feature({ title, description }) {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <div className="h-2 w-2 rounded-full bg-indigo-500" />

            <h3 className="mt-5 text-base font-medium">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}


/* 
   STEP COMPONENT
  */

function Step({ number, title, description }) {
    return (
        <div>

            <p className="text-sm font-medium text-indigo-400">
                {number}
            </p>

            <h3 className="mt-4 text-lg font-medium">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}