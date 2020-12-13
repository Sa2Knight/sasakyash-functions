import * as functions from 'firebase-functions'
import { fetchPaymentList } from '../zaim'
import * as dayjs from 'dayjs'
const cors = require('cors')({ origin: true })

type UtilityBills = {
  [date: string]: {
    electric?: number
    gas?: number
    water?: number
  }
}

type ResponseType = {
  data: UtilityBills
}

export default functions.https.onRequest(async (request, response) => {
  const utilityBills: UtilityBills = {}
  const paymentList = await fetchPaymentList(dayjs('1980-01-01'), dayjs(), 105)
  paymentList.formattedDays().forEach(day => (utilityBills[day] = {}))
  paymentList.payments.forEach(payment => {
    if (payment.isWater) {
      utilityBills[payment.formattedDate].water = payment.amount
    } else if (payment.isGas) {
      utilityBills[payment.formattedDate].gas = payment.amount
    } else if (payment.isElectric) {
      utilityBills[payment.formattedDate].electric = payment.amount
    }
  })
  const responseObject: ResponseType = { data: utilityBills }
  cors(request, response, () => {
    response.json(responseObject)
  })
})
