import { AdUnits, Visibility, VisibilityOff } from '@mui/icons-material';
import {
 Button,
 createTheme,
 IconButton,
 InputAdornment,
 TextField,
 ThemeProvider,
} from '@mui/material';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { title, useNavigation } from '../utils/helperFucntions';

import logo from '../assets/images/Logo.png';

import classes from './Login.module.css';
import { drawerActions } from '../store/drawer/drawerSlice';
import { useLocation } from 'react-router-dom';
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isError, setIsError] = useState(false);
 const [isEmpty, setIsEmpty] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [errors, setErrors] = useState([]);

 const dispatch = useDispatch();

 const { navigateTo } = useNavigation();
 const location = useLocation();
 const redirectAfterLogin = useSelector(
  state => state.drawerStore.redirectAfterLogin,
 );
 const token = useSelector(state => state.userStore.token);

 const googleLogin = useGoogleLogin({
  onSuccess: token => console.log(token),
  flow: 'auth-code',
  login_hint: '',
 });

 const inputStyles = {
  m: '0.5rem 0',
  width: '100%',

  '& .MuiInputBase-root': {
   '& fieldset': {
    borderColor: '#000',
   },
  },
  '& .MuiInputBase-input': {
   color: 'rgb(0, 0, 0)',
   fontSize: '16px',
   direction: 'rtl',
   '&::placeholder': {
    color: 'black',
    opacity: 1,
   },
  },
  '& .MuiInputLabel-root': {
   color: 'gray',
   fontSize: '14px',
   '&.Mui-focused': {
    color: 'black',
   },
  },
  '& .Mui-focused .MuiInputLabel-root': {
   color: 'black',
   transform: 'translate(0, -5px) scale(0.75)',
  },
  '& .Mui-focused .MuiInputBase-root': {
   '& fieldset': {
    borderColor: 'black',
   },
  },
 };

 const rtlTheme = createTheme({
  direction: 'rtl',
  components: {
   MuiTextField: {
    defaultProps: {
     sx: {
      textAlign: 'right',
      direction: 'rtl',
     },
    },
   },
  },
 });

 const handleGetScore = value => {
  try {
   //    console.log(value);
  } catch (error) {
   // console.error('Error getting reCAPTCHA score:', error);
  }
 };

 const handleCloseModal = () => {
  //   dispatch(accesModalActions.close());
 };

 const handleOpenSignup = () => {
  navigateTo('/register');
 };

 const handleOpenOtp = () => {
  //   dispatch(accesModalActions.otp());
 };

 const handleLogin = async () => {};

 useEffect(() => {
  title('لایکو-ورود');
 }, []);

 useEffect(() => {
  if (token) {
   const redirectTo = location.state?.from || redirectAfterLogin || '/';
   navigateTo(redirectTo);
   dispatch(drawerActions.clearRedirectAfterLogin());
  }
 }, [token, navigateTo, location, redirectAfterLogin]);

 return (
  <div className={classes.bg}>
   <div className={classes.content_wrapper}>
    <div className={classes.sheet}>
     <div className={classes.logo_wrapper}>
      <img className={classes.logo} src={logo} alt='' loading='lazy' />
     </div>
     <div className={classes.login_wrapper}>
      <div className={classes.actions}>
       <div className={classes.ep}>
        <ThemeProvider theme={rtlTheme}>
         <TextField
          id='outlined-emial-input'
          label={'ایمیل'}
          type='Email'
          size='small'
          sx={{
           ...inputStyles,
           textAlign: 'right',
           direction: 'rtl',
          }}
          onChange={e => setEmail(e.target.value)}
         />
         <TextField
          id='outlined-password-input'
          label={'رمز ورود'}
          type={showPassword ? 'text' : 'password'}
          size='small'
          sx={{
           ...inputStyles,
          }}
          InputProps={{
           endAdornment: (
            <InputAdornment position='end'>
             <IconButton
              aria-label='show'
              style={{ width: '20px', height: 'auto' }}
              onClick={() => setShowPassword(!showPassword)}
              disableRipple>
              {showPassword ? (
               <Visibility fontSize='5' />
              ) : (
               <VisibilityOff fontSize='5' />
              )}
             </IconButton>
            </InputAdornment>
           ),
          }}
          onChange={e => setPassword(e.target.value)}
         />
         {Object.keys(errors).length > 0 &&
          Object.values(errors).map(el => {
           //  console.log(el);
           return (
            <div className={classes.error_text} style={{ direction: 'rtl' }}>
             {el}
            </div>
           );
          })}
         {isError && (
          <div className={classes.error_text} style={{ direction: 'rtl' }}>
           {'خطایی وجو دارد لطفا دوباره تلاش کنید'}
          </div>
         )}
         {isEmpty && (
          <div className={classes.error_text} style={{ direction: 'rtl' }}>
           {'لطفا موارد بالا پر کنید'}
          </div>
         )}
        </ThemeProvider>
       </div>

       <ReCAPTCHA
        sitekey={`${process.env.REACT_APP_GOOGLE_RECAPTCHA_CLIENT_ID}`}
        className={classes.rec}
        onChange={handleGetScore}
        style={{ width: '100%' }}
       />

       <Button
        variant='contained'
        size='large'
        className={classes.login_btn}
        onClick={handleLogin}>
        {'ورود'}
       </Button>

       <div className={classes.oneclick_login_wrapper}>
        <div className={classes.google_login_wrapper}>
         <GoogleLogin
         //  onSuccess={e => getUserTokenGoogle(e.credential)}
         ></GoogleLogin>
         {/* <IconButton
         className={classes.mobile_login}
         disableRipple
         onClick={() => googleLogin()}>
         <Google sx={{ fontSize: '20px !important' }} />
         <p>{t('access.swg')}</p>
        </IconButton> */}
        </div>
        <div className={classes.google_login_wrapper} onClick={handleOpenOtp}>
         <IconButton className={classes.mobile_login} disableRipple>
          <AdUnits sx={{ fontSize: '20px !important' }} />
          <p>ورود با رمز یکبار مصرف</p>
         </IconButton>
        </div>
       </div>
       <div className={classes.signup_link} style={{ direction: 'rtl' }}>
        <p>حساب کاربری ندارید؟ </p>&nbsp;
        <button onClick={handleOpenSignup}>ورود</button>
        &nbsp;
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Login;
