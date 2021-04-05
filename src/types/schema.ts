/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/utilityBills': {
    /** 全期間を対象に、月ごとの電気・ガス・水道代の集計を取得する */
    get: operations['fetchUtilityBills']
  }
  '/clearCache': {
    /** zaim API から取得した生データのキャッシュを破棄する */
    get: operations['fetchClearCache']
  }
  '/monthTotalPaymentAmount': {
    /** 今月(または指定した月) の、公費/私費それぞれの累計支出額を取得する */
    get: operations['fetchMonthTotalPaymentAmount']
    parameters: {}
  }
  '/dailyPaymentAmounts': {
    /** 日毎の公費または私費の支出額を集計する */
    get: operations['fetchDailyPaymentAmount']
    parameters: {}
  }
}

export interface components {
  schemas: {}
}

export interface operations {
  /** 全期間を対象に、月ごとの電気・ガス・水道代の集計を取得する */
  fetchUtilityBills: {
    responses: {
      200: {
        content: {
          'application/json': {
            data: {
              /** 2021-03-01 など、各月の1日の日付文字列がキーとなる */
              [key: string]: {
                gas?: number
                water?: number
                electric?: number
              }
            }
          }
        }
      }
    }
  }
  /** zaim API から取得した生データのキャッシュを破棄する */
  fetchClearCache: {
    responses: {
      200: {
        content: {
          'application/json': {
            data: {
              message: string
            }
          }
        }
      }
    }
  }
  /** 今月(または指定した月) の、公費/私費それぞれの累計支出額を取得する */
  fetchMonthTotalPaymentAmount: {
    parameters: {
      query: {
        /** 省略時、現在時刻に基づく */
        year?: number
        /** 省略時、現在時刻に基づく */
        month?: number
      }
    }
    responses: {
      200: {
        content: {
          'application/json': {
            data: {
              private: number
              public: number
            }
          }
        }
      }
    }
  }
  /** 日毎の公費または私費の支出額を集計する */
  fetchDailyPaymentAmount: {
    parameters: {
      query: {
        /** 省略時、現在時刻に基づく */
        year?: number
        /** 省略時、現在時刻に基づく */
        month?: number
        paymentType?: 'public' | 'private'
      }
    }
    responses: {
      200: {
        content: {
          'application/json': {
            data: {
              days: string[]
              amounts: number[]
            }
          }
        }
      }
    }
  }
}
