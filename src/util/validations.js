export const isCorrectAccount = (id, pw) => {
  if (!isCorrectID(id)) return false;
  if (!isCorrectPW(pw)) return false;
  return true;
};

const isCorrectID = id => {
  if (!id.indexOf('@')) return false;
  return true;
};

const isCorrectPW = password => {
  if (password.length < 8) return false;
  return true;
};
