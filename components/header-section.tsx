import React from 'react'
import Image from 'next/image';
import clsx from 'clsx';

function HeaderSection({
    title,subtitle,className
}:{
    title:string;
    subtitle:string;
    className?:string;
}) 
{
  return (
   <header className={clsx('relative h-60 overflow-hidden',className)}>
        <div className="absolute inset-0">
            <Image src="/hero.jpg" alt='Header Image' fill className='object-cover object-center w-full h-full'/>
            <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-60 text-center pt-14">
            <h1 className='text-5xl font-bold leading-tight capitalize'>{title}</h1>
            <p className='text-xl text-gray-300'>{subtitle}</p>
        </div>
   </header>
  )
}

export default HeaderSection