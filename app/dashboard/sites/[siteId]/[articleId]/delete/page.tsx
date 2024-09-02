import { DeletePost } from '@/app/actions'
import { SubmitButton } from '@/app/components/dashboard/submit-buttons'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function DeleteForm({
	params,
}: {
	params: { siteId: string; articleId: string }
}) {
	return (
		<div className='flex flex-1 items-center justify-center'>
			<Card className='max-w-xl'>
				<CardHeader>
					<CardTitle>Are your absolutely sure?</CardTitle>
					<CardDescription>
						This action cnnot be undonde. This will delete this article and
						remove all data form our server
					</CardDescription>
				</CardHeader>
				<CardFooter className='w-full flex justify-end gap-2'>
					<Button variant={'secondary'} asChild>
						<Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
					</Button>
					<form action={DeletePost}>
						<input type='hidden' name='articleId' value={params.articleId} />
						<input type='hidden' name='siteId' value={params.siteId} />
						<SubmitButton variant={'destructive'} text='Delete article' />
					</form>
				</CardFooter>
			</Card>
		</div>
	)
}
