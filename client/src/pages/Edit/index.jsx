import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v2/product/${id}`
      );
      try {
        setName(res.data.response.name);
        setPrice(res.data.response.price);
        setStock(res.data.response.stock);
        setStatus(res.data.response.status);
        setImage(res.data.response.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    
  }, [id]);

  const handleSubmit = async (e) => {
    const dataImage = setImage(image) === null ? setImage(image) : image;
    const productFormData = new FormData();
    productFormData.append("name", name);
    productFormData.append("price", price);
    productFormData.append("stock", stock);
    productFormData.append("status", status);
    productFormData.append("image", dataImage);

    e.preventDefault();

    try {
      await axios({
        method: "put",
        url: `http://localhost:5000/api/v2/product/${id}`,
        data: productFormData,
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>

        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={status}
            onChange={() => setStatus(!status)}
          />
          <Input
            type="file"
            label="Image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;