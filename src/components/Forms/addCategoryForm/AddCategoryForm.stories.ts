import { AddCategoryForm } from './AddCategoryForm';
import s from './AddProductionForm.module.sass';

export default {
  component: AddCategoryForm,
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
