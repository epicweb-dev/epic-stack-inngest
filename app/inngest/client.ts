import { EventSchemas, Inngest } from 'inngest'

import { type Events } from './events'

export const inngest = new Inngest({
  id: 'my-app',
  schemas: new EventSchemas().fromRecord<Events>()
})