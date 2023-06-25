'use client'
import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionProvider';

import { Product } from '@/src/interfaces/product';
import { usePath } from '@/src/hooks/usePath';

interface Props {
  product?: Product;
}

export function CardProduct({ product }: Props) {
  const path = usePath()
  // console.log('pathname', pathname)
  // console.log('product', product)
  // console.log('router', router)
  const { selected, toggle, isSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(product?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(product?._id!)}
        checked={isSelected(product?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            product?.data.thumbnailUrl ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            product?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/products/${product?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {product?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}