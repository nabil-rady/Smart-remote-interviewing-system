import React from 'react';

import Card from './Card';
import './scss/inviteList.scss';

const UsersList = (props) => {
  return (
    <>
      <ul>
        {props.users.map((user, index) => (
          <li key={index}>
            <Card className="users">
              <h2 className="uname">{user.name}</h2>
              <p className="uemail">{user.email}</p>
              <p className="uphone">
                {user.phoneCode} {user.phoneNumber}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
