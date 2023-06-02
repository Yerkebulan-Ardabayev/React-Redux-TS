import { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import { RootState } from '../../redux/store/store';
import { HiEnvelope, HiPhone } from 'react-icons/hi2';
import { MdLocationPin } from 'react-icons/md';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import style from './InfoAboutCustomer.module.css';
import { GetAlbumsTodosPost } from '../getAlbums/GetAlbumsTodosPost';

export const InfoAboutCustomer: FC<{}> = () => {
  const users = useAppSelector((state: RootState) => state.user.usersList);
  const { userId } = useParams();

  const customer =
    (userId && users && users.find((user) => user.id === +userId)?.name) || '';

  const email =
    (userId && users && users.find((user) => user.id === +userId)?.email) || '';

  const phone =
    (userId && users && users.find((user) => user.id === +userId)?.phone) || '';

  const address =
    (userId && users && users.find((user) => user.id === +userId)?.address) ||
    '';

  return (
    <>
      <div className={style.container}>
        <GetAlbumsTodosPost />
        <div className={style.main}>
          <Outlet />
          <div className={style.supMain}>
            <HiEnvelope className={style.color} />
            <p className={style.indent}>{email}</p>
          </div>
          <div className={style.supMain}>
            <HiPhone className={style.color} />
            <p className={style.indent}>{phone}</p>
          </div>
          <div className={style.supMain}>
            <MdLocationPin className={style.color} />
            <p className={style.indent}>{address.street}</p>
          </div>
          <div className={style.supMain}>
            <BsFillBuildingsFill className={style.color} />
            <p className={style.indent}>{address.city}</p>
          </div>
          <div className={style.supMain}>
            <BsEmojiHeartEyesFill className={style.color} />
            <p className={style.indent}>{customer}</p>
          </div>
        </div>
      </div>
    </>
  );
};
