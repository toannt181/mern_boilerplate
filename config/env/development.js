const port = process.env.PORT || 4000;

module.exports = {
  port,
  mysql: {
    dialect: 'mysql',
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: `http://localhost:${port}/auth/twitter/callback/`,
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://localhost:${port}/auth/github/callback`,
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: `http://localhost:${port}/auth/linkedin/callback`,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`,
  },
};
