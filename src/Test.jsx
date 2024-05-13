import { useEffect, useState } from 'react';
import { storage } from './firebase'; // Make sure to import the storage module correctly
// import { v4 as uuidv4 } from 'uuid';

function Test() {
  const [image, setImage] = useState([]);
  const [data, setData] = useState([]);


  const handleImageChange = (e) => {
    // Convert FileList to Array
    const fileList = Array.from(e.target.files);
    // Append the selected files to the existing array
    setImage([...image, ...fileList]);
    console.log(image)
  };


  const upload = () => {
    if (image.length === 0)
      return;

    const ramdon = "hhel"

    //   const uploadTask = storage.ref().child(`phoe/${image.name}`).put(image);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       // Handle upload progress if needed
    //     },
    //     (error) => {
    //       console.error(error);
    //     },
    //     () => {
    //       // Upload complete
    //       alert("Upload successful!");
    //     }
    //   );
    // }
    image.forEach((image) => {
      const uploadTask = storage.ref().child(`testing/${ramdon}/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload complete
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("Upload successful! URL:", url);
            // You can store the URL in state or perform any other actions with it
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });

        }
      );
    });
  };


  // const delete = () =>{
  //   deleteObject
  // }
  // List All Files
  // const listItem = () => {
  //   setData([]); // Clear previous data
  //   storage
  //     .ref()
  //     .child("phoe/")
  //     .listAll()
  //     .then((res) => {
  //       res.items.forEach((item) => {
  //         // Push the full path of each file to the data array
  //         item.getDownloadURL().then((url) => {
  //           setData((arr) => [...arr, url]);
  //         });
  //       });
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  const listItem = () => {
    setData([]); // Clear previous data
    storage
      .ref()
      .child("testing/hhel/")
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          // Push the full path of each file to the data array
          item.getDownloadURL().then((url) => {
            setData((arr) => [...arr, url]);
          });
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };



  useEffect(() => {
    listItem()
  }, [setImage])
  return (
    <>
      <center>
        <div className="App">
          <input type="file" onChange={handleImageChange} multiple />
          <button onClick={upload}>Upload</button>
        </div>
        <div>

          <button onClick={listItem}>
            List Item
          </button>
          <br />
          <br />
          {/* {data.map((val, index) => (
          <p key={index}>{val}</p>
        ))} */}
          {data.map((url, index) => (
            < img key={index} src={url} alt="" style={{ width: '100px', height: '100px', marginRight: '10px' }} />
            // <p key={index}> {url}</p>
          ))}

        </div >
      </center >

    </>
  );
}

export default Test;
