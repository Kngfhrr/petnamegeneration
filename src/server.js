require('dotenv').config()

import sirv from 'sirv';
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
const { PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'


polka()
  .use(
    compression({threshold: 0}),
    sirv('static', {dev}),
    (req, res, next) => {
      return sapper.middleware({})(req, res, next)
    }
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
