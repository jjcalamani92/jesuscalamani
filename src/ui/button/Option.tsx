'use client'

import { classNames } from '@/src/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
const sortOptions = [
  { name: 'Edit', slug: 'edit', current: true },
  { name: 'More information', slug: 'info', current: false },
  { name: 'Content', slug: 'content', current: false },
  { name: 'Images', slug: 'image', current: false },
  { name: 'Seo', slug: '#', current: false },
];

interface OptionsProps{
  name: string
  slug: string
  current: boolean
}
interface Props {
  onPress: (item: string) => void
  options: OptionsProps[]
}
export function Option(props: Props) {
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="btn-default">
          Options
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-100 group-hover:text-gray-200"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.options.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <div
                    className={classNames(
                      option.current
                        ? 'font-medium text-gray-900'
                        : 'text-gray-500',
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm cursor-default',
                    )}
                    onClick= {() => props.onPress(option.slug)}
                  >
                    {option.name}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
