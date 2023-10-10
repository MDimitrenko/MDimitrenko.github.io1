import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import s from './ChangeProfileForm.module.sass';
import '../../../style.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/store';
import { Operation, Profile, UpdateProfileBody } from '../../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchChangeProfile, fetchGetProfile } from '../../../reduxToolkit/authThunk';
import { VerificationInput } from '../../VerificationInput/VerificationInput';
import { WideButton } from '../../WideButton/WideButton';

interface СhangeProfileFormProps {
  name: string;
}

const ChangeProfileForm = () => {
  const { t } = useTranslation();
  const er = t`is_required`;
  const profile = useSelector<RootState, Profile>((state) => state.initSlice.profile);
  const showMessage = useSelector<RootState, boolean>((state) => state.messageSlise.showMessage);
  console.log(profile);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<СhangeProfileFormProps>({
    mode: 'onBlur',
    defaultValues: {
      name: profile?.name,
    },
  });

  const onСhangeProfile: SubmitHandler<СhangeProfileFormProps> = (value): void => {
    console.log(editProfile);
    if (!editProfile) {
      setEditProfile(!editProfile);
    }
    console.log(value);
    if (editProfile) {
      const updateProfileBody: UpdateProfileBody = {
        name: value.name,
      };
      dispatch(fetchChangeProfile(updateProfileBody));
    }
  };
  const [editProfile, setEditProfile] = useState(false);
  type AppDispatch = ThunkDispatch<Operation, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetProfile());
  }, []);

  return (
    <form className={s.form} onSubmit={handleSubmit(onСhangeProfile)}>
      <div className={s.title}>{t`ProfileScreen.updateProfile.title`}</div>
      <Controller
        control={control}
        name="name"
        rules={editProfile ? { required: er } : undefined}
        render={({ field }) => (
          <VerificationInput
            disabled={!editProfile}
            onChange={(date) => {
              console.log(date.target.value);
              field.onChange(date.target.value);
            }}
            title={t`ProfileForm.name.title`}
            inputValue={profile.name}
            placeholder={t`ProfileForm.name.placeholder`}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <VerificationInput
        disabled={true}
        title={t`ProfileForm.email.title`}
        inputValue={profile?.email}
        placeholder={t`ProfileForm.email.placeholder`}
      />

      <WideButton
        isSubmit={true}
        text={!editProfile ? t`ProfileScreen.updateProfile.edit` : t`ProfileScreen.updateProfile.save`}
      />
    </form>
  );
};
export default ChangeProfileForm;
