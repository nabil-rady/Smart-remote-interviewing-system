import React, { useContext } from 'react';
import '../components/scss/utility.scss';
import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';
import './scss/login.scss';
import { UserContext } from '../App';
import Card from '../components/Card';

function LoginPage() {
  const authUser = useContext(UserContext);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NavBar />
      <Card className="profilecard">
        <form onSubmit={submitHandler} id="employerform">
          <input
            className="inputs"
            type="text"
            placeholder="Your First Name"
            value={authUser.firstName}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Your Last Name"
            value={authUser.lastName}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Company Name"
            value={authUser.CompanyName}
            required
          />
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            value={authUser.Email}
            required
          />
          <input
            className="inputs"
            type="tel"
            placeholder="Phone No."
            value={authUser.phoneNo}
            required
          />
          <button className="save">Save</button>
        </form>
      </Card>
    </>
  );
}

export default LoginPage;
