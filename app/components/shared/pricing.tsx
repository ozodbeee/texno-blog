import { CreateSubscription } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { SubmitButton } from '../dashboard/submit-buttons'

interface iAppProps {
	id: number
	cardTitle: string
	cardDescription: string
	priceTitle: string
	benefits: string[]
}

export const PricingPlans: iAppProps[] = [
	{
		id: 0,
		cardTitle: 'Freelancer',
		cardDescription: 'The best pricing plan for people starting out.',
		benefits: [
			'1 Site',
			'Up to 1000 visitors',
			'Up to 1000 visitors',
			'Up to 1000 visitors',
		],
		priceTitle: 'Free',
	},

	{
		id: 1,
		cardTitle: 'Startup',
		cardDescription: 'The best pricing plan for professionals.',
		priceTitle: '$29',
		benefits: [
			'Unlimited sites',
			'Unlimited visitors',
			'Unlimited visitors',
			'Unlimited visitors',
		],
	},
]

export default function PricingTabel() {
	return (
		<>
			<div className='max-w-3xl mx-auto text-center'>
				<p className='font-semibold text-primary'>Pricing</p>
				<h1 className='mt-2 text-2xl font-bold tracking-tight sm:text-3xl'>
					Pricing plans for everyone and every budget!
				</h1>
			</div>

			<p className='mx-auto mt-4 max-w-2xl text-center leading-tight text-muted-foreground'>
				Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
				iusto modi velit ut non voluptas in . Explicabo id ut laborum.
			</p>

			<div className='grid grid-cols-1 gap-5 mt-14 lg:grid-cols-2'>
				{PricingPlans.map(item => (
					<Card key={item.id} className={item.id === 1 ? 'border-primary' : ''}>
						<CardHeader>
							<CardTitle>
								{item.id === 1 ? (
									<div className='flex items-center justify-between'>
										<h3 className='text-primary'>Startup</h3>

										<p className='rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold leading-5 text-primary'>
											Most popular
										</p>
									</div>
								) : (
									<>{item.cardTitle}</>
								)}
							</CardTitle>
							<CardDescription>{item.cardDescription}</CardDescription>
						</CardHeader>

						<CardContent>
							<p className='mt-6 text-4xl font-bold tracking-tight'>
								{item.priceTitle}
							</p>

							<ul className='mt-8 space-y-3 text-sm leading-6 text-muted-foreground'>
								{item.benefits.map((benefit, index) => (
									<li key={index} className='flex gap-x-3'>
										<Check className='text-primary size-5' />

										{benefit}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							{item.id === 1 ? (
								<form className='w-full' action={CreateSubscription}>
									<SubmitButton text='Buy plan' className='mt-4 w-full' />
								</form>
							) : (
								<Button variant={'outline'} className='mt-5 w-full' asChild>
									<Link href={'/dashboard'}>Try for free</Link>
								</Button>
							)}
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	)
}
