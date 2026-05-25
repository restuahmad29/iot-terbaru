const form =
document.getElementById(
  "loginForm"
);

form.addEventListener(
  "submit",
  async function(e) {

    e.preventDefault();

    const email =
      document.getElementById(
        "email"
      ).value;

    const password =
      document.getElementById(
        "password"
      ).value;

    const errorText =
      document.getElementById(
        "errorText"
      );

    try {

      const response =
        await apiFetch(
          "/login",
          {
            method: "POST",

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      if(response.token) {

        saveAuth(
          response.token,
          response.user
        );

        window.location.href =
          "dashboard.html";

      } else {

        errorText.classList.remove(
          "hidden"
        );
      }

    } catch(error) {

      console.log(error);

      errorText.classList.remove(
        "hidden"
      );
    }
});