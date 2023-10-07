import { LoginUserForm } from './LoginUserForm';


export default {
  component: LoginUserForm,
  title: 'LoginUserForm',
  tags: ['autodocs'],
};

export const LoginUserFormInput = {
  args: {
    registration: false
  },
};

export const LoginUserFormReg = {
  args: {
    registration: true
  },
};
