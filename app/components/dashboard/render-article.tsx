import BlockQuote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/html'
import { type JSONContent } from 'novel'
import { useMemo } from 'react'

export default function RenderArticle({ json }: { json: JSONContent }) {
	const outPut = useMemo(() => {
		return generateHTML(json, [
			Document,
			Paragraph,
			Text,
			Link,
			Underline,
			Heading,
			ListItem,
			BulletList,
			Code,
			BlockQuote,
			TextStyle,
			CodeBlock,
			OrderList,
		])
	}, [json])

	return (
		<div
			className='prose m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary'
			dangerouslySetInnerHTML={{ __html: outPut }}
		/>
	)
}
