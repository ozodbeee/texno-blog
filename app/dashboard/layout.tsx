import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Logo from '@/public/logo.svg'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { CircleUser, DollarSign, Globe, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import NextTopLoader from 'nextjs-toploader'
import { ReactNode } from 'react'
import DashboardItem from '../components/dashboard/dashboard-item'
import { ThemeToggle } from '../components/dashboard/theme-toogle'

export const navLinks = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: Home,
	},
	{
		name: 'Sites',
		href: '/dashboard/sites',
		icon: Globe,
	},
	{
		name: 'Pricing',
		href: '/dashboard/pricing',
		icon: DollarSign,
	},
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<section className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
			<div className='hidden border-r bg-muted/40 md:block'>
				<div className='flex h-full max-h-screen flex-col gap-2'>
					<div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-5'>
						<Link href={'/'} className='flex items-center gap-2 font-semibold'>
							<Image src={Logo} alt='logo' className='size-8' />

							<h3 className='text-2xl'>
								Texno<span className='text-primary'>Blog</span>
							</h3>
						</Link>
					</div>

					<div className='flex-1'>
						<nav className='grid items-start px-2 font-medium lg:px-5'>
							<DashboardItem />
						</nav>
					</div>
				</div>
			</div>

			<div className='flex flex-col'>
				<header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
					<div className='ml-auto flex items-center gap-x-1'>
						<ThemeToggle />

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant={'outline'} size={'icon'}>
									<CircleUser className='size-6' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem asChild>
									<LogoutLink>Log out</LogoutLink>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				<main className='flex flex-1 flex-col gap-4 px-4 lg:gap-6 lg:p-6'>
					<NextTopLoader
						color='#2299DD'
						initialPosition={0.08}
						crawlSpeed={200}
						height={2}
						crawl={true}
						showSpinner={false}
						easing='ease'
						speed={200}
						shadow='0 0 10px #2299DD,0 0 5px #2299DD'
						zIndex={1600}
						showAtBottom={false}
					/>
					{children}
				</main>
			</div>
		</section>
	)
}
