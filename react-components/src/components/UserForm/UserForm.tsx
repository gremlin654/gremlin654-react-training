import React, { Component } from 'react';
import { IUserFormProps, IUserFormState } from 'types/types';
import './UserForm.scss';

export default class UserForm extends Component<IUserFormProps, IUserFormState> {
  form: React.RefObject<HTMLFormElement>;
  firstNameInput: React.RefObject<HTMLInputElement>;
  lastNameInput: React.RefObject<HTMLInputElement>;
  birthdayInput: React.RefObject<HTMLInputElement>;
  countrySelect: React.RefObject<HTMLSelectElement>;
  fileInput: React.RefObject<HTMLInputElement>;
  genderInput: React.RefObject<HTMLInputElement>;
  agreeInput: React.RefObject<HTMLInputElement>;

  constructor(props: IUserFormProps | Readonly<IUserFormProps>) {
    super(props);
    this.form = React.createRef();
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.birthdayInput = React.createRef();
    this.countrySelect = React.createRef();
    this.fileInput = React.createRef();
    this.genderInput = React.createRef();
    this.agreeInput = React.createRef();

    this.state = {
      errors: {},
      disabled: true,
    };
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const inputAvatar = this.fileInput.current as HTMLInputElement;

    if (this.validate()) {
      const formData = {
        name: (this.firstNameInput.current as HTMLInputElement).value,
        surname: (this.lastNameInput.current as HTMLInputElement).value,
        date: (this.birthdayInput.current as HTMLInputElement).value,
        country: (this.countrySelect.current as HTMLSelectElement).value,
        img: URL.createObjectURL((inputAvatar.files as FileList)[0]),
        gender: (this.genderInput.current as HTMLInputElement).checked,
      };

      this.props.onSubmit(formData);
      (this.form.current as HTMLFormElement).reset();
      this.setState({ disabled: true });
    }
  };

  componentDidUpdate() {
    if (this.state.disabled === false) {
      if (this.isAnyErrorsValidate()) {
        this.setDisabledSubmit();
      }
    }
  }

