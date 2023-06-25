
import { Article } from '@/src/interfaces/article'
import { getArticleById, getArticlesBySiteId } from '@/src/lib/articles'
import { getSiteById } from '@/src/lib/sites'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Fragment } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { Post0 } from '@/src/components/portfolio/grid/articles'

interface Props {
  params: {
    id: string
    slug: string
  }
}
export async function generateMetadata(props: Props) {
  const seo = await getArticleById(props.params.id)
  // const page = await getPageSeoBySlug(type, props.params.page) as Page
  // const site = await getSiteById()

  return {
    title: seo?.data.name,
    description: seo?.data.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,

    openGraph: {
      title: seo?.data.name,
      description: seo?.data.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,

      images: [
        {
          url: seo?.data.thumbnailUrl || 'https://blog.fmb.mx/hubfs/blog/blog-frecuencia.jpg',
          width: 800,
          height: 600,
        },
        {
          url: seo?.data.thumbnailUrl || 'https://blog.fmb.mx/hubfs/blog/blog-frecuencia.jpg',
          width: 1800,
          height: 1600,
          alt: seo?.data.description,
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
    }
  };
}


// export async function generateStaticParams() {
//   const articles = await getArticlesBySiteId()

//   return articles.map((article) => ({
//     id: article._id,
//     slug: article.slug,
//   }));
// }

const data = `

`

export default async function Index(props: Props) {
  const article = await getArticleById(props.params.id)
  const site = await getSiteById()
  const componentsPost = {
    Post0: () => (
      <Post0 post={article} />
    ),
  }
  

  return (
    <Fragment>


      <MDXRemote
        source={site.data.components.article}
        components={componentsPost}
      />

      
    </Fragment>
  )
}
