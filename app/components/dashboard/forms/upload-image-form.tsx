'use client'

import { UpdateImage } from '@/app/actions'
import { UploadDropzone } from '@/app/utils/uploadthing-components'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { SubmitButton } from '../submit-buttons'

interface iAppProps {
	siteId: string
}

export default function UploadImageForm({ siteId }: iAppProps) {
	const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Image</CardTitle>
				<CardDescription>
					This is the image of your site. You can change it here
				</CardDescription>
			</CardHeader>
			<CardContent>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt='Uploaded image'
						width={200}
						height={200}
						className='size-[200px] object-cover rounded-lg'
					/>
				) : (
					<UploadDropzone
						endpoint='imageUploader'
						onClientUploadComplete={res => {
							setImageUrl(res[0].url)
							toast.success('Image has been uploaded')
						}}
						onUploadError={() => {
							toast.error('Something went wrong')
						}}
					/>
				)}
			</CardContent>
			<CardFooter>
				<form action={UpdateImage}>
					<input type='hidden' name='siteId' value={siteId} />
					<input type='hidden' name='imageUrl' value={imageUrl} />
					<SubmitButton text='Change image' />
				</form>
			</CardFooter>
		</Card>
	)
}
