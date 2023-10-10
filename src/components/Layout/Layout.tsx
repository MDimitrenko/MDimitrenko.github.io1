import React from 'react';
import s from './Layout.module.sass';
import Header from '../Header/Header';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/reduxToolkit/store';
import { Message } from 'src/reduxToolkit/app.types';
import MessageForm from 'src/components/Forms/MessageForm/MessageForm';
import { clearMessageErrors } from 'src/reduxToolkit/messageSlice';
import Theme from 'src/components/theme/Theme';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const showMessage = useSelector<RootState, boolean>((state) => state.messageSlise.showMessage);
  const message = useSelector<RootState, Message>((state) => state.messageSlise.message);
  const dispatch = useDispatch();
  return (
    <div className={s.layout}>
      <Header />
      <div style={{ position: 'absolute', top: '160px',
        left: 0, right: 0, bottom: 0, overflowY: 'scroll' }}>{children}</div>

      {showMessage &&
        createPortal(
          <Theme>
            <MessageForm
              text={message.text}
              caption={message.caption}
              errors={message.errors}
              onClickEvent={() => dispatch(clearMessageErrors())}
              messageType={message.messageType}
            />
          </Theme>,
          document.body
        )}
    </div>
  );
};

export default Layout;
