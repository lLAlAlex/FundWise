import { user_backend } from '@/declarations/user_backend';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { useUserStore } from '@/store/user/userStore';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const RootLayout = (props: Props) => {
  // const userStore = useUserStore();
  // const { auth, user, userStatus } = useAuthentication();
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    userStore.getData();
  }, [])
    

  useEffect(() => {
    console.log(userStore)
    if (userStore.is_auth) {
      if (!userStore.data) {
        return navigate('/register');
      }
    }
  }, [userStore])

  return <Outlet />;
};

export default RootLayout;
