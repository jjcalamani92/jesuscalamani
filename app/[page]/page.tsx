
import { getArticlesByParentId } from '@/src/lib/articles'
import { getCategoriesByParentId } from '@/src/lib/categories'
import React from 'react'
import { getPageBySlug, getPageSeoBySlug, getPagesBySiteId } from '@/src/lib/pages';
import { ListCategories0 } from '@/src/components/portfolio/grid/categories/ListCategories0';
import {ListArticles0} from '@/src/components/portfolio/grid/articles/ListArticles0';
import { Contact0 } from '@/src/components/portfolio/contact/ContactP0';
interface Props {
  params: {
    page: string
  }
}

export async function generateMetadata(props: Props) {
  const seo = await getPageSeoBySlug(props.params.page)
  return {
    title: seo?.data.name,
    description: seo?.data.description,
    
    openGraph: {
      title: seo?.data.name,
      description: seo?.data.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      
      images: [
        {
          url: seo?.data.thumbnailUrl,
          width: 800,
          height: 600,
        },
        {
          url: seo?.data.thumbnailUrl,
          width: 1800,
          height: 1600,
          alt: seo?.data.description,
        },
      ],
    },
    
  };
}

export async function generateStaticParams() {
  const pages = await getPagesBySiteId()
  return pages.map((page) => ({
    page: page.slug,
  }));
}

export default async function Index(props: Props) {
  const page = await getPageBySlug(props.params.page)
  const categories = await getCategoriesByParentId( '0', page._id)
  const articles = await getArticlesByParentId(page._id)
  
  return (
    <React.Fragment>
      {
        page.data?.type === 'category' && <ListCategories0 page={page} categories={categories} />
      } 
      {
        page.data?.type === 'blog' && <ListArticles0 page={page} articles={articles}/>
      }
      {
        page.data?.type === 'contact' && <Contact0 />
      }
    </React.Fragment>
  )
}
