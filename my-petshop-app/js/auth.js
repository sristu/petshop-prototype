const USER_KEY = "reddysUser";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}

function updateUserUI() {
  const user = getStoredUser();
  const userNameNodes = document.querySelectorAll("[data-user-name]");
  const authLinks = document.querySelectorAll("[data-auth-link]");

  userNameNodes.forEach((node) => {
    node.textContent = user?.name || "Guest";
  });

  authLinks.forEach((link) => {
    if (user) {
      link.textContent = "Logout";
      link.href = "#";
      link.onclick = (event) => {
        event.preventDefault();
        clearStoredUser();
        updateUserUI();
      };
    } else {
      link.textContent = "Login";
      link.href = "login.html";
      link.onclick = null;
    }
  });
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const existingUser = getStoredUser();
  if (existingUser) {
    form.name.value = existingUser.name || "";
    form.phone.value = existingUser.phone || "";
    form.email.value = existingUser.email || "";
  }

  // Save user profile to LocalStorage and redirect to shop.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim()
    };

    setStoredUser(user);
    window.location.href = "shop.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateUserUI();
  setupLoginForm();
});
