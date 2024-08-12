import { useEffect, useState } from "react"
import { Alert } from "react-native"

const UseAppwrite = (fn) => {
  
  
    const [data, setdata] = useState([])
const [isLoding, setisLoding] = useState(true)


const fetchData=async()=>{
  setisLoding(true)
  try {
    const response =await fn()
    setdata(response)
  } catch (error) {
    Alert.alert('Error', error.message)
  }finally{
    setisLoding(false)
  }
}
useEffect(()=>{
  fetchData()
},[])
const refetch = () => fetchData()

return {data ,isLoding, refetch} 

}
export default UseAppwrite