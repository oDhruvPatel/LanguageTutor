import axios from 'axios'
import { createContext , useState , useEffect} from 'react'

export const userContext= createContext({})

export function UserContextProvider({children}){

 const[user , setuser] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          const { data } = await axios.get('/profile');
          setuser(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, setuser]);
  
  // Force re-render by changing a dummy state variable

  

    return (
<userContext.Provider value={{ user, setuser }}>
  {children}
</userContext.Provider>


    )
}