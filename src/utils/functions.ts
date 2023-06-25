import { Page } from "../interfaces/page";
import { Paths } from "../interfaces/paths";
import Swal from 'sweetalert2';

export const getType = (pages: Page[]) => {
  
  const names = pages?.map(data => data.data.type)
  const nombresAEliminar: string[] = ['category', 'blog', 'product'];
  return names?.filter(data => !nombresAEliminar.includes(data))
}

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};



export const getPaths = (props: Paths) => {
  // console.log('props', props)
  const array = Object.values(props)
  return array.join('/')
}

export function capitalizar(palabras: string) {
  return palabras
    .split(' ')
    .map((palabra) => palabra[0].toUpperCase() + palabra.substring(1))
    .join(' ');
}

export function slug(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u002F]/g, '')
    .replace(/-/g, ' ')
    .normalize('NFD')
    .replace(/[\u003F]/g, '')
    .replace(/[\u0060]/g, '')
    .replace(/[\u2019]/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, '')
    .replace(/:/g, '')
    .replace(/[|]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');
}


export function SwalMessage (title: string) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: `${title}`,
    showConfirmButton: false,
    timer: 1000,
  })
}
export function SwalMessageTime (title: string, time: number) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: `${title}`,
    showConfirmButton: false,
    timer: time,
  })
}
export function SwalMessageError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
export function SwalMessageSiteCreateError (message: string) {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}