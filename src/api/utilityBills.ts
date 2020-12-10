import * as functions from 'firebase-functions'
import { categoryLabelToId, fetchPaymentList } from '../zaim'
import * as dayjs from 'dayjs'
const cors = require('cors')({ origin: true })

/**
 * Store 内のキャッシュを破棄する
 */
export default functions.https.onRequest(async (request, response) => {
  const categoryId = categoryLabelToId('水道・光熱費')!
  const paymentList = await fetchPaymentList(dayjs('1980-01-01'), dayjs(), categoryId)
  cors(request, response, () => {
    response.json({
      data: paymentList.convertToSimpleMoneyObjects()
    })
  })
})
