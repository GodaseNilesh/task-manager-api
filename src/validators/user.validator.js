const validateSignup = (data) => {
  const { firstName, lastName, email, password } = data;

  if (!firstName) return 'First name is required';
  if (!lastName) return 'Last name is required';
  if (!email) return 'Email is required';
  if (!password) return 'Password is required';

  return null;
};

module.exports = { validateSignup };