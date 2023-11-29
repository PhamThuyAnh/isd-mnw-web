import React, { useEffect } from "react";
import {
  FlexBetweenCenter,
  FlexNoneCenter,
} from "../../../components/styleComponent";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AuthReduxActions } from "../../../reduxSaga/Auth/AuthRedux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const handleLogout = () => {
    dispatch(AuthReduxActions.setLoginStatus(false));
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    axios(
      {
        method: "get",
        url: "http://localhost:8000/v1/product/get-all-product",
        timeout: 20000,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      let dataSearch = res?.data?.map((ele) => {
        ele.label = ele.name;
        ele.value = ele._id;
        return ele;
      });
      setDataProduct(dataSearch);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let data = dataProduct.find((ele) => ele.name == e.target.value);
      if (data && data._id) {
        navigate("/product/detail/" + data._id);
      }
    }
  };

  return (
    <NavContainer>
      <FlexBetweenCenter style={{ margin: "0 30px" }}>
        <FlexNoneCenter>
          <div style={{ width: "50px" }}>
            <img
              height={40}
              src="https://miniwooddesign.com/assets/images/miniwood-logo.png"
              alt="#"
            />
          </div>
          <FlexNoneCenter style={{ marginLeft: "50px" }}>
            <PTag onClick={() => navigate("/")}>Trang chủ</PTag>
            <PTag onClick={() => navigate("/product")}>Sản phẩm</PTag>
            <PTag onClick={() => navigate("/order")}>Đơn hàng</PTag>
          </FlexNoneCenter>
        </FlexNoneCenter>
        <Stack direction={"row"} gap={3}>
          <Autocomplete
            onKeyDown={(e) => handleSearch(e)}
            disablePortal
            id="combo-box-demo"
            options={dataProduct}
            sx={{
              width: 300,
              height: "30px",
              fontFamily: "Roboto",
              "& .MuiOutlinedInput-root": {
                padding: 0,
              },
              "& #combo-box-demo-label": {
                top: "-8px",
              },
            }}
            onChange={(e) => setCurrentSearch(e)}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
          <ShoppingCartIcon
            onClick={() => navigate("/cart")}
            style={{ fontSize: "30px" }}
          />
          <Link to="/profile" style={{ color: "unset" }}>
            <PersonIcon style={{ fontSize: "30px" }} />
          </Link>
          <LogoutIcon style={{ fontSize: "30px" }} onClick={handleLogout} />
        </Stack>
      </FlexBetweenCenter>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.div`
  height: 60px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  z-index: 1000;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const PTag = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-left: 45px;
  &:hover {
    color: rgb(93, 46, 3);
  }
`;
