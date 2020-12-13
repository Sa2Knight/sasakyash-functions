import { config } from 'firebase-functions'
import Zaim from 'zaim'
import * as dayjs from 'dayjs'
import { Document } from './store'
import { PaymentList } from './models/paymentList'
import Payment, { Money } from './models/payment'

type Dayjs = dayjs.Dayjs
const Config = config().zaim

const zaim = new Zaim({
  consumerKey: Config.key as string,
  consumerSecret: Config.secret as string,
  accessToken: Config.token as string,
  accessTokenSecret: Config.token_secret as string
})

/**
 * 支払い一覧をAPIから取得する
 */
export const fetchPaymentList = async (startDate: Dayjs, endDate: Dayjs, categoryId?: number) => {
  // Zaim API 用のパラメータを組み立てる
  const params = {
    category_id: categoryId,
    start_date: startDate.format('YYYY-MM-DD'),
    end_date: endDate.format('YYYY-MM-DD'),
    mode: 'payment' as 'payment'
  }
  if (!categoryId) delete params.category_id

  // キャッシュ用のストアの準備
  const store = new Document('zaim-get-money-cache', JSON.stringify(params))

  // キャッシュがある場合はそれをモデル化してそのまま返却する
  const cachedData = (await store.read()) as Money[]
  if (cachedData) {
    return new PaymentList(cachedData.map(money => new Payment(money)))
  }

  // Zaim API を呼び出し、レスポンスをパースする
  const responseData = await zaim.getMoney(params)
  const rawPaymentList = JSON.parse(responseData)['money'] as Money[]

  // キャッシュを新規作成する
  await store.write(rawPaymentList)

  // モデル化して返却する
  return new PaymentList(rawPaymentList.map(money => new Payment(money)))
}
