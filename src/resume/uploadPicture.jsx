import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase/config';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../features/cvSlice';

const UploadPicture = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.cv);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, 'images/');

  useEffect(() => {
    // Set image URLs only once during initialization
    listAll(imagesListRef)
      .then((response) => Promise.all(response.items.map((item) => getDownloadURL(item))))
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.error('Error fetching image URLs:', error);
      });
  }, [imagesListRef]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          dispatch(setImage(url));
          setImageUrls((prevUrls) => [...prevUrls, url]);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  return (
    <div className='container d-flex justify-content-between align-items-center mb-5'>
      <div className=''>
        <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
          Upload picture
          <input type='file' style={{ display: 'none' }} onChange={handleFileChange} />
        </Button>
      </div>
      {image && <Avatar alt='Uploaded' src={image} style={{ width: '90px', height: '90px' }} />}
      {/* {imageUrls.map((url, index) => (
        <Avatar key={index} alt={`Uploaded ${index + 1}`} src={url} style={{ width: '90px', height: '90px', marginLeft: '10px' }} />
      ))} */}
    </div>
  );
};

export default UploadPicture;

// import React from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { setImage } from '../features/cvSlice';

// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Avatar from '@mui/material/Avatar';

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

// const UploadPicture = () => {
//     const dispatch = useDispatch();
//     const { image } = useSelector((state) => state.cv);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 // Dispatch the setImage action to save the image in the Redux store
//                 dispatch(setImage(reader.result));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div className='container d-flex justify-content-between align-items-center mb-5'>
//             <div className="">
//                 <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//                     Upload picture
//                     <VisuallyHiddenInput type="file" onChange={handleFileChange} />
//                 </Button>
//             </div>
//             {image && <Avatar alt="Uploaded" src={image} style={{ width: '90px', height: '90px' }} />}
//         </div>
//     );
// };

// export default UploadPicture;
