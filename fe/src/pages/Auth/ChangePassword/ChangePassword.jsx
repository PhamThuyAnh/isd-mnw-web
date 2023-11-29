import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messages } from '../../../utils/utils';
import Navbar from '../../Homepage/components/Navbar';

function ChangePassword() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const notify = () => toast("Change password successfully");
  const notifyError = () => toast("Wrong username or password");
  const navigate = useNavigate();
  const { control, formState: { errors }, setError, register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    }
  });
  const onSubmit = data => {
    if (data.newPassword !== data.confirmPassword) {
      setError('newPassword', { type: 'duplicate', message: 'Password entries do not match' });
      setError('confirmPassword', { type: 'duplicate', message: 'Password entries do not match' });
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:8000/v1/auth/change-password',
        data: data
      })
        .then(res => {
          if (res.status == 200) {
            notify();
            setTimeout(() => {
              navigate('/profile')
            }, 4000)
          }
        })
        .catch(error => {
          if (error?.response?.data?.errorCode == 2) {
            setError('email', { type: 'custom', message: error?.response?.data?.message });
          } else if (error?.response?.data?.errorCode == 3) {
            setError('username', { type: 'custom', message: error?.response?.data?.message });
          } else {
            notifyError()
          }
        });
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ width: '50%', margin: ' 100px auto 0 auto' }}>
        <p className='font-bold font-24'>Change Password Page</p>
        <Stack direction={'column'} gap={3}>
          <TextField
            required
            id="outlined-required"
            label="username"
            error={errors?.username?.message ? true : false}
            helperText={errors?.username?.message}
            {...register("username", { required: messages.required })}
          />
          <TextField
            required
            id="outlined-required"
            type={'password'}
            label="old password"
            error={errors?.oldPassword?.message ? true : false}
            helperText={errors?.oldPassword?.message}
            {...register("oldPassword", { required: messages.required })}
          />
          <TextField
            required
            id="outlined-required"
            type={'password'}
            label="new password"
            error={errors?.newPassword?.message ? true : false}
            helperText={errors?.newPassword?.message}
            {...register("newPassword", { required: messages.required })}
          />
          <TextField
            required
            id="outlined-required"
            type={'password'}
            label="confirm password"
            error={errors?.confirmPassword?.message ? true : false}
            helperText={errors?.confirmPassword?.message}
            {...register("confirmPassword", { required: messages.required })}
          />
        </Stack>
        <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleSubmit(onSubmit)}>Submit</Button>
        <ToastContainer />
      </div>
    </>
  )
}

export default ChangePassword