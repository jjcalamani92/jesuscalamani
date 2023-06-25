'use client'
import { SelectionProvider } from '../../providers/SelectionProvider';
import { Site } from '@/src/interfaces/site';
// import { HeadingDashboard } from '../HeadingDashboard';
// import { HeadingDashboardOption } from '../HeadingDashboardOptions';
// import { useGetPagesByParentId } from '@/src/hooks/usePage';
import { Page } from '@/src/interfaces/page';
import { CardPage } from '../card/CardPage';
// import { HeadingDashboard } from '../HeadingDashboard';
// import { HeadingDashboardOption } from '../HeadingDashboardOptions';
import { useQueryClient } from '@tanstack/react-query';
import { useGetPages } from '@/src/hooks/react-query/usePage';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  // site: Site
  pages: Page[]
}

export function GridPagesDashboard(props: Props) {
  const { data: pages } = useGetPages('parent', props.pages)
  // const { data: site } = useGetSiteById( props.site)
  
  // const queryClient = useQueryClient();
  // const site = queryClient.getQueryData<Site>([`get-site`])
  
  // const pages = queryClient.getQueryData<Page[]>([`get-pages-${type}`, uid])
  
  return (
    <SelectionProvider ids={pages.map(data => data._id.toString()) as string[]}>
      {/* <HeadingDashboard title={site?.data.name} site={site} />
       */}
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {pages.map((data, i) => (
          <CardPage key={i} page={data} />
        ))}
      </div>
    </SelectionProvider>
  );
}