import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { RegisterPageSchemas } from '../schemas/RegisterPageSchemas';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
import loginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentuser, setloading } from '../redux/appSlice';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';


interface CheckUserType {
  currentUser: UserType |null ,
  result: boolean
}

function LoginPage() {

  const navigate=useNavigate()
  const dispatch=useDispatch()


  const checkUser=(UserList:UserType[], username:string, password: string): CheckUserType=>{
     const response: CheckUserType ={result: false, currentUser: null}

     UserList.forEach((user: UserType)=>{
        if(username===user.username && password===user.password)
        {
          response.result=true
          response.currentUser=user
        }
     })
     return response
  }


  const submit= async()=>{
    try 
    {
      dispatch(setloading(true))
      const response: UserType[] = await loginPageService.login()
      if(response)
      {
        const checkUserResponse: CheckUserType=checkUser(response, values.username, values.password)
        if(checkUserResponse.currentUser && checkUserResponse.result)
        {
          dispatch(setCurrentuser(checkUserResponse.currentUser))
          localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
          navigate("/")
          toast.success("Giriş başarılı.")
        }
        else
        {
          toast.error("Kullanıcı adı veya şifre hatalı.")
        }
        
      }
    }
    catch (error) {
      toast.error("Hatalı giriş " + error)
    }

    finally{
     dispatch(setloading(false))
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
    <div className='login'>
    <div className='main'>
     <form onSubmit={handleSubmit}>
      
         <div className='form-div'>
          
          <h3 className='login-title'>Hoşgeldiniz! Lütfen Giriş Yapınız. </h3>
        
         
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
                         Giriş Yap
                     </Button>
                     <Button onClick={clear} size='small' variant='contained' color='inherit'>
                         Temizle
                     </Button>
                 </div>
                 <div className='to-register' style={{marginTop:"10px", display:"flex", justifyContent: "space-between", width: "100%", color:"blue", fontSize:"16px", cursor:"pointer"}} >
                  <p className='to-register' onClick={()=>navigate("/signup")}>Hesabınız Yok mu? Kaydolun.</p>
                 </div>
         </div>
     </form>
    </div>
 </div>
  )
}

export default LoginPage