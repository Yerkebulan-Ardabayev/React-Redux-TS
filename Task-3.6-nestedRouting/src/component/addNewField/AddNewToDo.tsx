import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { todoAdded } from '../../redux/slice/todoSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type InputTypes = {
  title: string;
  id: string | number;
};

export const AddNewToDo: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<InputTypes>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();

  const onContentChanged = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('title', e.target.value);

  const submitHandler = (data: any) => {
    console.log('data', data);
    const { title, id } = data;
    alert(JSON.stringify(data));
    reset();
    dispatch(
      todoAdded({
        title,
        id,
      })
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
        <label style={{ fontWeight: 'bold', fontSize: '20px' }} htmlFor='title'>
          ADD TODO CONTENT:
        </label>
        <input
          {...register('title', {
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
          name='title'
          onChange={onContentChanged}
        />
        {errors.title && <p>{errors['title']?.message}</p>}
        <button
          style={{ width: '100px', margin: '5px' }}
          type='submit'
          disabled={!isValid}>
          SAVE TODO
        </button>
      </form>
    </>
  );
};
