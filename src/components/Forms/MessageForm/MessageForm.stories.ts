import { MessageForm } from './MessageForm';
import s from './MessageForm.module.sass';
import { useTheme } from '../../theme/Theme';
import { RouteDecorator } from '../../../../.storybook/storyDecorators';

export default {
  component: MessageForm,
  title: 'MessageForm',
  tags: ['autodocs'],
  decorators: [RouteDecorator],
};

export const MessageFormInfo = {
  args: {
    caption: 'Редактирование профиля',
    text: 'Профиль успешно изменен',
    messageType: 'Info',
    onClickEvent: () => console.log('dd'),
    // errors?: ServerErrors;
  },
};

export const MessageFormError = {
  args: {
    caption: 'Редактирование профиля',
    messageType: 'Error',
    errors: {
      errors: [
        {
          name: 'IncorrectPasswordError',
          stack:
            'MongooseError: Incorrect password\n    at IncorrectPasswordError.ServerErrors (/root/src/Errors.ts:46:56)\n    at new IncorrectPasswordError (/root/src/Errors.ts:85:5)\n    at /root/src/rest/profile/changePassword.ts:14:33\n    at step (/root/build/rest/profile/changePassword.js:33:23)\n    at Object.next (/root/build/rest/profile/changePassword.js:14:53)\n    at /root/build/rest/profile/changePassword.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/root/build/rest/profile/changePassword.js:4:12)\n    at changePassword (/root/src/rest/profile/changePassword.ts:9:6)\n    at Layer.handle [as handle_request] (/root/node_modules/express/lib/router/layer.js:95:5)',
          message: 'Incorrect password',
          extensions: {
            code: 'ERR_INCORRECT_PASSWORD',
          },
        },
        {
          name: 'Просто тест',
          stack:
            'MongooseError: Incorrect password\n    at IncorrectPasswordError.ServerErrors (/root/src/Errors.ts:46:56)\n    at new IncorrectPasswordError (/root/src/Errors.ts:85:5)\n    at /root/src/rest/profile/changePassword.ts:14:33\n    at step (/root/build/rest/profile/changePassword.js:33:23)\n    at Object.next (/root/build/rest/profile/changePassword.js:14:53)\n    at /root/build/rest/profile/changePassword.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/root/build/rest/profile/changePassword.js:4:12)\n    at changePassword (/root/src/rest/profile/changePassword.ts:9:6)\n    at Layer.handle [as handle_request] (/root/node_modules/express/lib/router/layer.js:95:5)',
          message: 'Просто тест',
          extensions: {
            code: 'ERR_TEST',
          },
        },
      ],
    },
    onClickEvent: () => console.log('dd'),
    // errors?: ServerErrors;
  },
};
