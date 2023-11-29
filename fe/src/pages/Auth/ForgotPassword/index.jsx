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

function ForgotPassword() {
  useEffect(()=> {
    localStorage.setItem('data', '')
  },[])
  const notify = (message) => toast(message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifyError = (message) => toast(message);
  const { control, setValue, register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      email: '',
    }
  });

  const onSubmit = data => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/v1/auth/mail',
      data: data
    })
      .then(res => {
        notify(res.data);
      })
      .catch(error => {
        notifyError(error.response.data)
      });
  };;

  console.log(errors, 'error')

  return (
    <div style={{ width: '50%', margin: ' 30px auto 0 auto' }}>
      <p className='font-bold font-24'>Forgot Password Page</p>
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
          type={'email'}
          label="email"
          autoComplete='off'
          error={errors?.email?.message ? true : false}
          helperText={errors?.email?.message}
          {...register("email", { required: "email is required" })}
        />
      </Stack>
      <div style={{marginTop: '10px'}}>
          <Link to='/login'>Login</Link>
        </div>
      <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{marginTop: '20px'}}>Submit</Button>
      <ToastContainer />
    </div>
  )
}

export default ForgotPassword