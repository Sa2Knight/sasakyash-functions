import { operations } from './schema'

// prettier-ignore
export type APIResponseType< T extends keyof operations > = operations[T]['responses'][200]['content']['application/json']

export type MoneyType = 'income' | 'payment'
export type PaymentType = 'public' | 'private'
export type CollectionName = 'zaim-get-money-cache'
