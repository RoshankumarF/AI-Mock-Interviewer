import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Interview from './pages/Interview'
import InterviewResult from './pages/Result'
import InterviewSetup from './pages/InterviewSetup'



function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
    path="/interview/:sessionId"
    element={<Interview />}
/>

<Route
    path="/interview/:sessionId/feedback"
    element={<InterviewFeedback />}
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
