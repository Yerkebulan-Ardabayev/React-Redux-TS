import { ChangeEvent, useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { postAdded } from '../../redux/slice/postsSlice';
import { useForm } from 'react-hook-form';

type InputTypes = {
  id: number | string;
  title: string;
  body: string;
};

export const AddNewPost: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<InputTypes>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('title', e.currentTarget.value);

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('body', e.currentTarget.value);

  const submitHandler = (data: any) => {
    console.log('data', data);
    const { title, id, body } = data;
    alert(JSON.stringify(data));
    reset();
    dispatch(
      postAdded({
        title,
        body,
        id,
      })
    );
  };

  return (
    <>
      <h2 style={{ fontSize: '20px' }}>ADD POST</h2>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <label htmlFor='title'>TITLE:</label>
        <input
          {...register('title', {
            required: true,
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
          name='title'
          onChange={onTitleChanged}
        />
        {errors.title && <p>{errors['title']?.message}</p>}
        <label htmlFor='body'>CONTENT:</label>
        <input
          {...register('body', {
            required: true,
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
          name='body'
          onChange={onContentChanged}
        />
        {errors.body && <p>{errors['body']?.message}</p>}
        <button
          style={{ width: '100px', margin: '5px' }}
          type='submit'
          disabled={!isValid}>
          SAVE POST
        </button>
      </form>
    </>
  );
};
