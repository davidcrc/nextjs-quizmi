'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';

type SignInButtonProps = { text: string };

const SignInButton = ({ text }: SignInButtonProps) => {
  const handleSignIn = () => {
    signIn('google').catch(console.error);
  };

  return <Button onClick={handleSignIn}>{text}</Button>;
};

export default SignInButton;
