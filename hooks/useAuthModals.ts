import { useState } from 'react';

export const useAuthModals = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeAll = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return {
    loginOpen,
    registerOpen,
    openLogin,
    openRegister,
    closeAll
  };
};