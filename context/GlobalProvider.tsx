import { getCurrentUser } from "@/lib/appwrite";
import { isLoaded, isLoading } from "expo-font";
import { createContext , useContext,useState,useEffect } from "react";

const GlobalContext=createContext()

export const useGlobalContext=()=>useContext(GlobalContext)
const GlobalProvider=({children})=>{

const [Loggedin, setLoggedin] = useState(false)
const [User, setUser] = useState(null)
const [Loading, setLoading] = useState(true)

    useEffect(()=>{
            getCurrentUser()
            .then((res)=>{
                    if(res){
                        setLoggedin(true)
                        setUser(res)
                    }
                    else{
                        setLoggedin(false)
                        setUser(null)
                    }
            })
            .catch((err)=>{
                console.log(err);
                
            })
            .finally(()=>{
                setLoading(false)
            })
    },[])
    return(
        <GlobalContext.Provider 
        value={{
            Loggedin,
            setLoggedin,
            User,
            setUser,
            Loading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider