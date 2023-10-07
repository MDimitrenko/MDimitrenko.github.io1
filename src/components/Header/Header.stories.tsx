import Header from './Header';
import { RouteDecorator } from '../../../.storybook/storyDecorators'

export default {
  component: Header,
  title: 'Header',
  tags: ['autodocs'],
  decorators: [RouteDecorator]
};
export const HeaderBlock = {
    args: {
    },
};