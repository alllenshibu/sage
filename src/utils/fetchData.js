export const fetchData= async ()=>{

    const response =fetch('https://yoga-api-nzy4.onrender.com/v1');
    const data= await response.JSON();

    return data;
}