import { userGetData, userGetIdentity, useUserStore } from '@/store/user/userStore';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const RootLayout = (props: Props) => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    userStore.getIdentity();
  }, []);

  useEffect(() => {
    console.log(userStore.data)
    if (userStore.is_auth) {
      const flag = userStore.getIdentity();
      if (!flag) {
        navigate("/register");
      }
      // if (userStore.data) {
      //   console.log("masuk 2")
      // }
    }

    // const printUser = async () => {
    //   console.log(await userGetData())
    // }
    // printUser();
  }, [userStore])

  return <Outlet />;
};

export default RootLayout;
