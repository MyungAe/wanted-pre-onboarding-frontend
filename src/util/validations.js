export const isCorrectAccount = (id, pw) => {
  if (!isCorrectID(id)) return true;
  if (!isCorrectPW(pw)) return true;
  return false;
};

const isCorrectID = id => {
  if (id.indexOf('@')) return true;
  return false;
};

const isCorrectPW = password => {
  if (password.length > 7) return true;
  return false;
};

export const isSuccess = statusCode => {
  console.log(statusCode, Math.floor(statusCode / 100));
  if (Math.floor(statusCode / 100) === 2) return true;
};
