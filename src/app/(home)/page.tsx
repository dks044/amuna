import Image from 'next/image';
import AuthForm from './components/AuthForm';
import Opening from './components/Openning';

const Auth = () => {
  return (
    <div className='flex flex-col justify-center min-h-full py-12 grid-background sm:px-6 lg:px-8'>
      <Opening />
      <div className='flex mt-40 sm:mx-auto sm:w-full sm:max-w-md justify-center'>
        <div className='border-0 ring-1 ring-inset ring-gray-300 mt-6 text-3xl font-bold tracking-tighttext-center shadow-lg py-4 px-4 w-max bg-white sm:rounded-lg text-gray-900 '>
          AMUNA
        </div>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
