import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Defaultimage from '@/public/default.png'
import Image from 'next/image'
import Link from 'next/link'
import EmptyState from '../components/dashboard/empty-state'
import prisma from '../utils/db'
import { requireUser } from '../utils/require-user'

async function getData(userId: string) {
	const [sites, articles] = await Promise.all([
		prisma.site.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 3,
		}),

		prisma.post.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 3,
		}),
	])

	return { sites, articles }
}

export default async function DashboardIndexPage() {
	const user = await requireUser()
	const { sites, articles } = await getData(user.id)
	return (
		<div>
			<h1 className='text-2xl font-semibold mb-5'>Your sites</h1>
			{sites.length > 0 ? (
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
					{sites.map(item => (
						<Card key={item.id}>
							<Image
								src={item.imageUrl ?? Defaultimage}
								alt={item.name}
								className='rounded-t-[20px] object-cover w-full h-[200px] p-4'
								width={400}
								height={200}
							/>

							<CardHeader>
								<CardTitle className='truncate'>{item.name}</CardTitle>
								<CardDescription className='line-clamp-3'>
									{item.description}
								</CardDescription>
							</CardHeader>

							<CardFooter>
								<Button asChild className='w-full'>
									<Link href={`/dashboard/sites/${item.id}`}>
										View articles
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			) : (
				<EmptyState
					title='Your dont have any sites created'
					description='You currently dont have any sites. Plesase create some so that you can see them right here!'
					href='/dashboard/sites/new'
					buttonText='Create site'
				/>
			)}

			<h1 className='text-2xl mt-10 font-semibold mb-5'>Recent articles</h1>
			{articles.length > 0 ? (
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
					{articles.map(item => (
						<Card key={item.id}>
							<Image
								src={item.image ?? Defaultimage}
								alt={item.title}
								className='rounded-t-[20px] object-cover w-full h-[200px] p-4'
								width={400}
								height={200}
							/>

							<CardHeader>
								<CardTitle className='truncate'>{item.title}</CardTitle>
								<CardDescription className='line-clamp-3'>
									{item.smallDescription}
								</CardDescription>
							</CardHeader>

							<CardFooter>
								<Button asChild className='w-full'>
									<Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
										Edit article
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			) : (
				<EmptyState
					title='You dont have any articles created'
					description='Your currently have any articles created. Please created some so that you can see them right here!'
					buttonText='Create article'
					href='/dashboard/sites'
				/>
			)}
		</div>
	)
}
