import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app.jsx'
import './style/main.scss'
import './utils/fontawesome.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
