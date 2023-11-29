import React, { useEffect, useState } from 'react'
import Navbar from '../Homepage/components/Navbar'
import axios from 'axios'
import { Pagination } from '@mui/material'
import Footer from '../Homepage/components/Footer'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom'


function Product() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = useState({});
  const [colorText, setColor] = useState();
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])

  const handleClick = () => {
    setOpen(!open);
  };
  const [dataProduct, setDataProduct] = useState([])
  useEffect(() => {
    const querySearch = '?' + new URLSearchParams(query).toString();
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/product/get-all-product' + querySearch,
      timeout: 20000,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setDataProduct(res.data)
      })
  }, [query]);

  let changeListProductByCategory = (type) => {
    let tempQuery = JSON.parse(JSON.stringify(query));
    tempQuery.category = type
    setQuery(tempQuery);
    if (type == colorText) {
      tempQuery.category = ''
      setQuery(tempQuery);
      setColor(0)
    } else {
      setColor(type)
    }
  }

  const convertNumberToString = (number) => {
    let obj1 = new Intl.NumberFormat('en-US');
    let output = obj1.format(number);
    return output
  }
  return (
    <>
      <div style={{ margin: '80px 100px 0 100px' }}>
        <Navbar />
        <h2 style={{ textAlign: 'center' }}>Tất cả sản phẩm</h2>
        <p style={{ textAlign: 'center' }}>Set quà tại Miniwood là tập hợp của những món phụ kiện gỗ độc đáo, phụ hợp làm quà tặng cá nhân, quà tặng doanh nghiệp.</p>
        <div style={{ display: 'flex' }}>
          <List
            style={{ borderTop: 'none', margin: '30px 20px 0 0' }}
            sx={{ width: '18%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" style={{ background: '#ffffff', color: 'Black', fontWeight: 'bold' }}>
                DANH MỤC SẢN PHẨM
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Danh mục" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} style={{ background: colorText == 1 ? '#DCDCDC' : '' }}>
                  <ListItemText primary="Set quà" onClick={() => changeListProductByCategory(1)} />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} style={{ background: colorText == 2 ? '#DCDCDC' : '' }}>
                  <ListItemText primary="Ốp điện thoại Iphone" onClick={() => changeListProductByCategory(2)} />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} style={{ background: colorText == 3 ? '#DCDCDC' : '' }}>
                  <ListItemText primary="Ốp điện thoại samsung" onClick={() => changeListProductByCategory(3)} />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} style={{ background: colorText == 4 ? '#DCDCDC' : '' }}>
                  <ListItemText primary="Phụ kiện" onClick={() => changeListProductByCategory(4)} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <div style={{ width: '70%' }}>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
              {dataProduct?.map((ele) => (
                <div style={{ width: '33%' }}>
                  <img onClick={() => navigate(`detail/${ele._id}`)} width='100%' src={ele.main_img_border || ele.main_img} alt='' style={{ borderRadius: '20px' }} />
                  <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{ele?.name}</p>
                  <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', color: '#FAB69E' }}>{convertNumberToString(ele?.price)} VND</p>
                </div>
              ))}
            </div>
            <Pagination count={1} shape="rounded" sx={{ margin: '20px 40%' }} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Product