import React, { FC } from 'react';
import style from './MessageForm.module.sass';
import { ServerErrors } from '../../../reduxToolkit/app.types';
import { BasicButton } from '../../basicButton/BasicButton';
import { Modal } from '../../Modal/Modal';

export type MessageFormProps = {
  caption?: string;
  text?: string;
  messageType: 'Error' | 'Info';
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
  errors?: ServerErrors;
};

export const MessageForm: FC<MessageFormProps> = ({ caption, text, onClickEvent, errors, messageType}) => {
  const createContent = () => {
    const content = [];
    let j = 0;
    while (j < errors?.errors.length) {
      content.push(
        <div>
          <label key={j}>
            {errors.errors[j].extensions.code}: {errors.errors[j].message}
          </label>
        </div>
      );

      j = j + 1;
    }
    return content;
  };

  const content = createContent();
  return (
    <Modal>
      <div className={style.message_content}>
        {caption && <label className={style.message_caption}>{caption}</label>}
        <div className={style.message_text_context}>
          <img
            src={require(messageType === 'Error' ? `../../../images/icon-error.png` : `../../../images/icon-ok.png`)}
            width="40px"
            height="40px"
          />
          <div className={style.message_text}>
            {text && <label>{text}</label>}
            {errors && content}
          </div>
        </div>
        <div className={style.div_button}>
          <BasicButton onClick={onClickEvent} text="OK" />
        </div>
      </div>
    </Modal>
  );
};
export default MessageForm;
