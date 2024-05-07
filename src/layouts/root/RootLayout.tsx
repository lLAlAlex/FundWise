import { userGetData, userGetIdentity, useUserStore } from '@/store/user/userStore';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const RootLayout = (props: Props) => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    userGetIdentity();
  }, []);

  useEffect(() => {
    if (userStore.is_auth) {
        userGetData();
    } 
    console.log(userStore)
    // else {
    //   navigate("/login")
    // }
  }, [userStore])
  

  return <Outlet/>;
};

export default RootLayout;
