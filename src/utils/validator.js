const profileValidator = (error) => {
  let errorMessage = '';
  if (error.errors.firstName) {
    errorMessage = error.errors.firstName.message;
  }
  if (error.errors.lastName) {
    errorMessage = error.errors.lastName.message;
  }
  if (error.errors.dob) {
    errorMessage = 'Invalid date format.';
  }
  if (error.errors.gender) {
    errorMessage = error.errors.gender.message;
  }
  if (error.errors.phoneNumber) {
    errorMessage = error.errors.phoneNumber.message;
  }
  return errorMessage;
};

const userRegistrationValidator = (error) => {
  let errorMessage = '';
  if (error.errors.email) {
    errorMessage = error.errors.email.message;
  }
  if (error.errors.email && error.errors.email.kind === 'unique') {
    errorMessage = error.errors.email.message;
  }
  if (error.errors.email && error.errors.email.kind === 'required') {
    errorMessage = error.errors.email.message;
  }
  if (error.errors.password) {
    errorMessage = error.errors.password.message;
  }
  if (error.errors.username && error.errors.username.kind === 'unique') {
    errorMessage = error.errors.username.message;
  }
  if (error.errors.username && error.errors.username.kind === 'required') {
    errorMessage = error.errors.username.message;
  }

  return errorMessage;
};
export { profileValidator, userRegistrationValidator };
