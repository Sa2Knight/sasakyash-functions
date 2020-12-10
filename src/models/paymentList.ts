import { Dayjs } from 'dayjs'
import { dateRange } from '../utils/date'
import { Money, PaymentType, SimpleMoney } from '../types'
import { categoryIdToLabel, genreIdToLabel } from '../zaim'

export class PaymentList {
  constructor(public payments: Money[]) {}

  /**
   * APIレスポンスのデータ構造から、クライアント用データ構造に変換する
   */
  convertToSimpleMoneyObjects(): SimpleMoney[] {
    return this.payments.map(money => ({
      date: money.date,
      category: categoryIdToLabel(money.category_id)!,
      genre: genreIdToLabel(money.genre_id)!,
      amount: money.amount,
      place: money.place
    }))
  }

  /**
   * 公費または私費で絞り込む
   */
  filterBy(type: PaymentType) {
    const paymentTypeComment = type === 'private' ? '私費' : '公費'
    const filteredPaymentList = new PaymentList(
      this.payments.filter(payment => {
        return payment.comment.indexOf(paymentTypeComment) >= 0
      })
    )

    return type === 'public' ? filteredPaymentList : filteredPaymentList.excludeCarryOverPayment()
  }

  /**
   * 合計金額を取得する
   */
  totalAmount() {
    return this.payments.reduce((total, payment) => total + payment.amount, 0)
  }

  /**
   * 金額を日別に集計する
   * { '2020-10-01': 1000, '2020-10-02': 2000, ... '2020-10-31': 3000}
   */
  amountsByDate(startDate: Dayjs, endDate: Dayjs) {
    const amountTable: { [formattedDate: string]: number } = {}
    dateRange(startDate, endDate).forEach(date => (amountTable[date.format('YYYY-MM-DD')] = 0))

    this.payments.forEach(payment => {
      if (amountTable[payment.date] !== undefined) {
        amountTable[payment.date] += payment.amount
      }
    })
    return amountTable
  }

  /**
   * キャリーオーバー用途の支出を取り除く
   */
  private excludeCarryOverPayment() {
    return new PaymentList(
      this.payments.filter(payment => {
        return payment.comment.indexOf('キャリーオーバー') === -1
      })
    )
  }
}
