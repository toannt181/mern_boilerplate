const axios = require('axios')
const https = require('https')

const GOOGLE_URL = 'https://drive.google.com/uc?export=download&id='

function detachLinkFromRedirect(data) {
  return /<A HREF="(.+)">/gi.exec(data)[1]
}

async function getCookieMovie(id) {
  try {
    const result = await axios.get(GOOGLE_URL + id, {
      maxRedirects: 0,
    })
    return result.headers['set-cookie'][0]
  } catch (e) {
    const { status, data } = e.response
    if (status === 302) {
      return { success: true, data }
    }
    throw new Error(e)
  }
}


async function getMovieData(id, code, cookie) {
  try {
    await axios.get(GOOGLE_URL + id, {
      params: {
        confirm: code,
      },
      headers: {
        Cookie: cookie,
      },
      maxRedirects: 0,
    })
    throw new Error('Movie data do not redirect to get link')
  } catch (e) {
    const { status, data } = e.response
    if (status === 302) {
      return data
    }
    throw new Error(e)
  }
}

async function isLinkAlive(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode } = res
      const contentType = res.headers['content-type']

      if (statusCode !== 200) {
        resolve({ isAlive: false, message: `Link return error status ${statusCode}` })
        return
      }

      if (!/^video\/mp4/.test(contentType)) {
        resolve({ isAlive: false, message: `Invalid content-type. Expected video/mp4 but received ${contentType}` })
        return
      }

      resolve({ isAlive: true, message: 'OK' })
    })
      .on('error', (err) => {
        reject(err)
      });
  })
}

async function getMovieUrl(id) {
  let rawData
  const cookie = await getCookieMovie(id)

  if (typeof cookie === 'object') {
    rawData = cookie.data
  } else {
    const downloadCode = new RegExp(`${id}=([0-9a-zA-Z]+)`).exec(cookie)[1]
    rawData = await getMovieData(id, downloadCode, cookie)
  }

  const url = detachLinkFromRedirect(rawData)
  return url
}

function isExpiredMovie(url) {
  const [, time] = /https:\/\/.+\/docs\/securesc\/.+\/.+\/(\d+)\/.+\/\*/gi.exec(url)
  return Date.now() - time > 8 * 60 * 60 * 1000
}

async function getLinkDriverDirect(id) {
  const BASE_URL = 'https://drive.google.com/uc?export=download&id='
  try {
    await axios.get(BASE_URL + id, {
      maxRedirects: 0,
    })
    throw new Error('Movie data do not redirect to get link')
  } catch (e) {
    const { status, data } = e.response
    if (status === 302) {
      const url = detachLinkFromRedirect(data)
      return url
    }
    throw new Error(e)
  }
}

module.exports = {
  getMovieUrl,
  isLinkAlive,
  isExpiredMovie,
  getLinkDriverDirect,
}
