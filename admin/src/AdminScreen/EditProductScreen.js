import React, { useContext, useEffect, useReducer, useState,useRef } from "react";
import Sidebar from "../Component/Sidebar";
import {Store} from '../Store'
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_UPDATE_REQUEST":
      return { ...state, updateLoading: true };
    case "FETCH_UPDATE_SUCCESS":
      return { ...state, updateLoading: false };
    case "FETCH_UPDATE_FALI":
      return { ...state, updateLoading: false };
    default:
      return state;
  }
};

function EditProductScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [{ loading, error, updateProduct, updateLoading, product }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      updateProduct: [],
    });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chieldCategory, setChieldCategory] = useState([]);
  const [chieldCategoryId, setChieldCategoryId] = useState("");
  const [submitCategory, setSubmitCategory] = useState("");
  const [multipleImage, setMultipleImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [viewCategory, setViewCategory] = useState('');
  const [viewImage, setViewImage] = useState([]);

  const handleMultipleImageChange = (e) => {
    const files = e.target.files;
    setMultipleImages([...multipleImage, ...files]);
  };

  useEffect(() => {
    const fatchdata = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/productdetails/${productId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setImage(data.image);
        setDescription(data.description);
        setBrand(data.brand);
        setPrice(data.price);
        setCountInStock(data.countInStock);
        setViewCategory(data.category)
        setViewImage(data.multipleImage)
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fatchdata();
  }, [userInfo, productId]);

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "FETCH_UPDATE_REQUEST" });
      await axios.put(
        `/api/edit/${productId}`,
        {
          _id: productId,
          name,
          slug: name,
          price,
          description,
          image,
          countInStock,
          brand,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "FETCH_UPDATE_SUCCESS" });
      alert("product update successfully");
      navigate("/productlist");
    } catch (error) {
      dispatch({ type: "FETCH_UPDATE_FALI", error: getError(error) });
    }
  };

  return (
    <div>
      <Sidebar />
      
      
      <div style={{ paddingLeft: "200px" }}>
        
        <div className="w-full min-h-screen p-4 bg-gray-100">
          <div className="flex justify-between border-b-2 pb-2">
            <div className="flex">
              <h1 className="text-2xl font-semibold">Edit Prodcut</h1>
            </div>
            <div>
              <button
                type="button"
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Update Product
              </button>
            </div>
          </div>
          <form
            onSubmit={handleUpdateData}
            method="post"
            encType="multipart/form-data"
            className="row g-3"
          >
            <div className="md:flex">
              <section className="bg-slate-50 p-2 m-2 md:w-2/3">
                <h3 className="my-3 text-lg font-semibold">
                  Basic Information
                </h3>
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Category ID
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="inputName"
                    value={viewCategory}
                    
                  />
                </div>
                {/* TinyMCE Section */}
                <div className="py-4">
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Description
                  </label>
                  <Editor
                  
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(des, edt) => {
                      setDescription(des);
                    }}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="countries_multiple"
                    className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                  >
                    Brand Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 rounded-lg border-2  w-full"
                    id="brandname"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="flex justify-between py-4">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Category
                    </label>
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Category</option>
                      {category.map((option) => {
                        if (option.parentId === "")
                          return (
                            <option key={option.value} value={option._id}>
                              {option.name}
                            </option>
                          );
                      })}
                    </select>
                  </div>
                  <div className="pl-16 md:pl-10">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Sub Category
                    </label>
                    
                    <select
                      id="countries_multiple"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-4 md:w-60"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option>Select Sub Category</option>
                      {chieldCategory.map((option) => {
                        return (
                          <option key={option.value} value={option._id}>
                            {option.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      id="price1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="pl-16 md:pl-40">
                    <label
                      htmlFor="countries_multiple"
                      className="block mb-2 text-sm font-semibold text-gray-900  w-full "
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="p-2.5 mb-2 rounded-lg w-full border-2 md:w-60"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                </div>
              </section>
              <section className="bg-slate-50 p-2 m-1 md:w-1/3">
                <h3 className="my-3 text-lg font-semibold">Image Upload</h3>
                <div>
                  <div className="image_grid">
                    {multipleImage.map((images, index) => (
                      <div className="image" key={index}>
                        <img src={URL.createObjectURL(images)} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Upload Image</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        name="multipleImage"
                        multiple
                        onChange={handleMultipleImageChange}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
                >
                  Proudct Upload
                </button>
              </section>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
}

export default EditProductScreen;
