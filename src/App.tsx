/**
 * Main App Component
 * Root component with routing and theme provider
 */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import { ProgressProvider } from './contexts/ProgressContext'
import HomePage from './pages/HomePage'
import UnitPracticePage from './pages/UnitPracticePage'
import CompletionPage from './pages/CompletionPage'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProgressProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/unit/:unitId" element={<UnitPracticePage />} />
            <Route path="/unit/:unitId/complete" element={<CompletionPage />} />
          </Routes>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  )
}

export default App
