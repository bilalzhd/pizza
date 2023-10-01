import Layout from "../components/Layout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <Link
          className="bg-blue-900 text-white py-1 px-2 rounded-md"
          href="/products/new"
        >
          Add new product
        </Link>

        <button className="bg-blue-900 text-white py-1 px-2 rounded-md">
          Delete All
        </button>

        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border border-gray-300 rounded-lg py-1 px-2 w-full sm:w-auto md:w-96"
          style={{ maxWidth: "400px" }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td className="width-20">
                {" "}
                <input type="checkbox" />
              </td>
              <td>Name</td>
              <td>Image</td>
              <td>Description</td>
              <td>Price</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td className="flex gap-2 items-center w-20">
                  <input type="checkbox" value={item.id} />
                  <span>{index + 1}</span>
                </td>

                <td>{item.title}</td>

                <td>
                  <img
                    src={`/images/${item.images[0]}`}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <Link className="flex" href={`/products/edit/${item._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    className="btn-red flex items-center"
                    href={`/products/delete/${item._id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <span>Delete</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Products;
