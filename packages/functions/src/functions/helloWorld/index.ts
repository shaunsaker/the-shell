import { onRequest } from 'firebase-functions/v2/https'

console.log('Hello from Hello World!')

export const helloWorldFunction = onRequest(async (_, response) => {
  response.status(200).send('ok')
})
