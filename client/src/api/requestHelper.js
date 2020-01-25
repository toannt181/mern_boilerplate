import axios from 'axios'
import { ACCESS_TOKEN } from '../configs/constants'
axios.defaults.baseURL = 'http://localhost:4000/api'

export default async function requestHelper({ method, options }) {
  let token
  try {
    token = JSON.parse(localStorage.getItem(ACCESS_TOKEN))._id
  } catch (e) {
  }

  return axios({
    ...options,
    method,
    headers: {
      Authorization: token,
    },
  })
    .then(response => Promise.resolve(options.originData ? response : response.data))
}
