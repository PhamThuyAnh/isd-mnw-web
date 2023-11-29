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

function Signup() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const notify = () => toast("Successful account registration!");
  const navigate = useNavigate();
  const { control, formState: { errors }, setError, register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  });
  const onSubmit = data => {
    if (data.password !== data.confirmPassword) {
      setError('password', { type: 'duplicate', message: 'Password entries do not match' });
      setError('confirmPassword', { type: 'duplicate', message: 'Password entries do not match' });
    } else if (!data.email.includes('@')){
      setError('email', { type: 'validateEmail', message: 'email format: must include@' })
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:8000/v1/auth/signup',
        data: data
      })
        .then(res => {
          notify()
          setTimeout(()=> {
            navigate('/login')
          }, 4000)
        })
        .catch(error => {
          if(error?.response?.data?.errorCode == 2 ) {
            setError('email', { type: 'custom', message: error?.response?.data?.message});
          }else if(error?.response?.data?.errorCode == 3 ) {
            setError('username', { type: 'custom', message: error?.response?.data?.message});
          }
        });
    }
  };

  return (
    <div style={{ width: '50%', margin: ' 30px auto 0 auto' }}>
      <p className='font-bold font-24'>Register Page</p>
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
          label="email"
          error={errors?.email?.message ? true : false}
          helperText={errors?.email?.message}
          {...register("email", { required: messages.required })}
        />
        <TextField
          required
          id="outlined-required"
          type={'password'}
          label="password"
          error={errors?.password?.message ? true : false}
          helperText={errors?.password?.message}
          {...register("password", { required: messages.required })}
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
        <TextField
          required
          id="outlined-required"
          type={'number'}
          label="phone"
          error={errors?.phone?.message ? true : false}
          helperText={errors?.phone?.message}
          {...register("phone", { required: messages.required })}
        />
        <TextField
          required
          id="outlined-required"
          label="address"
          error={errors?.address?.message ? true : false}
          helperText={errors?.address?.message}
          {...register("address", { required: messages.required })}
        />
      </Stack>
      <div style={{ margin: '10px 0' }}>
        <Link to='/login'>Login</Link>
      </div>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>Register</Button>
      <ToastContainer />
    </div>
  )
}

export default Signup