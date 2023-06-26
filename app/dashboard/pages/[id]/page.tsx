import React from 'react'
import { Category } from '@/src/interfaces/category';
import { getCategoriesByParentId } from '@/src/lib/categories';
import { getPage, getPageById } from '@/src/lib/pages'
import { GridCategories0Dashboard } from '@/src/ui/grid/GridCategoryDashboard';
import { Article } from '@/src/interfaces/article';
import { getArticlesByParentId } from '@/src/lib/articles';
import { GridArticles0Dashboard } from '@/src/ui/grid/GridArticleDashboard';

interface Props {
  params: {
    id: string
  }
}

let categories: Category[];
let articles: Article[];


export default async function Index(props: Props) {
  const page = await getPageById( props.params.id)
  if (page.data.type === 'category') {
    categories = await getCategoriesByParentId('0', page._id)
  }
  if (page.data.type === 'blog') {
    articles = await getArticlesByParentId( page._id)
  }
  
  return (
    <React.Fragment>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        {
            page?.data.type === 'category' &&
            <GridCategories0Dashboard i={'0'} page={page} categories={categories} />
          }
          
          {
            page?.data.type === 'blog' &&
            <GridArticles0Dashboard i={'0'} page={page} articles={articles} />
          }
        </div>
      </main>
    </React.Fragment>
  )
}
