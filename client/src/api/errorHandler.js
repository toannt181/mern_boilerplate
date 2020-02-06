import { ACCESS_TOKEN } from '../configs/constants'

export default function errorHandler(e) {
  if (!e.response) return
  switch (e.response.status) {
    case 401:
      if (!localStorage.getItem(ACCESS_TOKEN)) return
      localStorage.clear()
      window.location.href = '/login'
      break
    default:
  }
}
