import axios from 'axios'
import Navbar from '../Navbar'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param.id)
  const [data, setData] = useState("");

  const productIdSearch = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}product/productIdSearch/${param.id}`)
      console.log(result)
      console.log(result.data.data)
      setData(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    productIdSearch()
  }, [])
  return (


    <>
      <Navbar />

      <div className="flex items-center justify-center mt-5">
        <img src={data.pic_1} alt="" width={200} height={200} />
        <img src={data.pic_2} alt="" width={200} height={200} />
      </div>


    </>
  )
}

export default ProductDetail