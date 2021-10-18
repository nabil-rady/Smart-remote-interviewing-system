import React, { useState } from 'react';

import Card from './Card';
import './scss/inviteList.scss';

const UsersList = (props) => {
  return (
    <>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            <Card className="users">
              <h2 className="uname">{user.name}</h2>
              <p className="uemail">{user.email}</p>
              <p className="uphone">{user.phone}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
