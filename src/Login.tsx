import { useState, useEffect } from 'react';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';
import { Boxes } from '@/components/BackgroundBoxes';
import { Button } from '@nextui-org/button';

function Login() {
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      return navigate('/');
    }

    const initializeAuthClient = async () => {
      try {
        const authClient = await AuthClient.create();
        const isAuthenticated = await authClient.isAuthenticated();
        setAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Error initializing auth client:', error);
      }
    };
    initializeAuthClient();
  }, []);

  const handleLogin = async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: () => {
          setAuthenticated(true);
        },
      });
      return navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

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
          onClick={handleLogin}
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

export default Login;
