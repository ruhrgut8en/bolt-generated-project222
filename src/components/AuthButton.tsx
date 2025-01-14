import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { signIn, signOut } from '../lib/auth';
import { User } from '@supabase/supabase-js';

interface AuthButtonProps {
  user: User | null;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ user }) => {
  return (
    <button
      onClick={() => user ? signOut() : signIn()}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
    >
      {user ? (
        <>
          <LogOut className="w-4 h-4" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          Sign In
        </>
      )}
    </button>
  );
};
