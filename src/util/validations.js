export const isCorrectID = id => {
  if (id.indexOf('@')) return true;
  return true;
};

export const isCorrectPW = password => {
  if (password.length < 8) return false;
  return true;
};
