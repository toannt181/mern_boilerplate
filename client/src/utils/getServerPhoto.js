export default function getServerPhoto(photo) {
  return photo ? `${process.env.REACT_APP_API_URL}/${photo}` : ''
}