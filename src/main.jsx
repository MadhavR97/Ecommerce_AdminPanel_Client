import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../node_modules/tailwindcss/index.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <div className='h-auto w-full flex justify-center items-center overflow-auto bg-[#EEF2F6]'>
    <App />
  </div>
)
