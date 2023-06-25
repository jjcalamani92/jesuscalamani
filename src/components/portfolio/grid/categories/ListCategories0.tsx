'use client'
import { Category } from '@/src/interfaces/category'
import { Page } from '@/src/interfaces/page'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  page: Page | Category
  categories: Category[]
}

export function ListCategories0(props: Props) {
  const pathname = usePathname()
  return (
    <section className="">
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold capitalize lg:text-3xl">{props.page.data.name}</h1>

          <p className="max-w-lg mx-auto mt-4 text-cris-secondary">
            {props.page.data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          {props.categories?.map((category, i) => (

            <div key={i}>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src={category.data.thumbnailUrl || 'https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg'} alt="" />

              <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-cris-fill rounded-md shadow dark:bg-gray-900">
                <Link href={`${pathname}/${category?.slug}`} className="font-semibold  hover:underline  md:text-xl">
                {category.data.name}
                </Link>

                <p className="mt-3 text-sm text-cris-secondary md:text-sm line-clamp-3">
                {category.data.description}
                </p>

                
              </div>
            </div>
          ))
          }

          
        </div>
      </div>
    </section>
  )
}
