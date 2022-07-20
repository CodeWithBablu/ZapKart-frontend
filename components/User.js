import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
  const { user, error, isLoading } = useUser();

  if (!user) {
    return (
      <div className='cursor-pointer flex flex-col items-center -mt-4 mr-5 md:mr-10'>
        <Link href={'/api/auth/login'}>
          <div>
            <FaUserCircle className='text-3xl' />
          </div>
        </Link>
      </div>
    );
  }
  else {
    return (
      <Link href='/profile'>
        <div className='cursor-pointer flex flex-col items-center mt-1 mr-10 md:mr-20 w-7'>
          <img className='rounded-full' src={user.picture} alt="user.name" />
          <h3 className='text-xs md:text-base mt-1'>{(user.name).replace(/\s+/g, '_')}</h3>
        </div>
      </Link>
    );
  }

}