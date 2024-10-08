import { inngest, functions } from '#app/inngest'
import { serve } from 'inngest/remix'

// Create the serve handler
const inngestHandler = serve({ client: inngest, functions })

export { inngestHandler as action, inngestHandler as loader }
