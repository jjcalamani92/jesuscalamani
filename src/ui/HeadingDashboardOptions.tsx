'use client'
import { TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { usePath } from '../hooks/usePath';
import { useSelection } from '../providers/SelectionProvider';
import { Category } from '../interfaces/category';
import { Page } from '../interfaces/page';
import { useQueryClient } from '@tanstack/react-query';
import { useDeletePages } from '../hooks/react-query/usePage';
import { useDeleteCategories } from '../hooks/react-query/useCategory';

interface Props {
  type?: string
}

export function HeadingDashboardOption(props: Props) {
  const { selected, allSelected, toggleAll, unSelectAll } = useSelection();
  const path = usePath();

  const deletePagesByIds = useDeletePages()
  const deleteCategoriesByIds = useDeleteCategories()
  const queryClient = useQueryClient();


  const page = queryClient.getQueryData<Page>([`get-page`, path[2]])
  const category = queryClient.getQueryData<Category>([`get-${path[2]}`, path[3]])

  const deleteHandle = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {

        if (path.length === 2) {
          deletePagesByIds.mutate(selected)
        }
        if (path.length === 3) {
          { page?.data.type === 'category' && deleteCategoriesByIds.mutate({ i: '0', parentId: path[2], ids: selected }) }
          // { page?.data.type === 'blog' && deleteArticlesByIds.mutate({ i: '0', parentId: path[2], ids: selected }) }
          // { page?.data.type === 'product' && deleteProductsByIds.mutate({ i: '0', parentId: path[2], ids: selected }) }
        }
        
        if (path.length === 4) {
          let i = path[2].replace('category','')
          { category?.data.type === 'category' && deleteCategoriesByIds.mutate({ i: `${+i+1}`, parentId: path[3], ids: selected }) }
          // { category?.data.type === 'blog' && deleteArticlesByIds.mutate({ i: `${+i+1}`, parentId: path[3], ids: selected }) }
          // { category?.data.type === 'product' && deleteProductsByIds.mutate({ i: `${+i+1}`, parentId: path[3], ids: selected }) }
        }
       
      } else {
      }
    });
  };
  return (
    <div
      className={` ${selected.length !== 0 ? 'opacity-100' : 'hidden  -translate-y-6 '
        } `}
    >
      <div className="mx-auto max-w-7xl pt-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <input
              type="checkbox"
              className="h-5 w-5  rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 bg-white"
              onChange={() => toggleAll}
              checked={allSelected}
              onClick={toggleAll}
            />

            <p className="ml-2 text-sm font-medium">Select All</p>
          </div>

          <span
            className={`block opacity-100 transition ease-in-out delay-150`}
          >
            <button className="btn-default" onClick={() => deleteHandle()}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <p className="">({selected.length})</p>
            </button>
          </span>
        </div>
      </div>
    </div>

  );
}