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

export default functions.https.onRequest(async (request, response) => {
  const utilityBills: UtilityBills = {}
  const paymentList = await fetchPaymentList(dayjs('1980-01-01'), dayjs(), 105)
  paymentList.days().forEach(day => (utilityBills[day] = {}))
  paymentList.payments.forEach(payment => {
    switch (payment.genre_id) {
      case 10501:
        utilityBills[payment.date].water = payment.amount
        break
      case 10502:
        utilityBills[payment.date].electric = payment.amount
        break
      case 10503:
        utilityBills[payment.date].gas = payment.amount
        break
    }
  })
  cors(request, response, () => {
    response.json({
      data: utilityBills
    })
  })
})
