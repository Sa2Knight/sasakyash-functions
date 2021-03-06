import monthTotalPaymentAmountAPI from './api/monthTotalPaymentAmount'
import DailyPaymentAmountsAPI from './api/dailyPaymentAmount'
import UtilityBillsAPI from './api/utilityBills'
import ClearCache from './api/clearCache'
import * as functions from 'firebase-functions'
import { Collection } from './store'

export const monthTotalPaymentAmount = monthTotalPaymentAmountAPI
export const dailyPaymentAmounts = DailyPaymentAmountsAPI
export const utilityBills = UtilityBillsAPI
export const clearCache = ClearCache

// 24時間に1回、キャッシュを破棄する
exports.scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun(context => {
  return new Collection('zaim-get-money-cache').clear()
})
