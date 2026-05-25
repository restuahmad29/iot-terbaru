function saveAuth(
  token,
  user
) {

  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
}

function logout() {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location.href =
    "login.html";
}

function getUser() {

  return JSON.parse(
    localStorage.getItem("user")
  );
}

function isLoggedIn() {

  return !!localStorage.getItem(
    "token"
  );
}

function protectPage() {

  if(!isLoggedIn()) {

    window.location.href =
      "login.html";
  }
}