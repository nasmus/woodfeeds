import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../Store";
import axios from "axios";
import Sidebar from "../../Component/Sidebar";

function CategoryImageAdd() {
  const [categories, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo.token]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      await axios.post(`/api/admin/categories/${categoryId}/upload`, formData, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });

      // Handle success, e.g., show a success message
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="ml-52">
      <Sidebar />
      <div className="pt-4 mb-4 m-auto flex md:flex-col md:w-1/4">
        <form onSubmit={handleUpload} >
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-6 p-2 "
          >
            <option>select Category</option>
            {categories.map((option) => (
              <option key={option.value} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          <section>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 "
              for="multiple_files"
            ></label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
              id="multiple_files"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </section>
          <button className="bg-green-500 hover:bg-green-600 p-2 ml-2 md:ml-0 md:px-6 md:my-1.5 text-white rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryImageAdd;
