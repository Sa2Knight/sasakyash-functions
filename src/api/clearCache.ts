import * as functions from 'firebase-functions'
import { Collection } from '../store'
const cors = require('cors')({ origin: true })

/**
 * Store 内のキャッシュを破棄する
 */
export default functions.https.onRequest(async (request, response) => {
  await new Collection('zaim-get-money-cache').clear()

  cors(request, response, () => {
    response.json({ data: { message: 'OK' } })
  })
})
