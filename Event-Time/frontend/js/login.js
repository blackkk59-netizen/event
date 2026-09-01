// ======================================
// Event Next Door - Login Script
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", handleLoginSubmit);

});

async function handleLoginSubmit(event) {

    event.preventDefault();

    const formError = document.getElementById("formError");

    if (formError) {
        formError.textContent = "";
    }

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (email === "" || password === "") {

        if (formError) {
            formError.textContent =
                "Please enter your email and password.";
        }

        return;
    }

    try {

        const response = await AuthAPI.login(
            email,
            password
        );

        if (!response.success) {

            if (formError) {
                formError.textContent =
                    response.message || "Login failed.";
            }

            return;
        }

        alert("Login successful!");

        window.location.href = "event_list.html";

    } catch (error) {

        if (formError) {
            formError.textContent =
                error.message || "Login failed.";
        }

    }

}