import * as functions from 'firebase-functions'
import { fetchPaymentList } from '../zaim'
import * as dayjs from 'dayjs'
import { APIResponseType } from '../types'
const cors = require('cors')({ origin: true })

export default functions.https.onRequest(async (request, response) => {
  const responseObject: APIResponseType<'fetchUtilityBills'> = { data: {} }
  const paymentList = await fetchPaymentList(dayjs('1980-01-01'), dayjs(), 105)
  paymentList.formattedDays().forEach(day => (responseObject.data[day] = {}))
  paymentList.payments.forEach(payment => {
    if (payment.isWater) {
      responseObject.data[payment.formattedDate].water = payment.amount
    } else if (payment.isGas) {
      responseObject.data[payment.formattedDate].gas = payment.amount
    } else if (payment.isElectric) {
      responseObject.data[payment.formattedDate].electric = payment.amount
    }
  })
  cors(request, response, () => {
    response.json(responseObject)
  })
})
