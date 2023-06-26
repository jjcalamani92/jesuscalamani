'use client'
/* eslint-disable react/no-children-prop */

import { FolderPlusIcon } from '@heroicons/react/24/solid';
import { SlideOversForm } from './SlideOversForm';
import { useKeyPress } from 'ahooks';
import { Option } from './button/Option';
import { Page } from '../interfaces/page';
import { Article } from '../interfaces/article';
import { Site } from '../interfaces/site';
import { Product } from '../interfaces/product';
import { Adoption } from '../interfaces/adoption';
import { Category } from '../interfaces/category';
import { usePath } from '../hooks/usePath';
import { useUI } from '../providers/UIProvider';

import { useSession } from 'next-auth/react';
import { FormPage } from './forms/FormPage';
import { FormCategory } from './forms/FormCategory';
import { FormPageEdit } from './forms/FormPageEdit';
import { FormCategoryEdit } from './forms/FormCategoryEdit';
import { FormArticle } from './forms/FormArticle';
import { FormArticleEdit } from './forms/FormArticleEdit';
import { useUpdateArticle } from '../hooks/react-query/useArticle';
import { FormProduct } from './forms/FormProduct';
import { FormArticles } from './forms/FormArticles';

interface Props {
  title?: string;

  category?: Category;
  page?: Page;
  article?: Article;
  site?: Site;
  product?: Product;
  adoption?: Adoption;
}

const sortOptionsSite = [
  { name: 'Edit Site', slug: 'edit-site', current: true },
  { name: 'Edit Logo', slug: 'edit-site-logo', current: false },
  { name: 'Edit Icon', slug: 'edit-site-icon', current: false },
  { name: 'Edit Theme', slug: 'edit-site-theme', current: false },
  { name: 'More information', slug: 'info', current: false },
  { name: 'Content', slug: 'content', current: false },
  { name: 'Images', slug: 'image', current: false },
  { name: 'Seo', slug: '#', current: false }
]
const sortOptionsArticle = [
  { name: 'Edit Article', slug: 'edit-article', current: true },
  { name: 'Edit Name', slug: 'edit-article-name', current: false },
  { name: 'Edit Description', slug: 'edit-article-description', current: false },
  { name: 'Edit Thumbnail', slug: 'edit-article-thumbnail', current: false },
  // { name: 'Content', slug: 'content', current: false },
  { name: 'Images', slug: 'image', current: false },
  { name: 'Seo', slug: '#', current: false }
]

const sortOptionsProduct = [
  { name: 'Edit Name', slug: 'edit-product-name', current: true },
  { name: 'Edit Description', slug: 'edit-product-description', current: false },
  { name: 'Edit Thumbnail', slug: 'edit-product-thumbnail', current: false },
  { name: 'Technical Specifications', slug: 'technical-specifications', current: false },
  { name: 'Images', slug: 'images', current: false },
  { name: 'Seo', slug: '#', current: false }
]
const sortOptionsCategory = [
  { name: 'Edit Category', slug: 'edit-category', current: true },
  // { name: 'Edit Name', slug: 'edit-category-name', current: true },
  // { name: 'Edit Description', slug: 'edit-category-description', current: false },
  { name: 'Edit Thumbnail', slug: 'edit-category-thumbnail', current: false },
  { name: 'Content', slug: 'content', current: false },
  // { name: 'Images', slug: 'image', current: false },
  // { name: 'Seo', slug: '#', current: false },
  { name: 'Delete Category', slug: 'delete-category', current: false },
]
const sortOptionsPage = [
  { name: 'Edit Page', slug: 'edit-page', current: true },
  // { name: 'Edit Name', slug: 'edit-page-name', current: true },
  // { name: 'Edit Description', slug: 'edit-page-description', current: false },
  { name: 'Edit Thumbnail', slug: 'edit-page-thumbnail', current: false },
  // { name: 'Content', slug: 'content', current: false},
  // { name: 'Seo', slug: '#', current: false },
  { name: 'Delete Page', slug: 'delete-page', current: false },
  // { name: 'Delete Categories', slug: 'deletes-pages', current: false }
]

