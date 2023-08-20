import React from 'react'

//importing Link
import Link from 'next/link';
import Image from 'next/image';


//importing material ui
import { Button, Stack, Typography } from '@mui/material';


const YogaCard = ({yoga}) => {
  return (
    <div className='w-300 h-455 bg-white border-t-2 rounded-bl-20 border-blue-500 flex justify-between flex-col pb-3 transition ease-in-out delay-150 bg-blue-50 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300'>
        <Image src={yoga.url_svg} alt={yoga.english_name} loading='lazy' height={200} width={200} className='p-3'/>

        <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize" className='sm:text-sm md:text-start flex flex-wrap'>
            {yoga.sanskrit_name_adapted}
        </Typography>
    </div>
  )
}

export default YogaCard;