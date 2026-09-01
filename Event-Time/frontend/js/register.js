// ======================================
// Event Next Door - Register Page Script
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener("submit", handleRegisterSubmit);

});

async function handleRegisterSubmit(event) {

    event.preventDefault();

    const formError = document.getElementById("formError");

    if (formError) {
        formError.textContent = "";
    }

    // Get values from form

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    // FIX: passwordConfirm was referenced before but never read from the DOM,
    // causing a ReferenceError that silently killed the whole submit handler.
    const passwordConfirm =
        document.getElementById("passwordConfirm").value;

    // Validation
    // FIX: removed the stray `|| ""` that did nothing, and added a clean check
    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        passwordConfirm === ""
    ) {

        if (formError) {
            formError.textContent = "Please fill in all fields.";
        }

        return;

    }

    if (password !== passwordConfirm) {

        if (formError) {
            formError.textContent = "Passwords do not match.";
        }

        return;

    }

    const fullName = firstName + " " + lastName;

    try {

        // FIX: now passes phone, matching AuthAPI.register's real signature
        const response = await AuthAPI.register(
            fullName,
            email,
            phone,
            password
        );

        if (!response.success) {

            if (formError) {
                formError.textContent =
                    response.message || "Registration failed.";
            }

            return;
        }

        alert("Registration successful!");

        window.location.href = "login.html";

    } catch (error) {

        if (formError) {

            formError.textContent =
                error.message || "Registration failed.";

        }

    }

}