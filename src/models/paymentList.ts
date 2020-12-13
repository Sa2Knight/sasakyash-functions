import { Dayjs } from 'dayjs'
import Payment from './payment'
import { dateRange } from '../utils/date'
import { PaymentType } from '../types'

export class PaymentList {
  constructor(public payments: Payment[]) {}

  /**
   * 内包する日付のリストを戻す
   */
  days() {
    return this.payments.map(payment => payment.formattedDate)
  }

  /**
   * 合計金額を取得する
   */
  totalAmount() {
    return this.payments.reduce((total, payment) => total + payment.amount, 0)
  }

  /**
   * 公費または私費で絞り込む
   */
  filterBy(type: PaymentType): PaymentList {
    if (type === 'private') {
      return new PaymentList(this.payments.filter(payment => payment.isPrivate && !payment.isCarryOver))
    } else {
      return new PaymentList(this.payments.filter(payment => payment.isPublic))
    }
  }

  /**
   * 金額を日別に集計する
   * { '2020-10-01': 1000, '2020-10-02': 2000, ... '2020-10-31': 3000}
   */
  amountsByDate(startDate: Dayjs, endDate: Dayjs) {
    const amountTable: { [formattedDate: string]: number } = {}
    dateRange(startDate, endDate).forEach(date => (amountTable[date.format('YYYY-MM-DD')] = 0))

    this.payments.forEach(payment => {
      if (amountTable[payment.formattedDate] !== undefined) {
        amountTable[payment.formattedDate] += payment.amount
      }
    })
    return amountTable
  }
}
