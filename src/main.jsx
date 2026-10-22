import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { FavoriteProvider } from './context/FavoriteContext.jsx' // Import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoriteProvider> 
      <App />
    </FavoriteProvider>
  </StrictMode>,
)