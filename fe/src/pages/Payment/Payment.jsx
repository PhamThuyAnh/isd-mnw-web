import React from 'react'
import Navbar from '../Homepage/components/Navbar'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { messages } from '../../utils/utils'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Footer from '../Homepage/components/Footer'

function Payment() {
  const [listProduct, setListProduct] = useState([]);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const [paymentMethod, setPaymethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const notify = () => toast("Thêm đơn hàng thành công");
  const { control, formState: { errors }, setError, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  });

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }

  useEffect(() => {
    let dataLocal = {}
    if (localStorage.getItem("data")) {
      dataLocal = JSON.parse(localStorage.getItem("data"));
    }
    if (!isObjectEmpty(dataLocal)) {
      console.log(dataLocal, 'dasdasdasdas')
      setListProduct(dataLocal?.cartOrder);
      let tempTotal = 0;
      dataLocal?.cartOrder?.forEach(ele => {
        tempTotal += ele?.price * ele?.quantity
      })
      setTotal(tempTotal)
      setDeliveryMethod(dataLocal?.deliveryMethod || 1);
      setPaymethod(dataLocal?.paymentMethod || 1);
      setValue("name", dataLocal?.name);
      setValue("date", dataLocal?.date);
      setValue("email", dataLocal?.email);
      setValue("phoneNumber", dataLocal?.phoneNumber);
      setValue("province", dataLocal?.province);
      setValue("ward", dataLocal?.ward);
      setValue("district", dataLocal?.district);
      setValue("detail", dataLocal?.detail);
    } else {
      axios({
        method: 'get',
        url: 'http://localhost:8000/v1/auth/profile',
        timeout: 20000,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          setListProduct(res.data?.cart);
          let tempTotal = 0;
          res?.data?.cart?.forEach(ele => {
            tempTotal += ele?.price * ele?.quantity
          })
          setTotal(tempTotal)
        })
    }
  }, []);

  const convertNumberToString = (number) => {
    let obj1 = new Intl.NumberFormat('en-US');
    let output = obj1.format(number);
    return output
  }

  const onSubmit = (value) => {
    if (!value.email.includes('@')) {
      setError('email', { type: 'validateEmail', message: 'email format: must include@' })
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:8000/v1/product/add-order',
        data: {
          ...value,
          cartOrder: listProduct,
          paymentMethod: paymentMethod,
          deliveryMethod: deliveryMethod
        }
      })
        .then(res => {
          if (res.data == "success") {
            notify();
            setTimeout(() => {
              navigate('/')
            }, 3200)
          }
        })
        .catch(error => {
          if (error?.response?.data?.errorCode == 2) {
            setError('email', { type: 'custom', message: error?.response?.data?.message });
          } else if (error?.response?.data?.errorCode == 3) {
            setError('username', { type: 'custom', message: error?.response?.data?.message });
          }
        });
    }
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div style={{ margin: '80px 100px 50px 100px', display: 'flex' }}>
        <div style={{ width: '60%' }}>
          <h2>Địa chỉ giao hàng</h2>
          <hr />
          <Stack direction={'row'} gap={3} sx={{ margin: '40px 0', width: '100%' }}>
            <TextField
              required
              id="outlined-required"
              sx={{ width: '50%' }}
              type={'text'}
              label="Họ và tên"
              error={errors?.name?.message ? true : false}
              helperText={errors?.name?.message}
              {...register("name", { required: messages.required })}
            />
            <TextField
              required
              id="outlined-required"
              type={'date'}
              sx={{ width: '50%' }}
              label="Ngày sinh"
              error={errors?.date?.message ? true : false}
              helperText={errors?.date?.message}
              {...register("date", { required: messages.required })}
            />
          </Stack>
          <Stack direction={'row'} gap={3} sx={{ margin: '40px 0', width: '100%' }}>
            <TextField
              required
              id="outlined-required"
              type={'email'}
              sx={{ width: '50%' }}
              label="email"
              error={errors?.email?.message ? true : false}
              helperText={errors?.email?.message}
              {...register("email", { required: messages.required })}
            />
            <TextField
              required
              id="outlined-required"
              type={'number'}
              sx={{ width: '50%' }}
              label="Số điện thoại"
              error={errors?.phoneNumber?.message ? true : false}
              helperText={errors?.phoneNumber?.message}
              {...register("phoneNumber", { required: messages.required })}
            />
          </Stack>
          <Stack direction={'row'} gap={3} sx={{ margin: '40px 0', width: '100%' }}>
            <TextField
              required
              id="outlined-required"
              type={'text'}
              sx={{ width: '32%' }}
              label="Tỉnh"
              error={errors?.province?.message ? true : false}
              helperText={errors?.province?.message}
              {...register("province", { required: messages.required })}
            />
            <TextField
              required
              id="outlined-required"
              type={'text'}
              sx={{ width: '32%' }}
              label="Quận huyện"
              error={errors?.district?.message ? true : false}
              helperText={errors?.district?.message}
              {...register("district", { required: messages.required })}
            />
            <TextField
              required
              id="outlined-required"
              type={'text'}
              sx={{ width: '32%' }}
              label="xã"
              error={errors?.ward?.message ? true : false}
              helperText={errors?.ward?.message}
              {...register("ward", { required: messages.required })}
            />
          </Stack>
          <Stack direction={'row'} gap={3} sx={{ margin: '40px 0', width: '100%' }}>
            <TextField
              required
              id="outlined-required"
              type={'text'}
              sx={{ width: '100%' }}
              label="chi tiết"
              error={errors?.detail?.message ? true : false}
              helperText={errors?.detail?.message}
              {...register("detail", { required: messages.required })}
            />
          </Stack>

          <h2>Hình thức Thanh Toán</h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
              onChange={(e) => setPaymethod(e.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Thanh toán khi nhận hàng" />
              <FormControlLabel value="2" control={<Radio />} label="Chuyển khoản" />
            </RadioGroup>
          </FormControl>
          {paymentMethod == 2 ?
            <div>
              <p>MB Bank</p>
              <p>Nguyen Trung Kien</p>
              <p>0971741041</p>
            </div>
            : <></>}
          <h2>Hình thức vận chuyển</h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <FormControlLabel value="2" control={<Radio />} label="Vận chuyển nhanh &nbsp;&nbsp;30.000 VND" />
              <FormControlLabel value="1" control={<Radio />} label="Vận chuyển thường &nbsp;&nbsp;15.000 VND" />
            </RadioGroup>
          </FormControl>
        </div>
        <div style={{ margin: '50px 0 0 50px', width: '40%' }}>
          {
            listProduct?.map(ele => {
              return <div style={{ display: 'flex', marginBottom: '20px', width: '100%' }}>
                <img src={ele.main_img} width={'60px'} />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ marginLeft: '20px' }}>
                    <h5 style={{ margin: '0' }}>{ele.name}</h5>
                    <h5 style={{ margin: '10px 0 0 0' }}>{ele.quantity}</h5>
                  </div>
                  <p style={{ color: '#f47245', fontWeight: 'bold' }}>{convertNumberToString(ele?.price * ele?.quantity)} VND</p>
                </div>
              </div>
            })
          }
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p>Tạm tính</p>
              <p style={{ color: '#f47245', fontWeight: 'bold' }}>{convertNumberToString(total)} VND</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p>Giảm giá</p>
              <p>0 VND</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p>vân chuyển</p>
              <p style={{ color: '#f47245', fontWeight: 'bold' }}>{convertNumberToString(deliveryMethod * 15000)} VND</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <p>Tổng cộng</p>
              <p style={{ color: '#f47245', fontWeight: 'bold', fontSize: '18px' }}>{convertNumberToString(total + deliveryMethod * 15000)} VND</p>
            </div>
            <Button onClick={handleSubmit(onSubmit)} variant="outlined" style={{ marginTop: '20px', width: '200px', background: '#664424', color: 'White', fontWeight: 'bold', height: '50px' }}>Đặt hàng</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment