import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Slecetedcategory from './Context/Slecetedcategory.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Slecetedcategory>
    <App />
    </Slecetedcategory>
  </StrictMode>,
)
