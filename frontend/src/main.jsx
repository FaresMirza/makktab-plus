import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { AuthProvider } from './context/AuthContext'
// هذا السطر يستدعي الستايل والألوان
import "primereact/resources/themes/lara-light-cyan/theme.css"
// (اختياري) لو احتجتِ أيقونات لاحقاً
import 'primeicons/primeicons.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
)
