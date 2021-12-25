import { Link } from "react-router-dom";
import './index.scss';
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v2/product/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'error') {
          throw new Error(res.message);
        } else {
          setProduct(res.response);
          console.log(setProduct);
        }
      })
      .catch(err => {
        alert(err);
      })

  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{product.stock}</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <img
                className="product-image"
                src={product.image_url}
                alt="image_url"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;