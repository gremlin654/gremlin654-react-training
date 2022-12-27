import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import UserForm from 'components/UserForm/UserForm';
import { IPersonCard } from '../../types/types';
import userEvent from '@testing-library/user-event';

describe('UserForm component', () => {
  it('render UserForm', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('render name input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputName = screen.getByTestId('input-name');

    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, 'aaa');

    expect(inputName).toHaveValue('aaa');
  });

  it('render surname input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputSurname = screen.getByTestId('input-surname');

    expect(inputSurname).toBeInTheDocument();

    userEvent.type(inputSurname, 'aaa');

    expect(inputSurname).toHaveValue('aaa');
  });

  it('render data input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputData = screen.getByTestId('input-date');

    expect(inputData).toBeInTheDocument();

    userEvent.type(inputData, '2022-10-10');

    expect(inputData).toHaveValue('2022-10-10');
  });

  it('render file input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputFile = screen.getByTestId('input-file') as HTMLInputElement;

    expect(inputFile).toBeInTheDocument();

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    userEvent.upload(inputFile, file);

    expect(inputFile.files!.item(0)).toStrictEqual(file);
    expect(inputFile.files).toHaveLength(1);
  });

  it('render checkbox input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputCheckbox = screen.getByTestId('checkbox-personal');

    expect(inputCheckbox).toBeInTheDocument();

    userEvent.click(inputCheckbox);

    expect(inputCheckbox).toBeChecked();

    userEvent.click(inputCheckbox);

    expect(inputCheckbox).not.toBeChecked();
  });

  it('render switch input', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputSwitch = screen.getByTestId('switch-gender');

    expect(inputSwitch).toBeInTheDocument();

    userEvent.click(inputSwitch);

    expect(inputSwitch).toBeChecked();

    userEvent.click(inputSwitch);

    expect(inputSwitch).not.toBeChecked();
  });

  it('render select ', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const select = screen.getByTestId('select-country');
    const selectOption = screen.getByRole('option', { name: 'Ukraine' }) as HTMLOptionElement;

    expect(select).toBeInTheDocument();
    expect(selectOption).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(4);

    userEvent.selectOptions(select, selectOption);

    expect(selectOption.selected).toBe(true);
    expect(select).toHaveValue('ukraine');
  });

  it('UserForm snaphot', () => {
    const userForm = render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    expect(userForm).toMatchSnapshot();
  });

  it('Submit is disabled', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    expect(screen.getByTestId('button-submit')).toBeInTheDocument();
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit')).toBeDisabled();

    userEvent.type(screen.getByTestId('input-name'), 'w');

    expect(screen.getByTestId('button-submit')).not.toBeDisabled();
  });

  it('To have errors if empty input and not check checkbox', () => {
    render(
      <UserForm
        onSubmit={function (data: IPersonCard): void {
          {
            [data];
          }
        }}
      />
    );

    const inputName = screen.getByTestId('input-name');
    const inputSurname = screen.getByTestId('input-surname');
    const buttonSubmit = screen.getByTestId('button-submit');

    expect(inputName).toBeInTheDocument();
    expect(inputSurname).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(inputName).toHaveValue('');
    expect(inputSurname).toHaveValue('');
    expect(buttonSubmit).toBeDisabled();

    fireEvent.input(inputSurname, {
      target: { value: 'wwww' },
    });

    expect(inputSurname).toHaveValue('wwww');
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.click(buttonSubmit);

    expect(screen.queryByText(/Please enter your first name/i)).toBeInTheDocument();
    expect(screen.queryByText(/Please enter your last name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please enter your birhtday/i)).toBeInTheDocument();
    expect(screen.queryByText(/Please select file/i)).toBeInTheDocument();
    expect(screen.queryByText(/Please you need agree/i)).toBeInTheDocument();
  });
});
