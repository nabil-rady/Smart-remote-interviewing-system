const handleError = (statusCode, data, setError, invalidJWTCallback) => {
  if (statusCode === 401) {
    setError({
      title: 'Authintication Failed',
      message: data.message,
    });
    if (invalidJWTCallback) invalidJWTCallback();
    return true;
  } else if (statusCode === 404) {
    setError({
      title: 'Authintication Failed',
      message: data.message,
    });
    return true;
  } else if (statusCode === 422) {
    setError({
      title: 'Validation Failed',
      message: data.details[0].msg,
    });
    return true;
  } else if (statusCode >= 500) {
    setError({
      title: 'Server Error',
      message: 'Please try again later',
    });
    return true;
  }
  return false;
};

export default handleError;
