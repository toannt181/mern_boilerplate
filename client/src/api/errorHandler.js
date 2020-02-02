export default function errorHandler(e) {
  switch (e.response.status) {
    case 401:
      localStorage.clear()
      window.location.href = '/login'
      break
    default:
  }
}
