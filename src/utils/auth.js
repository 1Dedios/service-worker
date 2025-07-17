export async function auth(username, password) {
  const loginHandler = await login(username, password);
  return loginHandler;
}

export async function login(username, password) {
  let headerOptions = getHeader();
  const response = await fetch('/user/login', {
    method: 'POST',
    headers: headerOptions,
    body: JSON.stringify({ username, password }),
  });
  const loginAttempt = await response.json();

  if (!response.ok) {
    throw new Error(loginAttempt.message);
  } else {
    return loginAttempt.token;
  }
}

export function getHeader() {
  const prevToken = localStorage.getItem('sw-demo');
  let headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return prevToken
    ? (headerOptions = {
        ...headerOptions,
        Authorization: `Bearer ${prevToken}`,
      })
    : headerOptions;
}
