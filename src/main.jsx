// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


// 🎨 Importar estilos
import './styles/index.css'           // Principal (Tailwind)
import './styles/background.css'
// import './styles/animations.css'      // Animaciones (opcional)
// import './styles/custom.css'       // Custom (solo si necesitas)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)