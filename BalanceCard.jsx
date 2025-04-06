import { useState } from 'react'
import { getBalance } from '../components/api'

export default function BalanceCard() {
  const [accountId, setAccountId] = useState('')
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState('')

  const handleCheckBalance = async () => {
    try {
      const data = await getBalance(accountId)
      setBalance(data.balance)
      setError('')
    } catch (err) {
      setBalance(null)
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded space-y-3 max-w-md">
      <h2 className="text-xl font-semibold">Check Balance</h2>
      <input
        type="text"
        placeholder="Enter Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        className="w-full p-2 rounded text-black"
      />
      <button
        onClick={handleCheckBalance}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Balance
      </button>

      {balance !== null && (
        <div className="text-lg text-green-400">Balance: ${balance}</div>
      )}
      {error && <div className="text-red-400">{error}</div>}
    </div>
  )
}
