import * as functions from 'firebase-functions'

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun(context => {
  console.log('this will be run every 1 minutes!!')
})
