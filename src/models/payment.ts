import dayjs = require('dayjs')

export type Money = {
  id: number
  user_id: number
  date: string
  mode: string
  category_id: number
  genre_id: number
  from_account_id: number
  to_account_id: number
  amount: number
  comment: string
  active: number
  created: string
  currency_code: string
  name: string
  receipt_id: number
  place_uid: string
  place: string
}

export default class Payment {
  constructor(private raw: Money) {}

  get id() {
    return this.raw.id
  }

  get date() {
    return dayjs(this.raw.date)
  }

  get formattedDate() {
    return this.date.format('YYYY-MM-DD')
  }

  get amount() {
    return this.raw.amount
  }

  get isWater() {
    return this.raw.genre_id === 10501
  }

  get isGas() {
    return this.raw.genre_id === 10502
  }

  get isElectric() {
    return this.raw.genre_id === 10503
  }

  get isPrivate() {
    return this.raw.comment.indexOf('私費') >= 0
  }

  get isPublic() {
    return this.raw.comment.indexOf('公費') >= 0
  }

  get isCarryOver() {
    return this.raw.comment.indexOf('キャリーオーバー') >= 0
  }
}
