import { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Icon, useMediaQuery } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);
  const [validatePassed, setValidatePassed] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width: 1024px)'); // Change the breakpoint as needed
  const isComputerScreen = useMediaQuery('(min-width: 1025px)');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [reusltCode, setResultcode] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [validateData, setValidateData] = useState([])


  const navigate = useNavigate();

  const productData = {
    pic_1: null,
    pic_2: null,
    pic_3: null,
    pic_4: null,
    model: "",
    cpu: "",
    item: "",
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
    const fileList = Array.from(e.target.files);
    const firstFourFiles = fileList.slice(0, 4);

    const previewUrls = firstFourFiles.map(file => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...previewUrls]);

    const newImages = [...image, ...fileList];
    setImage(newImages);

    const newImageData = {};
    newImages.forEach((file, index) => {
      console.log("File", file.name)
      newImageData[`pic_${index + 1}`] = file;
    });
    console.log("New Image Data", newImageData)

    setData(prevData => ({
      ...prevData,
      ...newImageData
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImagePreview = [...imagePreview];
    const uploadImage = [...image]
    uploadImage.splice(indexToRemove, 1)
    updatedImagePreview.splice(indexToRemove, 1);
    setImagePreview(updatedImagePreview);
    setImage(uploadImage)

    // Also update the data object
    setData(prevData => {
      const newData = { ...prevData };
      newData[`pic_${indexToRemove + 1}`] = null;
      return newData;
    });
  };

  const handleChange = (e) => {
    const modifyData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    console.log(modifyData);
    setData(modifyData);
  };

  const validation = () => {
    return new Promise((resolve) => {
      const emptyFields = [];
      const keys = Object.keys(data);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (data[key] === "" || data[key] === null) {
          emptyFields.push(key);
          console.log("Empty Fields: ", emptyFields);
        }

        if (i === keys.length - 1) {
          if (emptyFields.length === 0) {
            console.log("End of loop, all fields are valid");
            resolve(true);
          } else {
            setValidateData(emptyFields);
            resolve(false);
          }
        }
      }
    });
  };


  const dataSave = async () => {
    try {
      const isValidationPassed = await validation();
      if (!isValidationPassed) {
        setValidatePassed(false)
        return; // Exit if validation failed
      }

      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      console.log("validateData is true");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}product/productCreatePic`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log(response);
      setResultcode(response.data.code);
      setAlertMessage(response.data.message);
      setShowAlert(true);
      console.log(response.data.code);

      if (response.data.code === "200") {
        console.log("Back")
        // await delay(2000); // Delay for 2 seconds (2000 milliseconds)
        navigate("/productsList");
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };



  const toggleRightSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar)
  };


  useEffect(() => {
    console.log("Data => ", data)
    console.log("Image=>", image)
    console.log("Validation =>", validatePassed)

  }, [data, validatePassed, image])

  return (
    <>
      <Navbar />
      <div className={`absolute right-12 border-2 w-80 z-10 top-20 h-8 rounded text-center ${!showAlert ? 'hidden' : `display mb-5`} ${reusltCode === "200" ? "text-green-600 bg-green-100 rounded-md outline outline-offset-2 outline-1" : " text-red-600 bg-red-100 rounded-md outline outline-offset-2 outline-1"}`}>
        {alertMessage}
      </div>
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
              <div className={isSmallScreen ? "ml-5flex flex-wrap ml-5" : ""}>
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


            <div className={isSmallScreen ? "ml-2 flex flex-wrap ml-5" : "flex flex-wrap ml-2 "}>
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
            <div style={{ border: '1px solid #ccc', width: '20%', margin: '20px 0' }}>
              <div style={{ width: `${uploadProgress}%`, backgroundColor: 'green', height: '20px', textAlign: 'center', color: 'white' }}>
                {uploadProgress}%
              </div>
            </div>
            <div className={isComputerScreen ? "mt-3 h-24 text-center" : "ml-5 mt-5"}>
              <button className='rounded mx-2 border border-slate-300 w-32 min-h-10 hover:border-slate-800 hover:bg-green-500 bg-green-500 shadow-xl shadow-green-700 font-semibold tracking-widest' onClick={() => { dataSave(), validation() }}>ADD</button>
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



// const upload = async () => {
//   try {
//     const item = data.item
//     const model = data.model
//     if (image.length === 4) {
//       image.forEach(async (imageFile, index) => {
//         const uploadTask = storage.ref().child(`HeinHtet/${item}/${model}/${imageFile.name}`).put(imageFile);
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setUploadProgress(progress); // Update progress state
//           },
//           (error) => {
//             console.error(error);
//           },
//           async () => {
//             await uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//               setData((prevData) => ({
//                 ...prevData,
//                 [`pic_${index + 1}`]: url
//               }));
//               console.log("Upload successful! URL:", url);
//               console.log(data)
//             }).catch((error) => {
//               console.error("Error getting download URL:", error);
//             });
//           }
//         );
//       });
//       // alert("Lenght is 4")
//     } else {
//       alert("You  must choose definitely 4 photos.")
//       console.log("You  must choose definitely 4 photos.")
//       return
//     }
//   } catch (error) {
//     console.log(error)
//   }
// };