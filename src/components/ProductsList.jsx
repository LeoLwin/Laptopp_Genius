import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Pagination from './util/Pagination';
import DeleteButton from './util/DeleteButton';

const ProductsList = () => {

    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTotalData, setSearchTotalData] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [reusltCode, setResultcode] = useState("")
    const [item, setItem] = useState("")
    const [searchData, setSearchData] = useState(item);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const modifyData = {
            ...item, // Assuming item is the state holding your form data
            [e.target.name]: e.target.value,
        };
        console.log(modifyData);
        setItem(modifyData); // Assuming setItem is the setter function for your state
        if (e.target.value === "") {
            setItem("");
        }
    };

    const fetchProductsList = async (page) => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}product/productList/${page}`);
            if (result.data.code === "200") {
                setData(result.data.data.list);
                setTotalData(result.data.data.total);
                console.log(data);
                console.log(Number(totalData));
            } else {
                console.error("Error fetching data:", result.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const SearchItem = async (page) => {
        try {
            console.log(page, item)
            const result = await axios.post(`${import.meta.env.VITE_API_URL}product/productItemSearch/${page}`, item);
            console.log(result.data.data);
            if (result.data.code == 200) {
                setSearchData(result.data.data.list);
                setSearchTotalData(result.data.data.total)
                console.log(searchData)
                console.log(searchTotalData)
            }
            setAlertMessage(result.data.message)
            setResultcode(result.data.code)
            inputRef.current.value = "";
            setItem("")
        } catch (error) {
            console.error("Fetching data:", error.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            console.log("Work")
            const result = await axios.delete(`${import.meta.env.VITE_API_URL}product/productDelete/${id}`)
            console.log(result.data.code)
            if (result.data.code === "200") {
                setAlertMessage(result.data.message)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000);
                console.log(result.data.message);
            } else {
                console.error("Error fetching data:", result.data.message);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchProductsList(page);
    };

    useEffect(() => {
        fetchProductsList(currentPage);
    }, [currentPage]);


    const toggleAlert = () => {
        try {
            setShowAlert(true); // Set showAlert to true
            // console.log("Alert is true", showAlert);
            setTimeout(() => {
                setShowAlert(false); // Set showAlert back to false after 10 milliseconds
                // console.log("Alert is false", showAlert);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className={`absolute right-12 border-2 w-80 z-10 top-20 h-8 rounded text-center ${!showAlert ? 'hidden' : ''} ${reusltCode == 200 ? " text-green-600" : " text-red-600"}`}>
                {alertMessage}
            </div>

            <div className="max-w-md mx-auto relative mt-5">
                <div className="flex items-center">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative flex flex-grow"> {/* Added flex-grow class to make it take remaining space */}
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" name="item" ref={inputRef} id="default-search" onChange={handleChange} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Dell, Asus, Acer..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => { SearchItem(currentPage), toggleAlert() }}>Search</button>
                    </div>
                    <button type="submit" className="mx-auto text-white w-9 h-9 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => navigate("/products")}><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div className='flex-auto mb-2'>
                <div className="relative overflow-x-auto mt-5 mx-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Model
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ram
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CPU
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Option
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((dataItem) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={dataItem.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {dataItem.item}
                                    </th>
                                    <td className="px-6 py-4">{dataItem.model}</td>
                                    <td className="px-6 py-4">{dataItem.color}</td>
                                    <td className="px-6 py-4">{dataItem.ram}</td>
                                    <td className="px-6 py-4">{dataItem.cpu}</td>
                                    <td className="px-6 py-4">{dataItem.price}</td>
                                    <td className='px-6 py-4  flex space-x-8 text-start' >
                                        <i className="fa-solid fa-info hover:text-gray-600 transform hover:translate-y-[-2px] transition duration-200 ease-in-out"></i>
                                        <i className="fa-regular fa-pen-to-square hover:text-yellow-600 transform hover:translate-y-[-2px] transition duration-200 ease-in-out"></i>
                                        <DeleteButton deleteItem={handleDelete} id={dataItem.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
            </div >

            <Pagination totalData={totalData} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />

        </>
    )
}

export default ProductsList