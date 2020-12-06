export type MoneyType = 'income' | 'payment'
export type PaymentType = 'public' | 'private'
export type CollectionName = 'zaim-get-money-cache'
export interface Money {
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
