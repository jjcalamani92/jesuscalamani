import { usePathname } from 'next/navigation';

export const usePath = () => {
  const asPath = usePathname()
  asPath!.toString();
  return asPath!.slice(1).split('/');
}