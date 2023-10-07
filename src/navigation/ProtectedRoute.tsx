import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useTokenContext } from 'src/TokenProvider';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const [token, isAdmin] = useTokenContext();

  if (token && isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" replace />;
  }
};
