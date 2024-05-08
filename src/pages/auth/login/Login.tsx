import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { useNavigate } from 'react-router-dom';
import { Boxes } from '@/components/background/BackgroundBoxes';
import { Button } from '@nextui-org/button';
import { user_backend, canisterId, idlFactory } from "@/declarations/user_backend";
import { _SERVICE } from '@/declarations/user_backend/user_backend.did';
import useLogin from '@/hooks/auth/login/useLogin';
// import { useUserStore } from '@/store/user/userStore';

// GA KEPAKE PAGE LOGIN

function LoginPage() {

  const { loginStatus, login } = useLogin();

  // const userStore = useUserStore();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (loginStatus.status === "not registered") {
  //     navigate("/register");
  //   }
  // }, [loginStatus])
  

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes></Boxes>
      <form className="animate-in flex flex-col md:w-1/5 gap-4 text-foreground z-10">
        {' '}
        <div className="flex justify-center items-center">
          <h1 className="text-white text-3xl">Login Form</h1>
        </div>
        <Button
          onClick={login}
          color="primary"
          className="relative overflow-hidden"
        >
          <img src='./assets/icp.png' className="w-10 h-10 object-cover" alt="Login" />
          Click Here to Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
