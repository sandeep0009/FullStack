import { useState } from "react";
import axios from 'axios';
import Images from "./Images"

const Home = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('image', file);
    formData.append('description', description);
    console.log(file,description)

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3000/api/images', formData, {
        withCredentials: true,
        headers: {
         
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setImageName(response.data.imageName);
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          name="file"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {imageName && <p>Image Name: {imageName}</p>}
      {image && <img src={image} alt="Uploaded" />}

      <Images />
    </div>
  );
};

export default Home;
