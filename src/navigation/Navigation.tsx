import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OperationListScreen from '../screens/OperationListScreen/OperationListScreen';
import ProfileScreen from '../screens/ProfileScreen/Profile';
import HomeScreen from '../screens/HomeScreen/Home';
import NotFound from '../screens/NotFound';
import RegistrationScreen from '../screens/RegistrationScreen';
import AuthorizationScreen from '../screens/AuthorizationScreen';
import { TokenProvider } from '../TokenProvider'; // Импортируйте TokenProvider
import { ProtectedRoute } from './ProtectedRoute';
import { AddOperationForm } from '../components/Forms/addOperationForm/AddOperationForm';
import CategoryListScreen from 'src/screens/CategoryListScreen';

export const Navigation: React.FC = () => (
  <TokenProvider>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/store" element={<OperationListScreen />} />
      <Route path="/category" element={<CategoryListScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route
        path="/addProduct"
        element={
          <ProtectedRoute>
            <AddOperationForm />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<AuthorizationScreen />} />
      <Route path="/signup" element={<RegistrationScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TokenProvider>
);
