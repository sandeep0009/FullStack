import { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImagesWithViews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/images-with-views');
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images with views:', error);
      }
    };

    fetchImagesWithViews();
  }, []);

  const handleImageClick = async (imageId) => {
    try {
      await axios.post(`http://localhost:3000/api/images/${imageId}/view`);
     
      setImages((prevImages) =>
        prevImages.map((image) =>
          image._id === imageId ? { ...image, views: image.views + 1 } : image
        )
      );
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      <div id="image-container">
        {images.map((image) => (
          <div key={image._id}>
            <img
              src={image.imageUrl} 
              alt={`Uploaded Image`}
              onClick={() => handleImageClick(image._id)}
            />
            <p>Views: {image.views}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
