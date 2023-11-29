import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messages } from '../../../utils/utils';
import { AuthReduxActions } from '../../../reduxSaga/Auth/AuthRedux';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../Homepage/components/Navbar';
import Footer from '../../Homepage/components/Footer';

function Profile() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const notify = () => toast("edit profile successfully!");
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false)
  const [profileData, setProfileData] = useState({
    email: '',
    username: '',
    address: '',
    phone: '',
  })
  const { control, formState: { errors }, setValue, setError, register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      username: '',
      address: '1',
      phone: '1',
    }
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/v1/auth/profile',
    })
      .then(res => {
        setProfileData(res.data);
        setValue('phone', res.data.phone);
        setValue('address', res.data.address);
      })
      .catch(error => console.log(error));
  }, [])

  const onSubmit = data => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/auth/profile',
      data: data
    })
      .then(res => {
        if (res.status == 200) {
          notify();
          setIsEdit(false);
        }
      })
      .catch(error => { console.log(error, 'error') });
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '50%', margin: ' 100px auto 100px auto' }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <p className='font-bold font-24'>Profile <span style={{ margin: ' -2px 0 0 20px' }}><EditIcon onClick={() => setIsEdit(!isEdit)} /></span></p>
          <Link to={'/change-password'}>Change password</Link>
        </div>
        <Stack direction={'column'} gap={3}>
          <TextField
            required
            id="outlined-required"
            label="username"
            value={profileData?.username}
            disabled
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'black',
              }
            }}
            {...register("username")}
          />
          <TextField
            required
            id="outlined-required"
            label="email"
            value={profileData?.email}
            disabled
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'black',
              }
            }}
            {...register("email")}
          />
          <TextField
            disabled={!isEdit}
            required
            id="outlined-required"
            type={'number'}
            label="phone"
            defaultValues={profileData?.phone}
            error={errors?.phone?.message ? true : false}
            helperText={errors?.phone?.message}
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'black',
              }
            }}
            {...register("phone", { required: messages.required })}
          />
          <TextField
            required
            disabled={!isEdit}
            id="outlined-required"
            label="address"
            error={errors?.address?.message ? true : false}
            helperText={errors?.address?.message}
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'black',
              }
            }}
            {...register("address", { required: messages.required })}
          />
        </Stack>
        {isEdit ? <Button sx={{ marginTop: '20px' }} variant="contained" onClick={handleSubmit(onSubmit)}>Update</Button> : <></>}
        <ToastContainer />
      </div>
      <Footer />
    </>
  )
}

export default Profile