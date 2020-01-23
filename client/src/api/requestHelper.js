import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/api'

export default async function requestHelper({ method, options }) {
  return axios({
    ...options,
    method,
    headers: {
    },
  })
    .then(response => Promise.resolve(options.originData ? response : response.data))
}
