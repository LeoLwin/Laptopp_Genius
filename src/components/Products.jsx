import { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Icon, useMediaQuery } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { storage } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);
  const [uploadImage, setUploadImage] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // Change the breakpoint as needed
  const isComputerScreen = useMediaQuery('(min-width: 1025px)');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [reusltCode, setResultcode] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [validateData, setValidateData] = useState([])


  const navigate = useNavigate();

  const productData = {
    pic_1: "",
    pic_2: "",
    pic_3: "",
    pic_4: "",
    model: "",
    cpu: "",
    ram: "",
    storage: "",
    graphics: "",
    battery: "",
    screen_size: "",
    color: "",
    price: "",
  }

  const [data, setData] = useState(productData);

  const handleImageChange = (e) => {

    // Convert FileList to Array
    const fileList = Array.from(e.target.files);
    // Get the first four selected files
    const firstFourFiles = fileList.slice(0, 4);
    // Append the first four files to the existing array
    const previewUrls = firstFourFiles.map(file => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...previewUrls]);
    setImage([...image, ...firstFourFiles]);
    console.log(image)
    console.log(imagePreview)
  };

  const handleChange = (e) => {
    const modifyData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    console.log(modifyData);
    setData(modifyData);
  };

  const checkData = async () => {
    const emptyFields = [];
    for (const key in data) {
      if (data[key] === "") {
        emptyFields.push(key);
      }
    }
    setValidateData(emptyFields);
    setTimeout(() => {
      setValidateData([]);
    }, 5000);
  };

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


  const upload = async () => {
    try {
      if (image.length === 0) {
        return;
      }
      const item = data.item
      const model = data.model
      image.forEach(async (imageFile, index) => {
        const uploadTask = storage.ref().child(`HeinHtet/${item}/${model}/${imageFile.name}`).put(imageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress); // Update progress state
          },
          (error) => {
            console.error(error);
          },
          async () => {
            await uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              setData((prevData) => ({
                ...prevData,
                [`pic_${index + 1}`]: url
              }));
              console.log("Upload successful! URL:", url);
              console.log(data)
            }).catch((error) => {
              console.error("Error getting download URL:", error);
            });
          }
        );
      });
    } catch (error) {
      console.log(error)
    }

  };

  const dataSave = async () => {
    try {
      upload();
      setUploadImage(true)
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  }

  const toggleRightSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar)
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImagePreview = [...imagePreview];
    updatedImagePreview.splice(indexToRemove, 1);
    setImagePreview(updatedImagePreview);
  };


  useEffect(() => {
    // setData()
    console.log("Data => ", data)
    if (uploadImage && uploadProgress === 100) {
      // axios.post(
      //   `${import.meta.env.VITE_API_URL}product/productCreate`,
      //   data
      // ).then(res => {
      //   console.log(res)
      // }
      // )
      // console.log(res);
      console.log("is 100")
      checkData()
      if(validateData.length == 0){
        console.log("can Save")
      }
    }
  }, [data, uploadImage])

  return (
    <>
      <Navbar />
      <div className={`absolute right-12 border-2 w-80 z-10 top-20 h-8 rounded text-center ${!showAlert ? 'hidden' : ``} ${reusltCode ? " text-green-600" : " text-red-600"}`}>
        {alertMessage}
      </div>
      {console.log("Upload Process => ", uploadProgress)}
      <div className={isComputerScreen ? "ml-5 mt-5" : "mx-auto"}>
        <div className={isSmallScreen ? `${showSidebar ? '' : 'hidden'} mt-5` : ''}>
          <div className={isComputerScreen ? "hidden" : "text-center"} onClick={toggleRightSidebar} >
            <Icon component={ArrowLeftIcon} sx={{ fontSize: 45 }} />
          </div>
          {/* <div className={"border-2 border-r-blue-600  h-full max-h-full text-center"}>
            <div className={view === "products" ? "hover:bg-white-300 bg-slate-300 mt-5 py-3 rounded shadow-lg" : "hover:bg-slate-300 mt-5 py-3 rounded shadow-lg"} onClick={() => toggleView("products")}>
              <span className="font-medium">Products List</span>
            </div>

            <div className={view === "addProduct" ? "hover:bg-white-300 bg-slate-300 mt-5 py-3 rounded shadow-lg" : "hover:bg-slate-300 mt-5 py-3 rounded shadow-lg"} onClick={() => toggleView("addProduct")}>
              <span className="font-medium">Add New Product</span>
            </div>
            
          </div> */}
        </div>

        <div className=''>
          <div className={isComputerScreen ? "" : ""}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className={isSmallScreen ? "ml-5flex flex-wrap ml-" : ""}>
                <TextField id="outlined-search" label="Item" placeholder='Lenovo, Dell,..' type="text" name="item" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("item") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Model" type="text" name="model" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("model") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="CPU" type="text" name="cpu" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("cpu") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="RAM" type="text" name="ram" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("ram") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Storage" type="text" name="storage" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("storage") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Graphics" type="text" name="graphics" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("graphics") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Battery" type="text" name="battery" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("battery") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Screen Size" type="text" name="screen_size" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("screen_size") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Color" type="text" name="color" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("color") ? "bg-red-300" : ""}`} />
                <TextField id="outlined-search" label="Price" type="text" name="price" onChange={handleChange} className={`focus:bg-inherit ${validateData.includes("price") ? "bg-red-300" : ""}`} />
              </div>
            </Box>

            <div className={isSmallScreen ? "ml-2 flex flex-wrap ml-2" : "flex flex-wrap ml-2 "}>
              {imagePreview.map((url, index) => (
                <div key={index} width="102"
                  height="100" className='flex relative'>
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className={isSmallScreen ? "ml-5 " : "mr-5 mt-1 mb-2 border border-black "}
                    width="102"
                    height="100"
                  />
                  <button
                    className="absolute top-0 left-0 text-red p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}

              <input type="file" className='mt-1 ml-4 font-medium"' onChange={(e) => { handleImageChange(e) }} accept="image/*"
                multiple />
            </div>


            {/* <div className={isSmallScreen ? "ml-2 flex flex-wrap ml-2" : "flex flex-wrap ml-2 "}>
              {imagePreview.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className={isSmallScreen ? "ml-5 " : "mr-5 mt-1 mb-2 border border-black "}
                    width="102"
                    height="100"
                  />
                  <button
                    className="absolute top-0 right-0  text-red rounded-full p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <input
                type="file"
                className='mt-1 ml-4 font-medium"'
                onChange={(e) => { handleImageChange(e) }}
                accept="image/*"
                multiple
              />
            </div> */}


            <div className={validateData ? 'text-red-700 text-center' : "hidden"}>
              <p><strong>{validateData} </strong> is empty. Please enter a value.</p>
            </div>


            <div className={isComputerScreen ? "mt-3 h-24 text-center" : "ml-5 mt-5"}>
              <button className='rounded mx-2 border border-slate-300 w-32 min-h-10 hover:border-slate-800 hover:bg-green-500 bg-green-500 shadow-xl shadow-green-700 font-semibold tracking-widest' onClick={() => { dataSave() }}>ADD</button>
              <button className='rounded mx-2 border border-slate-300 w-32 min-h-10 hover:border-slate-800 hover:bg-slate-300 bg-white-400 shadow-xl shadow-slate-700 font-semibold tracking-widest' onClick={() => navigate("/productsList")} >CANCEL</button>
            </div>
          </div>
        </div>

        {/* <div className='mx-auto'>
            <div className={isComputerScreen ? "ml-5 mt-5" : ""}>
             
              <div className={isSmallScreen ? "" : ""}>
                <ProductsList />
              </div>
            </div>
          </div> */}

        {/* <ProductDetail /> */}
      </div >


    </>
  )
}

export default Products