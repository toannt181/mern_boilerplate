import axios from 'axios'
import { ACCESS_TOKEN } from '../configs/constants'

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`

export default async function requestHelper({ method, options }) {
  const token = localStorage.getItem(ACCESS_TOKEN)

  return axios({
    ...options,
    method,
    headers: {
      ...(options.formData && { 'Content-Type': 'multipart/form-data' }),
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => Promise.resolve(options.originData ? response : response.data))
}
