'use client'

import { LoginCallBack } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import { useOCAuth } from '@opencampus/ocid-connect-js';

export default function RedirectPage() {
  const router = useRouter();

  const loginSuccess = () => {
    router.push('/'); // Redirect after successful login check
  };

  const loginError = (error) => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent() {
  const { authState } = useOCAuth();
  return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
  return <div>Loading....</div>;
  }

  return (
    <LoginCallBack 
      errorCallback={loginError} 
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />} 
    />
  );
}