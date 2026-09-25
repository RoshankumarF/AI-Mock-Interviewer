import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Interview from './pages/Interview'
import InterviewResult from './pages/Result'
import InterviewSetup from './pages/InterviewSetup'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  const [isLoggedIn ,setIsLoggined]=useState(false)
 

  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route
    path="/"
    element={< Home  isLoggedIn={isLoggedIn} />}
/>

 <Route
    path="/login"
    element={< Login setIsLoggined= {setIsLoggined}   />}
/>

 <Route
    path="/register"
    element={< Register/>}
/>


        <Route
    path="/interview/:sessionId"
    element={<InterviewSetup />}
/>

<Route
    path="/interview/:sessionId/feedback"
    element={<Interview />}
/>

<Route
    path="/interview/:sessionId/result"
    element={<InterviewResult />}
/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
