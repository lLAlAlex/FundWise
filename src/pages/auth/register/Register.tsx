import { useState, useEffect } from 'react';
import { user_backend, createActor } from '@/declarations/user_backend';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import { Button } from '@nextui-org/button';
import Header from '@/components/navigations/Header';
import { useUserStore } from '@/store/user/userStore';

function RegisterPage() {
  const { auth, user } = useAuthentication();
  const [errorMsg, setErrorMsg] = useState('');
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    timestamp: '',
    profile: '',
    description: '',
    location: '',
    contact: '',
    status: '',
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const principal = identity.getPrincipal();

    if (!formData.name || !formData.email) {
      setErrorMsg('All fields must be filled');
    } else if (principal.toString() === '2vxsx-fae') {
      return;
    } else {
      formData.profile =
        'https://res.cloudinary.com/dogiichep/image/upload/v1691980787/profile_xy1yuo.png';
      console.log(formData);
      const res = await user_backend.register(
        principal,
        formData.name,
        formData.email,
        formData.profile,
        formData.dob,
        formData.location,
        formData.contact,
      );
      if ("ok" in res) {
        // console.log('OK')
        await userStore.getData();
        return navigate('/');
      } else {
        setErrorMsg(res.err);
      }
      // console.log(await user_backend.register(principal, formData.name, formData.email, formData.profile, formData.dob, formData.location, formData.contact))
    }
  };

  useEffect(() => {
    if (auth) {
      if (user) {
        return navigate('/');
      }
    }
  }, [user]);

  return (
    <section className="bg-white ">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="shadow-lg max-h-[80vh] overflow-y-auto max-w-[400px] w-full min-w-[300px] bg-white  rounded-lg shadow border md:mt-0  xl:p-0 border-tranparent-black">
          <div className="p-6 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl w-full text-center">
              Register
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder="John Doe"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder="name@company.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  onChange={handleChange}
                  value={formData.dob}
                />
              </div>
              <div>
                <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder="Indonesia"
                  onChange={handleChange}
                  value={formData.location}
                />
              </div>
              <div>
                <label htmlFor="text" className='block mb-2 text-sm font-medium text-gray-900'>
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                  placeholder="+62xxxxxxxxxxx"
                  onChange={handleChange}
                  value={formData.contact}
                />
              </div>
              <div className='text-red-500 text-xs font-bold'>
                {errorMsg}
              </div>
              <div className='w-full text-end'>
                <Button type="submit" onClick={handleSubmit} className='text-end text-xs bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white'>
                  Create an account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
