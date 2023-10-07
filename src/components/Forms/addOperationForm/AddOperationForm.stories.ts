import { AddOperationForm } from './AddOperationForm';
import s from './AddProductionForm.module.sass';

export default {
  component: AddOperationForm,
  title: 'AddProductionForm',
  tags: ['autodocs'],
};

export const AddProduction = {
  args: {
    category: '',
    productionName: '',
    shortDefinition: '',
    definition: '',
    price: 0,
    // images: [

    // ],
  },
};
