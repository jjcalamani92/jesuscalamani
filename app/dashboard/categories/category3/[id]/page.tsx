export const dynamic = 'error';

import React, { Fragment } from 'react'
import { GridCategoriesDashboard } from '@/src/ui/grid/GridCategoryDashboard';
import { Article } from '@/src/interfaces/article';
import { Category } from '@/src/interfaces/category';
import { Product } from '@/src/interfaces/product';
import { getCategoriesByParentId, getCategory, getCategoryById } from '@/src/lib/categories';

interface Props {
  params: {
    id: string
  }
}

const i = '3'

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

  // console.log('category', category)
  if (category.data.type === 'category') {
    categories = await getCategoriesByParentId(`${+i+1}`, props.params.id)
  } 
  // else if (category.data.type === 'blog') {
  //   articles = await getArticlesByParentId( props.params.id)
  // }
  
  return (
    <Fragment >
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          
      {
        category?.data.type === 'category' &&
        <GridCategoriesDashboard i={`${+i+1}`} category={category} categories={categories}/>
      }
        </div>
      </main>
      {/* {
        category?.data.type === 'blog' &&
        <GridArticlesDashboard i={`${+i+1}`} category={category} articles={articles}/>
      } */}
    </Fragment>
  )
}
