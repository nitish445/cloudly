
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@material-tailwind/react';
function App() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [showLink, setShowLink] = useState(false);

  const saveImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "MyCloud");
    data.append("cloud_name", "dt8emxboh");

    try {
      if (image === null) {
        return toast.error("Please Upload an Image");
      }

      const res = await fetch('https://api.cloudinary.com/v1_1/dt8emxboh/image/upload', {
        method: "POST",
        body: data
      });

      const cloudData = await res.json();
      setUrl(cloudData.url);
      setShowLink(true);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="border border-gray-400 p-4 rounded-md max-w-md w-full">
        <div className="input flex justify-center mb-4">
          <label htmlFor="file-upload" className="custom-file-upload">
            {image ? (
              <img
                className="w-full h-auto rounded-md"
                src={image ? URL.createObjectURL(image) : ""}
                alt="img"
              />
            ) : (
              <img
                src="https://img.freepik.com/premium-vector/hand-drawn-mathematics-symbol-plus-sign-sticker-style-vector-illustration_755164-11166.jpg?w=740"
                className="h-20 w-20"
                alt="placeholder"
              />
            )}
          </label>
          <input
            id="file-upload"
            className='text-white hidden'
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button
            className='w-full bg-[#FC427B] mb-2'
            onClick={saveImage}
          >
            Upload Image
          </Button>
          {showLink && (
            <div className="bg-gray-700 p-3 rounded-md text-white w-full">
              <p className="mb-1">Image Link:</p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
          )}
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
