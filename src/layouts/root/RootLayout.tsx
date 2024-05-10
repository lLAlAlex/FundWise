import { project_backend } from '@/declarations/project_backend';
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
  const actor = project_backend

  useEffect(() => {
    userStore.getData();
  }, [])

  useEffect(() => {
    const seedProject = async () => {
      // console.log(await actor.getTotalProjectCount())
      if (await actor.getTotalProjectCount() == BigInt(0)) {
        actor.seedProjects();
      }
    }
    seedProject();
  }, [actor])

  useEffect(() => {
    // console.log(userStore)
    if (userStore.is_auth) {
      if (!userStore.data || userStore.data.length === 0) {
        return navigate('/register');
      }
    }
  }, [userStore])

  return <Outlet />;
};

export default RootLayout;
