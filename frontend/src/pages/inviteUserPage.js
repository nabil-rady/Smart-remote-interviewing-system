import React, { useState } from 'react';

import InviteUser from '../components/InviteApplicant';
import UsersList from '../components/InviteList';

function InvitationPage() {
  const [usersList, setUsersList] = useState([]);

  const InviteUserHandler = (uName, uEmail, uPhone) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: uName,
          email: uEmail,
          phone: uPhone,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <div>
      <InviteUser onInviteUser={InviteUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default InvitationPage;
