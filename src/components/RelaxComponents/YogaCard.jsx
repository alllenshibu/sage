import React from 'react'

//importing Link
import Link from 'next/link';
import Image from 'next/image';


//importing material ui
import { Button, Stack, Typography } from '@mui/material';


const YogaCard = ({yoga}) => {
  return (
    <div className='.exercise-card'>
        <Image src={yoga.url_svg} alt={yoga.english_name} loading='lazy' height={200} width={200} />
        <Stack direction="row">
            
            
        </Stack>

        <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize" className='sm:text-sm md:text-start flex flex-wrap'>
            {yoga.sanskrit_name_adapted}
        </Typography>
    </div>
  )
}

export default YogaCard