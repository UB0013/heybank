import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        // login(data)
        localStorage.setItem("user", JSON.stringify(data))
        console.log(data)

        navigate('/transactions')
        window.location.reload()
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      alert('Server error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 glass">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-green-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-black py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
