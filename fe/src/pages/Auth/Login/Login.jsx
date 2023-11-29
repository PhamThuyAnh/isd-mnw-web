import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { AuthReduxActions } from '../../../reduxSaga/Auth/AuthRedux';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function Login() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const notify = () => toast("login success!");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifyError = () => toast("wrong password or username!");
  const { control, setValue, register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    }
  });

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setValue('username', localStorage.getItem('username'));
      setValue('password', localStorage.getItem('password'));
    }
  }, [])

  const onSubmit = data => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/auth/login',
      data: data
    })
      .then(res => {
        if (res?.data?.accessToken) {
          notify();
          localStorage.setItem('token', res.data.accessToken);
          if (data.remember) {
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          dispatch(AuthReduxActions.setLoginStatus(true));
          navigate('/');
          axios.defaults.headers.common['Authorization'] = `Bearer ${res?.data?.accessToken}`
        } else {
          notifyError();
          dispatch(AuthReduxActions.setLoginStatus(false));
        }
      })
      .catch(error => console.log(error));
  };

  console.log(errors, 'error')

  return (
    <div style={{ width: '50%', margin: ' 30px auto 0 auto' }}>
      <p className='font-bold font-24'>Login Page</p>
      <Stack direction={'column'} gap={3}>
        <TextField
          required
          id="outlined-required"
          label="username"
          error={errors?.username?.message ? true : false}
          helperText={errors?.username?.message}
          {...register("username", { required: "username is required" })}
          autoComplete="off"
        />
        <TextField
          required
          id="outlined-required"
          type={'password'}
          label="password"
          autoComplete='off'
          error={errors?.password?.message ? true : false}
          helperText={errors?.password?.message}
          {...register("password", { required: "password is required" })}
        />
      </Stack>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControlLabel control={<Checkbox defaultChecked={localStorage.getItem('username')} {...register("remember")} />} label="Remember" />
        <div>
          <Link to='/forgot-password' style={{marginRight: '30px'}}>Forgot password</Link>
          <Link to='/signup'>Register account</Link>
        </div>
      </div>
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>Login</Button>
      <ToastContainer />
    </div>
  )
}

export default Login