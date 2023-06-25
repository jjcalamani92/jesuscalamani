'use client'
import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { useSelection } from '@/src/providers/SelectionProvider';
import { Category } from '@/src/interfaces/category';
import { usePath } from '@/src/hooks/usePath';

interface Props {
  category?: Category;
  i: string
}

export function CardCategory({ category, i }: Props) {
  // const router = useRouter()
  const path = usePath()

  // console.log('router', router)
  const { selected, toggle, isSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(category?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(category?._id!)}
        checked={isSelected(category?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            category?.data.thumbnailUrl ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            category?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/categories/category${i}/${category?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {category?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}