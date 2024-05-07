import { user_backend } from '@/declarations/user_backend';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { userGetData, userGetIdentity, useUserStore } from '@/store/user/userStore';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const RootLayout = (props: Props) => {
  // const userStore = useUserStore();
  const { auth, user } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      if (!user) {
        return navigate('/register');
      }
    }
  }, [user])

  return <Outlet />;
};

export default RootLayout;
