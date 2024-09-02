import { SubmitButton } from '@/app/components/dashboard/submit-buttons'
import PricingTabel from '@/app/components/shared/pricing'
import prisma from '@/app/utils/db'
import { requireUser } from '@/app/utils/require-user'
import { stripe } from '@/app/utils/stripe'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { redirect } from 'next/navigation'

async function getData(userId: string) {
	const data = await prisma.subscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			status: true,
			User: {
				select: {
					customerId: true,
				},
			},
		},
	})

	return data
}

export default async function PricingPage() {
	const user = await requireUser()
	const data = await getData(user.id)

	async function createCustomerPortal() {
		'use server'

		const session = await stripe.billingPortal.sessions.create({
			customer: data?.User?.customerId as string,
			return_url: 'http://localhost:3000/dashboard',
		})

		return redirect(session.url)
	}

	if (data?.status === 'active') {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Edit subscription</CardTitle>
					<CardDescription>
						Click on the button bleow, this will give you the opportunity to
						change your payment details and view your invoiceses at the same
						time.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={createCustomerPortal}>
						<SubmitButton text='View subscription details' />
					</form>
				</CardContent>
			</Card>
		)
	}

	return (
		<div>
			<PricingTabel />
		</div>
	)
}
