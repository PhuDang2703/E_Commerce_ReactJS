import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ShowOnLogin = ({children}) => {
const isLoggedIn = useSelector(selectIsLoggedIn);

if(isLoggedIn){
    //Đang login thì show thằng log out
    return children;
}
  return null;
}


export const ShowOnLogout = ({children}) => {
const isLoggedIn = useSelector(selectIsLoggedIn);

if(!isLoggedIn){
    //Đang không không login (log out) thì show thằng login
    return children;
}
  return null;
}

export default ShowOnLogin