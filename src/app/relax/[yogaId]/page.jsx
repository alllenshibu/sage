'use client'

import { useParams } from "next/navigation";
import React, { useEffect, useState } from 'react';

// importing axios
import axios from "axios";

import { Typography, Stack, Button } from '@mui/material';




const yogaDetail = () => {

  const id = useParams();
  console.log(id);

  // array to store Yoga Data
  const [yoga, setYoga] = useState([]);
  const[benifits, setBenifits] = useState([]);


  // Function to Fetch Yoga Data
  const fetchYogaData = async() => {

    const response = await axios.get(`https://yoga-api-nzy4.onrender.com/v1/poses?id=${id.yogaId}`);
    console.log("response")
    console.log(response.data);
    setYoga(response.data);

    // pose benifits
    console.log(yoga.pose_benefits);
    // const data = yoga.pose_benefits.split('.');
    // setBenifits(data);
    // console.log(benifits);
  }

  useEffect(() => {
    fetchYogaData()
  }, []);



  
  return(

    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
    <img src={yoga.url_png} alt={yoga.english_name} loading="lazy" className="h-60 w-70" />
    <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
      <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
        {yoga.sanskrit_name_adapted}
      </Typography>
      <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} > 
        {yoga.pose_description}
      </Typography>

      <Typography sx={{ fontSize: { lg: '22px', xs: '14px' } }} className="font-semibold" > 
        Pose Benifits
      </Typography>
         
      
      <Typography sx={{ fontSize: { lg: '18px', xs: '12px' } }} > 
        {yoga.pose_benefits}
      </Typography>
      
      
    </Stack>
  </Stack>
  );


}

export default yogaDetail;