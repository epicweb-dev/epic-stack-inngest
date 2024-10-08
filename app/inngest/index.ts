import { sendWeeklyDigest } from './functions/sendWeeklyDigest'

export { inngest } from './client'
export const functions = [
  sendWeeklyDigest,
]