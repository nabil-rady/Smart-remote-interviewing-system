import React from 'react';

import Card from './Card';
import './scss/inviteList.scss';

const UsersList = (props) => {
  return (
    <ul>
      {props.users.map((user) => (
        <li key={user.id}>
          <Card className="users">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