export function HeadingDashboard(props: Props) {
  const { page, site, article, product, title, category } = props;

  const path = usePath();
  const { data } = useSession()
  const updateArticle = useUpdateArticle(article?._id as string);

  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm,
    toggleModal,
    toggleSlideOversFormArticle,
    contentArticle
  } = useUI();
  useKeyPress(['ctrl.shift.e'], () => {
    toggleSlideOversFormArticle.actions.toggle();
    // setChildrens(<FormContent article={article} />)
  });
  const handleClickEdit = (slug: string) => {
    
    if (path.length === 3 && sortOptionsPage.map(data => data.slug).includes(slug)) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormPageEdit page={page} type={slug} />);
    }

    if (category && sortOptionsCategory.map(data => data.slug).includes(slug)) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategoryEdit category={category} type={slug} />);
    }
    if (article && sortOptionsArticle.map(data => data.slug).includes(slug)) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticleEdit article={article} type={slug} />);
    }
  }
  const handleClickAdds = () => {
    toggleSlideOversForm.actions.toggle();
    setChildrens(<FormArticles />);
    
  }
  const handleClickAdd = () => {

    if (
      path.length === 2
    ) {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormPage />);
    }
    if (page?.data.type === 'blog') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle />);
    }
    if (category?.data.type === 'blog') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormArticle />);
    }
    if (page?.data.type === 'category') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategory />);
    }
    if (category?.data.type === 'category') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormCategory />);
    }
    if (page?.data.type === 'product') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormProduct />);
    }
    if (category?.data.type === 'product') {
      toggleSlideOversForm.actions.toggle();
      setChildrens(<FormProduct />);
    }
    if (article) {
      updateArticle.mutate({ type: 'content', input: { content: contentArticle.content as string, uid: data?.user.sid } })
      // console.log('content', { type: 'content', input: { content: contentArticle.content as string, uid: data?.user.sid } })
    }

  };


  return (
    <div className=''>
      <div className="flex lg:items-center justify-between">
        <div className="min-w-0 flex space-x-2">
          <h2 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>

          {site && (
            <Option onPress={handleClickEdit} options={sortOptionsSite} />
          )}
          {page && (
            <Option onPress={handleClickEdit} options={sortOptionsPage} />
          )}
          {article && (
            <Option onPress={handleClickEdit} options={sortOptionsArticle} />
          )}
          {category && (
            <Option onPress={handleClickEdit} options={sortOptionsCategory} />
          )}
          {product && (
            <Option onPress={handleClickEdit} options={sortOptionsProduct} />
          )}
        </div>
        <div className="flex">
          <span className="block">
            {
              path.length > 1 &&
              <div className=' flex space-x-3 align-middle'>
                {
                  page?.data.type === 'blog' || category?.data.type === 'blog' &&
                <button
                  className="btn-primary "
                  onClick={() => handleClickAdds()}
                >
                  
                  <p className="hidden sm:block">
                    Files
                  </p>
                </button>
                }

                <button
                  className="btn-primary space-x-3"
                  onClick={() => handleClickAdd()}
                >
                  <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
                  <p className="hidden sm:block">
                    {path.length === 2 && 'Add Page'}
                    {
                      page?.data.type === 'blog' && 'Add Article'
                    }
                    {
                      category?.data.type === 'blog' && 'Add Article'
                    }
                    {
                      page?.data.type === 'category' && 'Add Category'
                    }
                    {
                      category?.data.type === 'category' && 'Add Category'
                    }
                    {
                      page?.data.type === 'product' && 'Add Product'
                    }
                    {
                      category?.data.type === 'product' && 'Add Product'
                    }
                    {
                      article && 'Publish'
                    }

                  </p>
                </button>
              </div>
            }
          </span>

        </div>
      </div>

      <SlideOversForm children={childrens} />
      {/* <Modal /> */}
    </div>
  );
}
