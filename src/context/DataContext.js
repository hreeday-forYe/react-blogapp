
// WE can have more than one context in our application here we have small application which 
// is only the posts we don't need more than one contextx
import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({children}) =>{
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // this line replaces the bewlo use effect
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  useEffect(()=>{
    setPosts(data);
  },[data])
  // Use effect to factor the search
  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());

    

  }, [posts, search])

  

  
  return (
    <DataContext.Provider value={{
      // Now, This is where we will put different values what have been props that been passing down
      // now can be passed through DataContext.provider and our dataProvider will provide for them 
      // as we will request then using  "useContext hook"
      search, 
      setSearch,
      searchResults, fetchError, isLoading,
      posts, setPosts,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;