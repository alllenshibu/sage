'use client'
import axios from "axios"
import React, { useEffect, useState } from "react"

import Image from 'next/image'

import { Box, Stack, Typography } from '@mui/material';

//images
import RelaxBanner from '@/assets/RelaxBanner.jpeg';

// importing searchBox
import SearchYoga from '@/components/RelaxComponents/SearchYoga';
import Yogas from '@/components/RelaxComponents/Yogas';

const relax = () => {
  const [yogas, setYogas] = useState([])

  const fetchYogaData = async() => {
    

    const response = await axios.get('https://yoga-api-nzy4.onrender.com/v1/poses');
    console.log(response.data);
    setYogas(response.data);
    console.log(yogas);


    // const response=await fetch("https://yoga-api-nzy4.onrender.com/v1/poses");
    // const data=await response.json();
    // console.log(data);
    // setYogas(data);


  }

  useEffect(() => {
    fetchYogaData()
  }, [])

  if(yogas.length===0)  return(<div>Loading...</div>);

  return (

    
    <div>
        

    <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }} position="relative" p="20px">
        <Typography color="#0000FF" fontWeight="600" fontSize="26px">Mental Gym</Typography>
        <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
        Stress-Free  <br />
        Flow
        </Typography>
        <Typography fontSize="22px" fontFamily="Alegreya" lineHeight="35px">
        Discover Your Yoga Flow: Personalized Yoga Sessions
        </Typography>
        <Stack>
          <a href="#exercises" style={{ marginTop: '45px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#0000FF', padding: '14px', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Yoga</a>
        </Stack>
        <Typography fontWeight={600} color="#0000FF" sx={{ opacity: '0.1', display: { lg: 'block', xs: 'none' }, fontSize: '200px' }}>
          Yogas
        </Typography>
        {/* <Image src={RelaxBanner} alt="hero-banner" className="hero-banner-img" />  */}
      </Box>
    
    <SearchYoga />

    <Yogas/>



        
    </div>
  );
}

export default relax;