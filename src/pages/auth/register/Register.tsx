import { useState, useEffect } from 'react';
import { user_backend, createActor } from '@/declarations/user_backend';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '@/hooks/auth/get/useAuthentication';
import styles from './Register.module.css';
import { Button } from '@nextui-org/button';

function RegisterPage() {
  const { auth, user } = useAuthentication();
  const [errorMsg, setErrorMsg] = useState('');
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
      await user_backend.register(
        principal,
        formData.name,
        formData.email,
        formData.profile,
        formData.dob,
        formData.location,
        formData.contact,
      );
      // console.log(await user_backend.register(principal, formData.name, formData.email, formData.profile, formData.dob, formData.location, formData.contact))
      return navigate('/');
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          FundWise
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="text" className={styles.label}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={styles.input}
                  placeholder="John Doe"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div>
                <label htmlFor="email" className={styles.label}>
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.input}
                  placeholder="name@company.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label htmlFor="email" className={styles.label}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className={styles.input}
                  onChange={handleChange}
                  value={formData.dob}
                />
              </div>
              <div>
                <label htmlFor="text" className={styles.label}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className={styles.input}
                  placeholder="Indonesia"
                  onChange={handleChange}
                  value={formData.location}
                />
              </div>
              <div>
                <label htmlFor="text" className={styles.label}>
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  className={styles.input}
                  placeholder="+62xxxxxxxxxxx"
                  onChange={handleChange}
                  value={formData.contact}
                />
              </div>
              <Button type="submit" onClick={handleSubmit}>
                Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleSubmit}
      >
        Create an account
      </button> */}
    </section>
  );
}

export default RegisterPage;
