'use client'

import { CreatePostAction } from '@/app/actions'
import TailwindEditor from '@/app/components/dashboard/editor-wrapper'
import { SubmitButton } from '@/app/components/dashboard/submit-buttons'
import { UploadDropzone } from '@/app/utils/uploadthing-components'
import { PostSchema } from '@/app/utils/zod-schemas'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ArrowLeft, Atom } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { JSONContent } from 'novel'
import { useActionState, useState } from 'react'
import slugify from 'react-slugify'
import { toast } from 'sonner'

export default function ArticleCreationRoute({
	params,
}: {
	params: { siteId: string }
}) {
	const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
	const [value, setValue] = useState<JSONContent | undefined>(undefined)
	const [slug, setSlugValue] = useState<undefined | string>(undefined)
	const [title, setTitle] = useState<undefined | string>(undefined)
	const [lastResult, action] = useActionState(CreatePostAction, undefined)
	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PostSchema })
		},

		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	function handleSlugGeneration() {
		const titleInput = title

		if (titleInput?.length === 0 || titleInput === undefined) {
			return toast.error('Please create a title first')
		}

		setSlugValue(slugify(titleInput))

		return toast.success('Sulg has been created')
	}

	return (
		<>
			<div className='flex items-center'>
				<Button size={'icon'} variant={'outline'} className='mr-3' asChild>
					<Link href={`/dashboard/sites/${params.siteId}`}>
						<ArrowLeft className='size-4' />
					</Link>
				</Button>
				<h1 className='text-xl font-semibold'>Create article</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Article details</CardTitle>
					<CardDescription>
						lipsum dolor sit amet, consectetur adipiscing elit
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='flex flex-col gap-6'
						id={form.id}
						onSubmit={form.onSubmit}
						action={action}
					>
						<input type='hidden' name='siteId' value={params.siteId} />
						<div className='grid gap-2'>
							<Label>Title</Label>
							<Input
								key={fields.title.key}
								name={fields.title.name}
								defaultValue={fields.title.initialValue}
								placeholder='NextJS blogging application'
								onChange={e => setTitle(e.target.value)}
								value={title}
							/>
							<p className='text-red-500 text-sm'>{fields.title.errors}</p>
						</div>

						<div className='grid gap-2'>
							<Label>Slug</Label>
							<Input
								key={fields.slug.key}
								name={fields.slug.name}
								defaultValue={fields.slug.initialValue}
								placeholder='Article slug'
								onChange={e => setSlugValue(e.target.value)}
								value={slug}
							/>
							<Button
								onClick={handleSlugGeneration}
								className='w-fit'
								variant={'secondary'}
								type='button'
							>
								<Atom className='size-4 mr-2' /> Generate sulg
							</Button>
							<p className='text-red-500 text-sm'>{fields.slug.errors}</p>
						</div>

						<div className='grid gap-2'>
							<Label>Small description</Label>
							<Textarea
								key={fields.smallDescription.key}
								name={fields.smallDescription.name}
								defaultValue={fields.smallDescription.initialValue}
								placeholder='Small description for your blog article...'
								className='h-32'
							/>
							<p className='text-red-500 text-sm'>
								{fields.smallDescription.errors}
							</p>
						</div>

						<div className='grid gap-2'>
							<Label>Cover image</Label>
							<input
								type='hidden'
								name={fields.coverImage.name}
								key={fields.coverImage.key}
								defaultValue={fields.coverImage.initialValue}
								value={imageUrl}
							/>
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt='Uploaded Image'
									className='object-cover w-[200px] h-[200px] rounded-lg'
									width={200}
									height={200}
								/>
							) : (
								<UploadDropzone
									onClientUploadComplete={res => {
										setImageUrl(res[0].url)
										toast.success('Image has been uploaded')
									}}
									endpoint='imageUploader'
									onUploadError={() => {
										toast.error('Something went wrong...')
									}}
								/>
							)}

							<p className='text-red-500 text-sm'>{fields.coverImage.errors}</p>
						</div>

						<div className='grid gap-2'>
							<Label>Article content</Label>
							<input
								type='hidden'
								name={fields.articleContent.name}
								key={fields.articleContent.key}
								defaultValue={fields.articleContent.initialValue}
								value={JSON.stringify(value)}
							/>
							<TailwindEditor onChange={setValue} initialValue={value} />
							<p className='text-red-500 text-sm'>
								{fields.articleContent.errors}
							</p>
						</div>

						<SubmitButton text='Create article' />
					</form>
				</CardContent>
			</Card>
		</>
	)
}
