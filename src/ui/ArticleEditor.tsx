'use client'


import { useQuery } from '@tanstack/react-query'
import { HeadingDashboard } from './HeadingDashboard'
import { useGetArticleById } from '../hooks/react-query/useArticle'
import { Article } from '../interfaces/article'
import MarkdownEditor from './MarkdownEditor'
// import Modal from './Modal'

interface Props {
  article: Article

}

export function ArticleEditor(props: Props) {
  const { data: article } = useGetArticleById(props.article)
  // console.log('props', props)
  // console.log('article', article)
  return (
    <>
      <div className='mb-6'>
        <HeadingDashboard title={article?.data.name} article={article} />
      </div>
      <MarkdownEditor markdown={article?.data.content as string} id={props.article._id} />
      {/* <Modal /> */}
    </>
  )
}
