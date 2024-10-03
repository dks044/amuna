import AuthForm from './components/AuthForm';

const Auth = () => {
  return (
    <div className='flex flex-col justify-center min-h-full py-12 grid-background sm:px-6 lg:px-8'>
      <div className='flex sm:mx-auto sm:w-full sm:max-w-md justify-center'>
        <div className=' mt-6 text-3xl font-bold tracking-tight text-center shadow-lg py-4 px-4 w-max bg-white sm:rounded-lg text-gray-900 '>
          AMUNA
        </div>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
