import { Link } from 'react-router-dom';
import './index.scss';
import axios from "axios";
import { useState, useEffect } from 'react';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/v2/product/`)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'error') {
          throw new Error(res.message);
        } else {
          setProduct(res.response);
        }
      })
      .catch(err => {
        alert(err);
      })
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:5000/api/v2/product/${id}`
      })
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  let dataSearch = product.filter(item => {
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(search.toString().toLowerCase())
    )
  });

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataSearch.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <Link to="/" onClick={() => deleteProduct(item._id)} className="btn btn-sm btn-danger">Delete</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home;