export function requestNotifyPermission() {
  return new Promise((resolve) => {
    if (!window.Notification) {
      resolve(false)
    } else if (Notification.permission === 'granted') {
      resolve(true)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })
}
