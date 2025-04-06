import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:5000'

export const fetchBalance = () =>
  axios.post(`${BASE_URL}/get_balance`, {
    args: { id: '11817452' },
  })

export const makeTransaction = (to, amount) =>
  axios.post(`${BASE_URL}/make_transaction`, {
    args: { to_account: to, amount: parseFloat(amount) },
  })

export const requestLoan = (type, amount) =>
  axios.post(`${BASE_URL}/get_loan`, {
    args: { loan_type: type, amount: parseFloat(amount) },
  })

export const getBalance = async (accountId) => {
    const res = await axios.post(`${BASE_URL}/get_balance`, {
      args: {
        id: accountId
      }
    })
    return res.data
  }