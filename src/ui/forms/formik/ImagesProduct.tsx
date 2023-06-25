import React from 'react'

interface Props {
  images: string[]
  setImages: (images: string[]) => void
}

export function ImagesProduct({images, setImages}: Props) {
  const handleImageClick = (index: number) => {
    const newImageList = [...images as string[]];
    newImageList.splice(index, 1);
    setImages(newImageList);
  };
  // console.log('images', images)
  return (
    <React.Fragment>
      {
        images!.map((data, i) =>
          <div key={i} className='relative'>
            <img className='' src={data} alt="" />
            <p className='absolute right-2 top-2 bg-gray-200 p-1 leading-none rounded-md cursor-pointer'
              onClick={() => handleImageClick(i)}>x</p>
          </div>
        )
      }
    </React.Fragment>
  )
}
