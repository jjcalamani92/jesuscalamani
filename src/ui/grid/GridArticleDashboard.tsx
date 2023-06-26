'use client'
import { SelectionProvider } from '../../providers/SelectionProvider';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';
import { useGetPageById } from '@/src/hooks/react-query/usePage';
import { Page } from '@/src/interfaces/page';
import { CardArticle } from '../card/CardArticle';
import { Article } from '@/src/interfaces/article';
import { useGetArticlesByParentId } from '@/src/hooks/react-query/useArticle';
import { Category } from '@/src/interfaces/category';
import { useGetCategoryById } from '@/src/hooks/react-query/useCategory';

interface Props0 {
  i: string
  articles: Article[]
  page: Page
}

interface Props {
  i: string
  articles: Article[]
  category: Category
}

export function GridArticles0Dashboard(props: Props0) {
  const { data: categories } = useGetArticlesByParentId( props.i, props.page!._id, props.articles)
  const { data: page } = useGetPageById(props.page)
  return (
    <SelectionProvider ids={categories.map(data => data._id) as string[]}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories.map((data, i) => (
          <CardArticle key={i} article={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}
export function GridArticlesDashboard(props: Props) {
  const { data: category } = useGetCategoryById(`${+props.i-1}`, props.category)
  const { data: categories } = useGetArticlesByParentId( props.i, props.category._id, props.articles)
  // console.log('category', category)
  // console.log('props', props)
  return (
    <SelectionProvider ids={categories.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data?.name} category={category} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories.map((data, i) => (
          <CardArticle key={i} article={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}