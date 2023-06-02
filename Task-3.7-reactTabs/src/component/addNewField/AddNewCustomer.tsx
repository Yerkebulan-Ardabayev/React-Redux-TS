import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { userAdded } from '../../redux/slice/userSlice';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type InputTypes = {
  name: string;
  username: string;
};

export const AddNewCustomer: React.FC<{}> = () => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<InputTypes>({mode:"onBlur"});

  const dispatch = useAppDispatch();

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('name', e.currentTarget.value);

  const onContentChangedUser = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('username', e.currentTarget.value);

  const submitHandler = (data: any) => {
    console.log('data', data);
    const { name, username } = data;
    alert(JSON.stringify(data));
    reset();
    dispatch(
      userAdded({
        username,
        name,
        id: 0,
      })
    );
    axios
     .post(`https://jsonplaceholder.typicode.com/users`, { name, username })
     .then((response) => {});
  }

  return (
    <>
      <h2 style={{ fontSize: '20px', margin: '10px' }}>NEW USER</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <label htmlFor='name'>NAME:</label>
        <input
          {...register('name', {
            required: 'Field is required',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'No spaces allowed',
            },
          })}
          style={{ width: '250px', margin: '20px' }}
          type='text'
          name='name'
          onChange={onContentChanged}
        />
        {errors.name && <p>{errors['name']?.message}</p>}
        <label htmlFor='userName'>USERNAME:</label>
        <input
          {...register('username', {
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'No spaces allowed',
            },
          })}
          style={{ width: '250px', margin: '20px' }}
          type='text'
          name='userName'
          onChange={onContentChangedUser}
        />
          {errors.username && <p>{errors['username']?.message}</p>}
        <button
          style={{ width: '100px', margin: '5px' }}
          type='submit'
          disabled={!isValid}
        >
          SAVE USER
        </button>
      </form>
    </>
  );
};
