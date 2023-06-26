export const dynamic = 'error';

import React, { Fragment } from 'react'
import { getCategoriesByParentId, getCategory, getCategoryById } from '@/src/lib/categories';


// import { GridArticlesDashboard } from '@/src/ui/grid/GridArticleDashboard';
import { GridCategoriesDashboard } from '@/src/ui/grid/GridCategoryDashboard';
import { Article } from '@/src/interfaces/article';
import { Category } from '@/src/interfaces/category';
import { Product } from '@/src/interfaces/product';
import { getArticlesByParentId } from '@/src/lib/articles';
import { GridArticlesDashboard } from '@/src/ui/grid/GridArticleDashboard';
// import { getArticlesByParentId } from '@/src/lib/articles';
// import { getCategoriesByParentId, getCategoriesBySiteId, getCategoryById } from '@/src/lib/categories'

interface Props {
  params: {
    id: string
  }
}

const i = '0'

// export async function generateStaticParams() {
//   const categories = await getCategoriesBySiteId(i) as Category[]
//   return categories.map((category) => ({
//     id: category._id,
//   }));
// }


let categories: Category[];
let articles: Article[];
let products: Product[]

export default async function Index(props: Props) {
  const category = await getCategoryById(i,  props.params.id)
  
  if (category.data.type === 'category') {
    categories = await getCategoriesByParentId(`${+i+1}`, props.params.id)
  } 
  if (category.data.type === 'blog') {
    articles = await getArticlesByParentId( props.params.id)
  }

  
  return (
    <Fragment >
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
      {
        category?.data.type === 'category' &&
        <GridCategoriesDashboard i={`${+i+1}`} category={category} categories={categories}/>
      }
      {
        category?.data.type === 'blog' &&
        <GridArticlesDashboard i={`${+i+1}`} category={category} articles={articles}/>
      }
        </div>
      </main>
    </Fragment>
  )
}
