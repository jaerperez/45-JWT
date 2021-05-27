
const url = 'http://localhost:3000/login';
const button = document.getElementById("login");

button.addEventListener('click', async function () {
    const usernameInputValue = document.getElementById('username').value;
    const passwordInputValue = document.getElementById('password').value;

    console.log(usernameInputValue);
    console.log(passwordInputValue);

    const data = {
        username: usernameInputValue,
        password: passwordInputValue
    }

    console.log(data);

    const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        mode: "no-cors",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    });

    response.then(res => res.json())
        .catch(error => alert('Error:', error))
        .then(response => alert('Success:', response));
});


/*try {
    const responseObject = await fetch(, {
        method: 'POST',
        mode:"no-cors",
        body: JSON.stringify(bodyPost),
        headders: {
            'Content-Type': 'application/json'
        }
    });
    const resp = await responseObject.json();
    console.log(resp);

} catch (e) {
    alert('Error de autenticación revise su username o password');
}*/

