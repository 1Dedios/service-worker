export async function auth(username, password) {
  const loginHandler = await login(username, password);
  return loginHandler;
}

export async function login(username, password) {
  return await fetch('/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => console.log(e));
}
