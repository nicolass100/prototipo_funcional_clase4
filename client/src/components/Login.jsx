import React, { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password })
      if (res.data?.ok) onSuccess(res.data)
      else setError(res.data?.message || 'Error de autenticación')
    } catch (err) {
      setError(err?.response?.data?.message || 'Error de red/servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          <div>Email</div>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
                 style={{ width: '100%', padding: '.5rem', borderRadius: 8, border: '1px solid #ccc' }}/>
        </label>
        <label>
          <div>Contraseña</div>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required
                 style={{ width: '100%', padding: '.5rem', borderRadius: 8, border: '1px solid #ccc' }}/>
        </label>
        <button disabled={loading} type="submit" style={{ padding: '.6rem', borderRadius: 8 }}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </form>
      <p style={{ marginTop: '1rem', color: '#555' }}>
        Prueba con <code>admin@demo.com</code> / <code>123456</code>
      </p>
    </div>
  )
}
