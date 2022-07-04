import React from 'react';
import Navbar from '../components/NavBar';
import './scss/page-404.scss';

function Page404() {
  return (
    <>
      <Navbar />
      <h1 className="title-404">Page not found</h1>
      <p className="content-404">Oops! This page was not found.</p>
    </>
  );
}

export default Page404;