  validate = () => {
    const errors: Record<string, unknown> = {};
    let isValid = true;

    const name = (this.firstNameInput.current as HTMLInputElement).value;
    const surname = (this.lastNameInput.current as HTMLInputElement).value;
    const date = (this.birthdayInput.current as HTMLInputElement).value;
    const country = (this.countrySelect.current as HTMLSelectElement).value;
    const img = this.fileInput.current as HTMLInputElement;
    const agree = (this.agreeInput.current as HTMLInputElement).checked;

    if (!name.length) {
      isValid = false;
      errors.firstNameInput = 'Please enter your first name';
    } else if (!/^[a-zA-Za-яА-Я]+$/.test(name)) {
      isValid = false;
      errors.firstNameInput = 'The first name must contain only letters';
    } else if (name.length < 2) {
      isValid = false;
      errors.firstNameInput = 'The first name must be more than one letter';
    }

    if (!surname.length) {
      isValid = false;
      errors.lastNameInput = 'Please enter your last name';
    } else if (!/^[a-zA-Za-яА-Я]+$/.test(surname)) {
      isValid = false;
      errors.lastNameInput = 'The last name must contain only letters';
    } else if (surname.length < 2) {
      isValid = false;
      errors.lastNameInput = 'The last name must be more than one letter';
    }

    if (!date) {
      isValid = false;
      errors.birthdayInput = 'Please enter your birhtday';
    }

    if (!img.files || img.files.length === 0) {
      isValid = false;
      errors.fileInput = 'Please select file';
    }
    if (!country) {
      isValid = false;
      errors.countrySelect = 'Please enter your country';
    }

    if (!agree) {
      isValid = false;
      errors.agreeInput = 'Please you need agree';
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  resetError = (error: string) => {
    this.setState({
      errors: {
        ...this.state.errors,
        [error]: null,
      },
    });
  };

  setUndisabledSubmit = () => {
    this.setState({
      disabled: false,
    });
  };

  setDisabledSubmit = () => {
    this.setState({
      disabled: true,
    });
  };

  isAnyErrorsValidate = () => {
    const errors = this.state.errors;

    if (
      errors.firstNameInput ||
      errors.lastNameInput ||
      errors.birthdayInput ||
      errors.fileInput ||
      errors.countrySelect ||
      errors.agreeInput
    ) {
      return true;
    }
    return false;
  };

  onFocus = (input: string) => {
    this.resetError(input);

    if (this.isAnyErrorsValidate()) {
      this.setDisabledSubmit();
    }
  };

  onChange = () => {
    this.setUndisabledSubmit();

    if (this.isAnyErrorsValidate()) {
      this.setDisabledSubmit();
    }
  };

  render(): React.ReactNode {
    return (
      <form
        className="user-form__container"
        onSubmit={this.handleSubmit}
        ref={this.form}
        data-testid="user-form"
      >
        <label className="user-form__label">
          <span>Name:</span>
          <input
            className="user-form__input"
            name="name"
            type="input"
            ref={this.firstNameInput}
            onFocus={() => this.onFocus('firstNameInput')}
            onChange={this.onChange}
            data-testid="input-name"
          />
          <div className="user-form__errors">{this.state.errors.firstNameInput as string}</div>
        </label>
        <label className="user-form__label">
          <span>Surname:</span>
          <input
            className="user-form__input"
            name="surname"
            type="input"
            ref={this.lastNameInput}
            onFocus={() => this.onFocus('lastNameInput')}
            onChange={this.onChange}
            data-testid="input-surname"
          />
          <div className="user-form__errors">{this.state.errors.lastNameInput as string}</div>
        </label>
        <label className="user-form__label" htmlFor="date">
          <span>Date of Birth:</span>
          <input
            className="user-form__input"
            type="date"
            ref={this.birthdayInput}
            name="date"
            onFocus={() => this.onFocus('birthdayInput')}
            onChange={this.onChange}
            data-testid="input-date"
          />
          <div className="user-form__errors">{this.state.errors.birthdayInput as string}</div>
        </label>
        <label className="user-form__label">
          <span>What is your country:</span>
          <select
            name="country"
            className="user-form__input"
            ref={this.countrySelect}
            defaultValue=""
            onFocus={() => this.onFocus('countrySelect')}
            onChange={this.onChange}
            data-testid="select-country"
          >
            <option value="belarus">Belarus</option>
            <option value="ukraine">Ukraine</option>
            <option value="poland">Poland</option>
            <option value="lithuania">Lithuania</option>
          </select>
          <div className="user-form__errors">{this.state.errors.countrySelect as string}</div>
        </label>
        <div className="user-form__switcher">
          <span>What is your gender?</span>
          <div className="user-form__switch-container">
            <span className="user-form__switch-text">Male</span>
            <input
              type="checkbox"
              id="switch"
              className="user-form__switch-input"
              ref={this.genderInput}
              onChange={this.onChange}
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
          <input
            ref={this.fileInput}
            name="file"
            type="file"
            accept="image/jpeg,image/png"
            onChange={this.onChange}
            onFocus={() => this.onFocus('fileInput')}
            data-testid="input-file"
          />
          <div className="user-form__errors">{this.state.errors.fileInput as string}</div>
        </div>
        <label className="user-form__label-checkbox-container">
          <div className="user-form__label-checkbox">
            <span>I consent to my personal data</span>
            <input
              name="checkbox"
              type="checkbox"
              ref={this.agreeInput}
              onFocus={() => this.onFocus('agreeInput')}
              onChange={this.onChange}
              data-testid="checkbox-personal"
            />
          </div>
          <div className="user-form__errors">{this.state.errors.agreeInput as string}</div>
        </label>
        <div className="user-form__submit-container">
          <button
            className="user-form__button"
            type="submit"
            disabled={this.state.disabled}
            data-testid="button-submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
