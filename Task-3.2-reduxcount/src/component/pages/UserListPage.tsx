import { FC, useState } from 'react';
import { AddNewCustomer } from '../addNewField/AddNewCustomer';
import { RenderedUser } from '../renderApiField/RenderedUser';

export const UserList: FC<{}> = () => {
  const [showByClick, setShowByClick] = useState<boolean>(false);

  const showFieldAddNewUser = () => {
    setShowByClick((current) => !current);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        style={{
          width: '100px',
          margin: '5px',
          color: '#00df38',
          backgroundColor: '#0034df',
          borderRadius: '5px',
        }}
        type='button'
        onClick={showFieldAddNewUser}>
        ADD NEW USER
      </button>
      
      <div style={{ width: '300px', margin: '0 auto', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '20px' }}>USERS</h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '10px',
          }}>
          <RenderedUser />
        </div>
        {showByClick ? <AddNewCustomer /> : false}
      </div>
    </div>
  );
};
