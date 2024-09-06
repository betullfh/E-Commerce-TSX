import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../images/logo2.png'
import { useNavigate } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { BsFillSearchHeartFill } from "react-icons/bs";
import productService from '../services/ProductService';
import { InputBase, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { FaGripLines } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentuser, setdrawer, setProducts } from '../redux/appSlice';
import { ProductType } from '../types/Types';
import { toast } from 'react-toastify';
import { BsBasket2Fill } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { RootState } from '../redux/store';
import { setdrawerBasket } from '../redux/basketSlice';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";



function Navbar() {

    const [anchorElacc, setanchorElacc]=useState(null)
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {basket}= useSelector((state:RootState)=> state.basket)
    const [theme,settheme]=useState(true)
    const {currentUser}=useSelector((state:RootState)=>state.app)

    const toDark =()=>
      {
        const root =document.getElementById("root")
        if(root)
        {
          settheme(!theme)
        if(theme)
        {
          root.style.backgroundColor="darkgray"
          root.style.color="#fff"
        }
        else{
          root.style.backgroundColor="#fff"
          root.style.color="black"
        }
        }
      }
       
      
      const toLight =()=>
      {
        const root =document.getElementById("root")
       if(root)
       {
         
        if(theme)
          {
            root.style.backgroundColor="#3b3b3b"
            root.style.color="#fff"
          }
          else{
            root.style.backgroundColor="#fff"
            root.style.color="black"
          }
          settheme(!theme)
       }
      }

    const openAccount=(e:any)=>{
        setanchorElacc(e.currentTarget);
    }

    const closeAccount=()=>{
        setanchorElacc(null);
    }

    const openControl= anchorElacc ? true: false

    const logout=()=>{
        localStorage.removeItem("currentUser")
        dispatch(setCurrentuser(null))
        navigate("/login")
        closeAccount()
    }
    

    const handleFilter=async()=>{
      try {
        if(searchValue)
        {
          dispatch(filterProducts(searchValue))
        }
        else
        {
          const response: ProductType[]= await productService.getAllproducts()
          dispatch(setProducts(response))
        }
        
      } catch (error) {
        toast.error("Hata oluştu.")
      }
    }
    
    
  return (
    
    <AppBar sx={{backgroundColor:"red", marginBottom:"20px"}} position="static">
        
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={()=>navigate("/")}
      >
        <img src={logo} width={60} height={60} />
      </IconButton>
      <Typography className='title-navbar' onClick={()=>navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 , cursor:"pointer"}}>
        BULUT SITE
      </Typography>      
         <Stack direction="row" spacing={2}>
         <div style={{display:"flex", justifyContent:"center", alignItems:"center", border:"2px solid #fff", borderRadius:"10px", padding:"0px 20px"}}>
            <Button size='small' sx={{color:"#fff"}} onClick={()=>navigate("/")}>ANASAYFA</Button>
          </div>
            <div className="search-box">
             
                <InputBase                     
                    sx={{ ml: 3, flex: 1 ,  minWidth: "20px", marginLeft:"5px"}}
                    placeholder="Ne arıyorsunuz?"  onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setSearchValue(e.target.value)}                           
                    />
                    <Tooltip  title="ARA" placement='top'>
                    <IconButton>
                    <Button color="error" onClick={handleFilter}><BsFillSearchHeartFill style={{color:"#fff", fontSize:"22px", cursor:"pointer"}} /></Button>                                       
                        </IconButton>
                    </Tooltip>      
                        </div>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", border:"2px solid #fff", borderRadius:"10px", padding:"0px 20px 0px 20px"}}>
                            <FaGripLines/>
                        <Button size='small' sx={{color:"#fff"}} onClick={()=>dispatch(setdrawer())}>KATEGORİLER</Button>
                        </div>
                       
                       
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <Button>
                          {
                            theme ? 
                                  <MdDarkMode className='account'style={{fontSize:"33px"}} onClick={toLight}/>
                                :
                                  <MdOutlineLightMode className='account'style={{fontSize:"33px"}} onClick={toDark}/>
                        }
                          </Button>
                          <Button>
                            <Badge badgeContent={basket.length} color="primary">
                            <BsBasket2Fill onClick={()=>dispatch(setdrawerBasket())} style={{fontSize:"28px", padding:"2px"}} className='account'/>
                            </Badge>
                            </Button>
                            <Button>
                            <MdAccountBox style={{fontSize:"33px"}}  className='account' onClick={openAccount} />
                            </Button>
                       </div>
        </Stack>
         <Menu anchorEl={anchorElacc} open={openControl} onClose={closeAccount}>
          <MenuItem>Hesap: {currentUser?.username.toUpperCase()}</MenuItem>
          <MenuItem>Bakiye: {currentUser?.balance}</MenuItem>
          <MenuItem onClick={logout}>Çıkış Yap
          </MenuItem>
         </Menu>
    </Toolbar>
  </AppBar>
  
  )
}

export default Navbar