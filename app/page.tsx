import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Features } from './components/frontend/features'
import Hero from './components/frontend/hero'
import { Logos } from './components/frontend/logos'
import PricingTabel from './components/shared/pricing'

export default async function Home() {
	const { getUser } = getKindeServerSession()
	const session = await getUser()

	if (session?.id) {
		return redirect('/dashboard')
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24'>
			<Hero />
			<Logos />
			<Features />
			<PricingTabel />
		</div>
	)
}
