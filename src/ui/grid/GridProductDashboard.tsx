'use client'
import { SelectionProvider } from '../../providers/SelectionProvider';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';
import { useGetPageById } from '@/src/hooks/react-query/usePage';
import { Page } from '@/src/interfaces/page';
import { CardProduct } from '../card/CardProduct';
import { Product } from '@/src/interfaces/product';
import { useGetProductsByParentId } from '@/src/hooks/react-query/useProduct';
import { Category } from '@/src/interfaces/category';
import { useGetCategoryById } from '@/src/hooks/react-query/useCategory';

interface Props0 {
  i: string
  products: Product[]
  page: Page
}

interface Props {
  i: string
  products: Product[]
  category: Category
}

export function GridProducts0Dashboard(props: Props0) {
  const { data: categories } = useGetProductsByParentId( props.i, props.page!._id, props.products)
  const { data: page } = useGetPageById(props.page)
  return (
    <SelectionProvider ids={categories.map(data => data._id) as string[]}>
      <HeadingDashboard title={page.data.name} page={page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {categories.map((data, i) => (
          <CardProduct key={i} product={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}
export function GridProductsDashboard(props: Props) {
  const { data: products } = useGetProductsByParentId( props.i, props.category._id, props.products)
  const { data: category } = useGetCategoryById(`${+props.i-1}`, props.category)
  return (
    <SelectionProvider ids={products.map(data => data._id) as string[]}>
      <HeadingDashboard title={category.data?.name} category={category} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {products.map((data, i) => (
          <CardProduct key={i} product={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}