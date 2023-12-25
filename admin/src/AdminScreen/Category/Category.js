import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { Store } from "../../Store";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fatchData = async () => {
      const category = await axios.get(`/api/admin/getcategory`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategoryList(category.data.categoryList);
    };
    fatchData();
  }, [userInfo.token]);

  return (
    <div style={{ marginLeft: "400px" }} className="category">
      <Sidebar />

      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate(`/category/addcategory`);
        }}
      >
        Create Category
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/category/update_category`);
        }}
      >
        Update Category
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/category/category_image_add`);
        }}
      >
        Category Image Add
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
        {console.log(categoryList)}
      {categoryList.map((item, index) => {
        return (
          <ul style={{ color: "#336699" }}>
            <li>
              <h1 key={index}>{item.name}</h1>
            </li>

            {item.children.map((eleement, index) => {
              return (
                <ul
                  style={{ marginLeft: "40px", color: "#cc6699" }}
                  key={index}
                >
                  <li>
                    {" "}
                    <h2>{eleement.name}</h2>{" "}
                  </li>
                  {eleement.children.map((ele, index) => {
                    return (
                      <ul
                        style={{ marginLeft: "40px", color: "#00b3b3" }}
                        key={index}
                      >
                        <li>
                          <h3>{ele.name}</h3>
                        </li>
                      </ul>
                    );
                  })}
                </ul>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Category;
