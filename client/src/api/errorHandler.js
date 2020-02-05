export default function errorHandler(e) {
  if (!e.response) return
  switch (e.response.status) {
    case 403:
      localStorage.clear()
      window.location.href = '/login'
      break
    default:
  }
}
