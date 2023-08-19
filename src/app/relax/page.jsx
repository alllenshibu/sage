'use client'
import axios from "axios"
import React, { useEffect, useState } from "react"

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
        <ul>
          {yogas.map(yoga => (
            <li key={yoga.id}>{yoga.english_name}</li>
          ))}
        </ul>
     
    </div>
  );
}

export default relax;