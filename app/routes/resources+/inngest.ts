import { EventSchemas, Inngest } from 'inngest'
import { serve } from 'inngest/remix'

// Define the event type
type HelloWorldEvent = {
	name: 'test/hello.world'
	data: {
		name: string
	}
}

// Create the schema
export const schemas = new EventSchemas().fromUnion<HelloWorldEvent>()

// Initialize the Inngest client with the schema
const inngest = new Inngest({ id: 'my-app', schemas })

// Define your functions here
const helloWorld = inngest.createFunction(
	{ id: 'hello-world', name: 'Hello World' },
	{ event: 'test/hello.world' },
	async ({ event, step }) => {
		await step.run('Say hello', () => {
			console.log(`Hello, ${event.data.name}!`)
		})
		return { message: `Hello, ${event.data.name}!` }
	},
)

// Create the serve handler
const inngestHandler = serve({ client: inngest, functions: [helloWorld] })

export { inngestHandler as action, inngestHandler as loader }
