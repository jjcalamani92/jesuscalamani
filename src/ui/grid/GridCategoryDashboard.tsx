'use client'
import { SelectionProvider } from '../../providers/SelectionProvider';
import { Site } from '@/src/interfaces/site';
// import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';
import { Page } from '@/src/interfaces/page';
import { CardPage } from '../card/CardPage';
import { Category } from '@/src/interfaces/category';
import { CardCategory } from '../card/CardCategory';
import { useGetCategories, useGetCategoryById, } from '@/src/hooks/react-query/useCategory';
import { HeadingDashboard } from '../HeadingDashboard';
import { useGetPageById } from '@/src/hooks/react-query/usePage';
// import { useGetPageById } from '@/src/hooks/usePage';
// import { useGetCategoriesByParentId, useGetCategoryById } from '@/src/hooks/useCategory';

interface Props0 {
  i: string
  categories: Category[]
  page: Page
}

export function GridCategories0Dashboard(props: Props0) {
  
  const { data: categories } = useGetCategories(props.i, props.page._id, props.categories)
  // console.log('categories', categories)
  const { data: page } = useGetPageById(props.page)
  // console.log('page', page)
  return (
    <SelectionProvider ids={categories.map(data => data._id) as string[]}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories.map((data, i) => (
          <CardCategory key={i} i={props.i} category={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}

interface Props {
  i: string
  categories: Category[]
  category: Category
}
export function GridCategoriesDashboard(props: Props) {
  
  const { data: category } = useGetCategoryById(`${+props.i-1}`, props.category)
  const { data: categories } = useGetCategories(props.i, props.category._id, props.categories)
  // console.log('props', props)
  return (
    <SelectionProvider ids={categories.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data.name} category={category} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories.map((data, i) => (
          <CardCategory key={i} i={props.i} category={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}