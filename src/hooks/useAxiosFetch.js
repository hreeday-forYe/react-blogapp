import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataURL) =>{
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    let isMounted = true;
    // the is the cancalletion toke for axios
    const source = axios.CancelToken.source();

    const fetchData = async (url) =>{
      setIsLoading(true)
      try {
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        if(isMounted){
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if(isMounted){
          setFetchError(error.message);
          setData([]);
        }
      }finally{
        isMounted && setTimeout(()=>setIsLoading(false), 2000);
      }
    }

    fetchData(dataURL);
    // defining the cleanup
    const cleanUp = () =>{
      console.log("Clean UP function");
      isMounted = false;
      source.cancel();
    }
    return cleanUp;
  },[dataURL])

  return {data, fetchError, isLoading};
}

export default useAxiosFetch;