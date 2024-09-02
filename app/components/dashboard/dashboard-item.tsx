'use client'

import { navLinks } from '@/app/dashboard/layout'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardItem() {
	const pathname = usePathname()
	return (
		<>
			{navLinks.map(item => (
				<Link
					href={item.href}
					key={item.name}
					className={cn(
						pathname == item.href
							? 'bg-muted text-primary'
							: 'text-muted-foreground bg-none',
						'flex items-center gap-3 mt-2 rounded-lg px-3 py-2 transition-all duration-500 hover:text-primary/70 hover:bg-muted border dark:border-white/20 border-black/20'
					)}
				>
					<item.icon className='size-4' />
					{item.name}
				</Link>
			))}
		</>
	)
}
