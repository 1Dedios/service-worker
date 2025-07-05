export async function auth(username, password) {
  const loginHandler = await login(username, password);
  return loginHandler;
}

export async function login(username, password) {
  let headerOptions = getHeader();
  return await fetch('/user/login', {
    method: 'POST',
    headers: headerOptions,
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      throw new Error(`Error on login: ${e}`);
    });
}

export function getHeader() {
  const prevToken = localStorage.getItem('sw-demo');
  console.log(`FOUND A PREV SAVED TOKEN: ${prevToken}`);
  let headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return prevToken
    ? (headerOptions = { ...headerOptions, Authorization: prevToken })
    : headerOptions;
}
