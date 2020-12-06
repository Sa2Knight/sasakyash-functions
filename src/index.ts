import monthTotalPaymentAmountAPI from './api/monthTotapPaymentAmount'
import DailyPaymentAmountsAPI from './api/dailyPaymentAmount'
import ClearCache from './api/clearCache'
import * as functions from 'firebase-functions'

export const monthTotalPaymentAmount = monthTotalPaymentAmountAPI
export const dailyPaymentAmounts = DailyPaymentAmountsAPI
export const clearCache = ClearCache

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun(context => {
  console.log('this will be run every 1 minutes!!')
})
