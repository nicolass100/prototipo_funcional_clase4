import React, { useState } from 'react'
import Login from './components/Login.jsx'
import Products from './components/Products.jsx'   // <= IMPORTA AQUÍ

function Dashboard({ user, onLogout }) {
  return (
    <div style={{ maxWidth: 720, margin: '3rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, <strong>{user?.name}</strong> ({user?.email})</p>
      <p>Este es un dashboard vacío (placeholder del MVP).</p>

      {/* <= MUESTRA LA LISTA/FORM DE PRODUCTOS AQUÍ */}
      <Products />

      <button onClick={onLogout} style={{ marginTop: '1rem' }}>Cerrar sesión</button>
    </div>
  )
}

export default function App() {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('auth')
    return raw ? JSON.parse(raw) : null
  })

  if (!auth) {
    return <Login onSuccess={data => { setAuth(data); localStorage.setItem('auth', JSON.stringify(data)) }} />
  }

  return <Dashboard user={auth.user} onLogout={() => { setAuth(null); localStorage.removeItem('auth') }} />
}
