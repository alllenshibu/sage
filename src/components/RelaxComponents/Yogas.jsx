import React, { useEffect, useState } from 'react';

// importing material ui
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

// importing axios
import axios from "axios";

// importing Yoga Card
import YogaCard from './YogaCard';

// import { exerciseOptions, fetchData } from '../utils/fetchData';
// import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Yogas = () => {
       
    // array to store Yoga Data
    const [yogas, setYogas] = useState([])

    // Function to Fetch Yoga Data
    const fetchYogaData = async() => {
    
    const response = await axios.get('https://yoga-api-nzy4.onrender.com/v1/poses');
    console.log(response.data);
    setYogas(response.data);
    console.log(yogas);
  }

  useEffect(() => {
    fetchYogaData()
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const yogasPerPage = 9;


  const indexofLastYoga = currentPage * yogasPerPage;
  const indexofFirstYoga = indexofLastYoga - yogasPerPage;
  const currentYogas = yogas.slice(indexofFirstYoga, indexofLastYoga);

   // Function to change page
   const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });

    }

    if (!currentYogas.length) return <Loader />;


  return (
    <Box id="yogas" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">Showing Yogas</Typography>
      <Stack direction="row" sx={{ gap: { lg: '80px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
       
          {currentYogas.map(yoga => (
            <YogaCard key={yoga.id} yoga={yoga} />
          ))}
      </Stack>


      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {yogas.length > 9 && (
          <Pagination
            shape="rounded"
            color="primary"
            size="large"
            defaultPage={1}
            count={Math.ceil(yogas.length / yogasPerPage)}
            page={currentPage}
            onChange={paginate}            
          /> 
        )} 
      </Stack>
    </Box>
  );
};

export default Yogas;