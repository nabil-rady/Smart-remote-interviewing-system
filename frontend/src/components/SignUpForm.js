import React, { useState, useContext, useEffect } from 'react';
import './scss/signup.scss';
import Card from './Card';
import ErrorModal from './ErrorModal';
import { APIURL } from '../API/APIConstants';
import { UserContext } from '../App';
import handleAPIError from '../utils/APIErrorHandling';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import EmailVerification from './EmailVerification';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { requestForToken } from '../utils/firebase';

const SignUpForm = () => {
  const [registrationToken, setToken] = useState();
  useEffect(() => {
    (async () => {
      let token = await requestForToken();
      setToken(token);
      console.log(registrationToken);
    })();
  }, [registrationToken]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [companyName, setCompanyName] = useState();
  const [phone, setNum] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [phoneCode, setCode] = useState();
  const [verificationCard, setVerificationCard] = useState(false);
  const [loading, setLoading] = useState(false);

  let formattedvalue = '';
  const setAuthUser = useContext(UserContext).setAuthUser;
  const submitHandler = (e) => {
    e.preventDefault();
    // Send data to backend
    let statusCode;
    setLoading(true);
    fetch(`${APIURL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        companyName,
        email,
        password,
        confirmPassword,
        phoneCode,
        phoneNumber: phone,
      }),
    })
      .then((response) => {
        statusCode = response.status;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (statusCode === 201) {
          console.log('Success');
          setLoading(false);
        } else {
          handleAPIError(statusCode, data, setError, () => setAuthUser(null));
        }
        console.log(registrationToken);
        return fetch(`${APIURL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            registrationToken,
          }),
        });
      })
      .then((loginResponse) => {
        statusCode = loginResponse.status;
        return loginResponse.json();
      })
      .then((response) => {
        console.log(response);
        if (statusCode === 200) {
          console.log('Success');
          console.log(response);
          setAuthUser({ ...response.user, token: response.token });
          setVerificationCard(true);
          return fetch(`${APIURL}/user/confirm-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: response.token,
            },
          });
        } else {
          handleAPIError(statusCode, response.data, setError, () =>
            setAuthUser(null)
          );
        }
      })
      .then((confirmResponse) => {
        return confirmResponse.json();
      })
      .then((response) => {
        console.log(response);
        if (statusCode === 200) {
          console.log('Success');
          setVerificationCard(true);
        } else {
          handleAPIError(statusCode, response.data, setError, () =>
            setAuthUser(null)
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const CompanyNameHandler = (e) => {
    setCompanyName(e.target.value);
  };
  const FirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const LastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  // const PhoneHandler = (e) => {
  //   setNum(e.target.value);
  // };
  const errorHandler = () => {
    setError(null);
  };
  const Modify = () => {
    let tests = formattedvalue.split(' ');
    console.log(tests);
    let num = '';
    for (let i = 1; i < tests.length; i++) {
      num += tests[i];
    }
    console.log(num);
    setCode(tests[0]);
    setNum(num);
  };
  const handleOnChange = (value, data, event, formattedValue) => {
    formattedvalue = formattedValue;
    Modify();
  };

  return (
    <>
      {verificationCard && <EmailVerification route={'/dashboard'} />}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className="cardsignup top-margin">
        <p className="signup_header">
          Sign up to <span className="signup_logo">Vividly</span>
        </p>
        <form onSubmit={submitHandler} id="employerform">
          <input
            className="inputs"
            type="text"
            placeholder="Your First Name"
            onChange={FirstNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Your Last Name"
            onChange={LastNameHandler}
            required
          />
          <input
            className="inputs"
            type="text"
            placeholder="Company Name"
            onChange={CompanyNameHandler}
            required
          />
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            onChange={EmailHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={PasswordHandler}
            required
          />
          <input
            className="inputs"
            type="password"
            placeholder="Confirm Password"
            onChange={ConfirmPasswordHandler}
            required
          />
          <PhoneInput
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              disabled: false,
            }}
            country={'eg'}
            onChange={handleOnChange}
            enableSearch={true}
            inputStyle={{
              display: 'block',
              border: 'none',
              borderBottom: '1px solid hsl(215deg, 79%, 42%)',
              borderRadius: '0px',
              height: '20px',
              width: '80%',
              outline: 'none',
            }}
            containerStyle={{
              marginLeft: '10%',
              marginBottom: '8%',
              marginTop: '8%',
            }}
          />
          {!loading && <button className="signup">Sign Up</button>}
          {loading && (
            <div
              style={{
                top: 'calc(50vh - 40px)',
                left: 'calc(50vw - 40px)',
                marginLeft: '2rem',
              }}
            >
              <TailSpin color="hsl(215deg, 79%, 42%)" height={50} width={50} />
            </div>
          )}
        </form>
        <p className="toLogin">
          Have an account?{' '}
          <Link to="/login" className="loginLink">
            Login
          </Link>
        </p>
      </Card>
    </>
  );
};
export default SignUpForm;
