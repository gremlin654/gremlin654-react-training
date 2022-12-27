import React, { ChangeEvent, useState, useEffect, useContext } from 'react';
import { IUserFormProps, FormData } from 'types/types';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GlobalData } from 'context/context';
import { ACTION_TYPE } from 'types/enums';
import './UserForm.scss';

export const UserForm: React.FC<IUserFormProps> = ({ onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState<string>('./no_photo.jpg');
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const { stateForm, dispatchForm } = useContext(GlobalData);
  const { agree, country, date, gender, name, surName } = stateForm.formData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      surName: '',
      date: '',
      country: '',
      gender: false,
      agree: false,
    },
  });

  useEffect(() => {
    setValue('name', name as string);
    setValue('surName', surName as string);
    setValue('country', country as string);
    setValue('date', date as string);
    setValue('gender', gender as boolean);
    setValue('gender', gender as boolean);
    setValue('agree', agree as boolean);
    if (name || surName || country || date || agree) {
      setDisabledSubmit(false);
    }
  }, []);

  useEffect(() => {
    watch((data) => {
      dispatchForm({
        type: ACTION_TYPE.SET_FORM_DATA,
        payload: {
          ...stateForm,
          formData: {
            name: data.name,
            surName: data.surName,
            country: data.country,
            date: data.date,
            agree: data.agree,
            gender: data.gender,
          },
        },
      });
      if (data.agree || data.country || data.date || data.name || data.surName) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    });
  }, [watch]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      dispatchForm({
        type: ACTION_TYPE.SET_FORM_DATA,
        payload: {
          ...stateForm,
          formData: { ...stateForm.formData, img: event.target.files[0] },
        },
      });
      const fileLink = URL.createObjectURL((event.target.files as FileList)[0]);
      setPhotoPreview(fileLink);
    } else {
      setPhotoPreview('./no_photo.jpg');
    }
  };

  const onSubmitData: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      name: data.name,
      surname: data.surName,
      date: data.date,
      country: data.country,
      img: photoPreview,
      gender: data.gender,
    };
    onSubmit(formData);
    reset();
    setPhotoPreview('./no_photo.jpg');
  };

  return (
    <form
      className="user-form__container"
      data-testid="user-form"
      onSubmit={handleSubmit((data) => onSubmitData(data))}
    >
      <label className="user-form__label">
        <span>Name:</span>
        <input
          {...register('name', {
            required: 'Please enter your first name',
            minLength: {
              value: 2,
              message: 'The first name must contain only letters',
            },
            pattern: {
              value: /^[a-zA-Za-яА-Я]+$/,
              message: 'The first name must contain only letters',
            },
          })}
          className={`user-form__input ${errors?.name && 'user-form__input-error'}`}
          data-testid="input-name"
        />
        <div className="user-form__errors">{errors?.name && errors.name.message}</div>
      </label>
      <label className="user-form__label">
        <span>Surname:</span>
        <input
          {...register('surName', {
            required: 'Please enter your last name',
            minLength: {
              value: 2,
              message: 'The last name must contain only letters',
            },
            pattern: {
              value: /^[a-zA-Za-яА-Я]+$/,
              message: 'The last name must contain only letters',
            },
          })}
          className={`user-form__input ${errors?.surName && 'user-form__input-error'}`}
          data-testid="input-surname"
        />
        <div className="user-form__errors">{errors?.surName && errors.surName.message}</div>
      </label>
      <label className="user-form__label" htmlFor="date">
        <span>Date of Birth:</span>
        <input
          {...register('date', {
            required: 'Please enter your birhtday',
          })}
          type="date"
          className={`user-form__input ${errors?.date && 'user-form__input-error'}`}
          data-testid="input-date"
        />
        <div className="user-form__errors">{errors?.date && errors.date.message}</div>
      </label>
      <label className="user-form__label">
        <span>What is your country:</span>
        <select
          {...register('country', {
            required: 'Please enter your country',
          })}
          className={`user-form__input ${errors?.country && 'user-form__input-error'}`}
          data-testid="select-country"
        >
          <option value="">Select...</option>
          <option value="belarus">Belarus</option>
          <option value="ukraine">Ukraine</option>
          <option value="poland">Poland</option>
          <option value="lithuania">Lithuania</option>
        </select>
        <div className="user-form__errors">{errors?.country && errors.country.message}</div>
      </label>
      <div className="user-form__switcher">
        <span>What is your gender?</span>
        <div className="user-form__switch-container">
          <span className="user-form__switch-text">Male</span>
          <input
            {...register('gender')}
            type="checkbox"
            id="switch"
            className="user-form__switch-input"
            data-testid="switch-gender"
          />
          <label htmlFor="switch" className="user-form__switch-lable">
            Toggle
          </label>
          <span className="user-form__switch-text">Female</span>
        </div>
      </div>
      <div className="user-form__file-uploader-container">
        Your avatar:
        <div className="user-form__file-input-container">
          <input
            {...register('img')}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleUpload}
            id="form-img"
            style={{ display: 'none' }}
            data-testid="input-file"
          />
          <label htmlFor="form-img" className="user-form__file-label">
            Change avatar
          </label>
          <img src={photoPreview} alt="preview" style={{ width: '7rem', height: '7rem' }} />
        </div>
      </div>
      <label className="user-form__label-checkbox-container">
        <div className="user-form__label-checkbox">
          <span>I consent to my personal data</span>
          <input
            {...register('agree', { required: 'Please you need agree' })}
            type="checkbox"
            data-testid="checkbox-personal"
          />
        </div>
        <div className="user-form__errors">{errors?.agree && errors.agree.message}</div>
      </label>
      <div className="user-form__submit-container">
        <button
          type="submit"
          className="user-form__button"
          data-testid="button-submit"
          disabled={disabledSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
