import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from 'react-router-dom';

const convertNumberToString = (number) => {
  let obj1 = new Intl.NumberFormat('en-US');
  let output = obj1.format(number);
  return output
}

function createData(name, quantity, total, status, cart, data) {
  return {
    name,
    quantity,
    total,
    status,
    cart,
    data
  };
}

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;
  console.log(row,'row')
  const [open, setOpen] = React.useState(false);
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/auth/profile',
    })
      .then(res => {
        setCartData(res.data.order);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right"><AutorenewIcon onClick={()=> {
          localStorage.setItem('data', JSON.stringify(row?.data));
          navigate("/payment")
        }}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Cart
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: 'bold', borderBottom: 'none'}}>Name</TableCell>
                    <TableCell style={{fontWeight: 'bold', borderBottom: 'none'}}>Price</TableCell>
                    <TableCell style={{fontWeight: 'bold', borderBottom: 'none'}} align="right">Quantity</TableCell>
                    <TableCell style={{fontWeight: 'bold', borderBottom: 'none'}} align="right">Total(VND )</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.cart?.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell style={{borderBottom: 'none'}} component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell style={{borderBottom: 'none'}}>{convertNumberToString(historyRow.price)+ ' VND'}</TableCell>
                      <TableCell style={{borderBottom: 'none'}} align="right">{historyRow.quantity}</TableCell>
                      <TableCell style={{borderBottom: 'none'}} align="right">{convertNumberToString(historyRow.price * historyRow.quantity) + ' VND'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function TableOrder() {
  const [orderData, setOrderData] = React.useState([]);
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/auth/profile',
    })
      .then(res => {
        let tempOrderData = res.data.order.map((ele, index) => {
          let totalPrice = 0;
          let totalQuantity = 0;
          ele.cartOrder.forEach(ele => {
            totalPrice += ele.price * ele.quantity
            totalQuantity += ele.quantity
          })
          return createData(index + 1, totalQuantity, convertNumberToString(totalPrice) + ' VND', 'chưa thanh toán', ele.cartOrder, ele)
        })
        setOrderData(tempOrderData);
        setCartData(res.data.order.cartOrder);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontWeight: 'bold'}}>Stt</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>Số lượng product</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>Tổng tiền</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>Tình trạng thanh toán</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>Đặt hàng lại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}