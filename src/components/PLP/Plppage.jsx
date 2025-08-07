import React,{useState, useEffect} from 'react'
import Product from '../Product/Product'
import CategorySection from '../Category/Category'
import Loader from '../Indicator/Loader'

const Plppage = () => {

  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);  
    return () => clearTimeout(timer); 
  }, []);



  const [loading, setLoading] = useState(true);
  return (
    <>
    <div style={{paddingTop:"100px"}}></div>
    {loading ? <Loader/>  :(<><CategorySection/>
    <Product number={12}/></>) }
    
    </>
  )
}

export default Plppage