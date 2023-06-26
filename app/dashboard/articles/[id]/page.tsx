// export const revalidate = 10

import { ArticleEditor } from '@/src/ui/ArticleEditor'
import { getArticleById, getArticlesBySiteId } from '@/src/lib/articles'


interface Props {
  params: {
    id: string
  }
}

// export async function generateStaticParams() {
//   const articles = await getArticlesBySiteId()
//   return articles.map((article) => ({
//     id: article._id,
//   }));
// }



export default async function Index(props:Props) {
  const article = await getArticleById( props.params.id)
  return (
    <main>

          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          <ArticleEditor article={article} />
          </div>
    </main>
   

  )
}
