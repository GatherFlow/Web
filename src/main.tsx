import '@/lib/i18n'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { InnerApp } from './App.tsx'
import reportWebVitals from './reportWebVitals.ts'
import { router } from './router.tsx'
import './styles.css'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <StrictMode>
      <InnerApp />
    </StrictMode>,
  )
}

reportWebVitals()
