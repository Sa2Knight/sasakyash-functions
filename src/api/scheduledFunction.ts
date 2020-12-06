import * as functions from 'firebase-functions'
import { Collection } from '../store'

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun(context => {
  console.log('this will be run every 1 minutes!!')
})
