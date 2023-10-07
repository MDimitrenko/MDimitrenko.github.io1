import React from 'react';
import s from './YesAuthorization.module.sass';
import ExitButton from './ExitButton/ExitButton';

const YesAuthorization = () => {
  return (
    <div className={s.panel}>
      <ExitButton />
    </div>
  );
};

export default YesAuthorization;
