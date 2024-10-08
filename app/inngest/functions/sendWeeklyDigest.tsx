import * as E from '@react-email/components'
import { prisma } from '#app/utils/db.server.ts'
import { sendEmail } from '#app/utils/email.server.ts'
import { inngest } from '../client'

export const sendWeeklyDigest = inngest.createFunction(
	{ id: 'send-weekly-digest' },
	{
		cron: 'TZ=America/New_York 0 8 * * 1',
	},
	async ({ step }) => {
		const users = await step.run('get-all-users', async () => {
			return prisma.user.findMany()
		})

		for (const user of users) {
			const digestData = await step.run('fetch-digest-data', async () => {
				return {
					notesCount: await prisma.note.count({
						where: {
							ownerId: user.id,
						},
					}),
				}
			})
			await step.run(`send-digest`, async () => {
				await sendEmail({
					to: user.email,
					subject: 'Epic Notes Weekly Digest',
					react: <WeeklyDigestEmail digestData={digestData} />,
				})
			})
		}

		return {
			result: `Sent ${users.length} weekly reports`,
		}
	},
)

function WeeklyDigestEmail({
	digestData,
}: {
	digestData: {
		notesCount: number
	}
}) {
	return (
		<E.Html lang="en" dir="ltr">
			<E.Container>
				<h1>
					<E.Text>Your Epic notes weekly digest</E.Text>
				</h1>
				<p>
					<E.Text>
						You created {digestData.notesCount} notes this week. Great job, keep
						it up!
					</E.Text>
				</p>
			</E.Container>
		</E.Html>
	)
}
