import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { RegisterPageSchemas } from '../schemas/RegisterPageSchemas';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RegisterPageService from '../services/RegisterPageService';


function RegisterPage() {

    const navigate= useNavigate()

   const submit = async(values: any, actions: any)=>{
    try {
        const payload: UserType={
            username: values.username,
            password: values.password,
            id: String(Math.floor(Math.random()*99999)),
            balance:2000
        }
        const response= await RegisterPageService.register(payload)
        if (response)
        {
            clear()
            toast.success("Kullanıcı kaydedildi.")
            navigate("/login")
        }
    } catch (error:any) {
        toast.error(error.message)
    }
   }
    const {values,errors,handleChange,handleSubmit, resetForm}  = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: submit,
        validationSchema: RegisterPageSchemas
      })

      const clear =()=>{
        resetForm()
      }

  return (
    <div className='register'>
        
       <div className='main'>
        
        <form onSubmit={handleSubmit}>
            <div className='form-div'>
            <h3 className='login-title'>Bir Hesap Edinin. </h3>
                    <TextField  sx={{marginBottom:"30px"}}
                    value={values.username}
                    onChange={handleChange}
                        id="username"
                        placeholder='Kullanıcı adı'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                                <FaUserCircle />
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard" 
                        color='warning'
                        helperText={errors.username && <span style={{color:"red"}}>{errors.username}</span>}
                    />
                    <TextField
                        id="password"
                        type='password'
                        placeholder='Şifre'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                                <FaLock/>
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard" 
                        color='warning'
                        value={values.password}
                        onChange={handleChange}
                        helperText={errors.password && <span style={{color:"red"}}>{errors.password}</span>}
                    />
                    <div style={{marginTop:"30px", display:"flex", justifyContent: "space-between", width: "100%"}}>
                        <Button type='submit'  sx={{backgroundColor:"#9e513c"}} size='small' variant='contained'>
                            Kayıt Ol
                        </Button>
                        <Button onClick={clear} size='small' variant='contained' color='inherit'>
                            Temizle
                        </Button>
                    </div>
                    <div className='to-login' style={{marginTop:"10px", display:"flex", justifyContent: "space-between", width: "100%", color:"blue", fontSize:"16px", cursor:"pointer"}} >
                  <p className='to-login' onClick={()=>navigate("/login")}>Zaten bir hesabınız var mı? </p>
                 </div>
            </div>
        </form>
       </div>
    </div>
  )
}

export default RegisterPage