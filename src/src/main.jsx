import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'  // ✅ Import sem extensão (.jsx) — Vite resolve automaticamente

import './styles.css'  // opcional — se você tiver um arquivo de estilos

// Cria o ponto de montagem principal do React
const container = document.getElementById('root')
const root = createRoot(container)

// Renderiza o componente principal (App)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
