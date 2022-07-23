//use in conjunction with views/login.handlebars

//async/await acts as "syntactic sugar", helps make promises more readable.
async function loginFormHandler(event) {
  event.preventDefault();

  //login information that we receive and placed in server
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && password) {
    //await can assign the result of promise to a variable.  this way, dont need to use catch() or then() to tell the code what to do after the Promise completes
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    //.then((response) => { this is not needed anymore bescuase we using async/await
    //if response is successful, otherwise we will be alerted with the error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

//listen for the submit event from the form
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
