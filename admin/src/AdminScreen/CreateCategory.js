import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import Sidebar from "../Component/Sidebar";
import { useNavigate } from "react-router-dom";

function CreateCategory() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categories, setCategoryList] = useState([]);
  const [parentId, setParentId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const form = new FormData();
    //  form.append("name", name);
    //  form.append('parentId',parentCategoryId);

    try {
      await axios.post(
        `/api/admin/category/addcategory`,
        { name, parentId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      alert("product upload successfully");
    } catch (error) {
      alert(error);
    }
  };

  const createCategoryList = (options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        for (let item of category.children) {
          options.push({
            value: item._id,
            name: item.name,
            parentId: item.parentId,
            type: item.type,
          });
          // if (item.children.length > 0) {
          //   for (let element of item.children) {
          //     options.push({
          //       value: element._id,
          //       name: element.name,
          //       parentId: element.parentId,
          //       type: element.type,
          //     });
          //   }
          // }
        }
      }
    }
    return options;
  };

  return (
    <div>
      <Sidebar />
      <div className=" ml-52 create__category">
        <div>
          <h1 className="text-4xl text-cyan-500 font-bold">Create Category</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="w-72">
            <div class="relative w-full min-w-[200px] h-10">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-400 disabled:border-1 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-400 focus:border-gray-900"
                placeholder=" "
              />
              <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Category Name
              </label>
            </div>
          </div>

          <div className="pt-4 mb-4 flex md:flex-col md:w-1/4">
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:px-6 p-2 "
            >
              <option>select Category</option>
              {createCategoryList().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <button className="bg-green-500 hover:bg-green-600 p-2 ml-2 md:ml-0 md:px-6 md:my-1.5 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
