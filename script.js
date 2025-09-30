const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");
const message = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");

// Create a strength bar dynamically
const strengthBar = document.createElement("div");
strengthBar.style.height = "8px";
strengthBar.style.width = "100%";
strengthBar.style.background = "#333";
strengthBar.style.borderRadius = "5px";
strengthBar.style.marginTop = "10px";

const strengthFill = document.createElement("div");
strengthFill.style.height = "100%";
strengthFill.style.width = "0%";
strengthFill.style.borderRadius = "5px";
strengthFill.style.transition = "width 0.3s ease";

strengthBar.appendChild(strengthFill);
document.querySelector(".input-box").appendChild(strengthBar);

// Password visibility toggle
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "👁️";
toggleBtn.style.marginLeft = "5px";
toggleBtn.style.cursor = "pointer";
toggleBtn.style.background = "#444";
toggleBtn.style.color = "#fff";
toggleBtn.style.border = "none";
toggleBtn.style.borderRadius = "5px";
toggleBtn.style.padding = "5px 8px";

document.querySelector(".input-box").insertBefore(toggleBtn, checkBtn);

toggleBtn.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Function to check strength
function checkStrength(password) {
    let score = 0;
    let tips = [];

    if (password.length >= 8) score++;
    else tips.push("Use at least 8 characters");

    if (/[a-z]/.test(password)) score++;
    else tips.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score++;
    else tips.push("Add uppercase letters");

    if (/[0-9]/.test(password)) score++;
    else tips.push("Include numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else tips.push("Add special characters");

    return { score, tips };
}

// Update UI
function updateStrength() {
    const password = passwordInput.value;
    const { score, tips } = checkStrength(password);

    let strength = "";
    let color = "";
    let width = "";

    switch (score) {
        case 0:
        case 1:
            strength = "Very Weak";
            color = "#ff4d4d";
            width = "20%";
            break;
        case 2:
            strength = "Weak";
            color = "#ff944d";
            width = "40%";
            break;
        case 3:
            strength = "Medium";
            color = "#ffa500";
            width = "60%";
            break;
        case 4:
            strength = "Strong";
            color = "#4caf50";
            width = "80%";
            break;
        case 5:
            strength = "Very Strong";
            color = "#00e676";
            width = "100%";
            break;
    }

    strengthText.textContent = strength;
    message.className = "";
    message.style.color = color;
    strengthFill.style.width = width;
    strengthFill.style.background = color;

    // Show improvement tips
    let tipsBox = document.getElementById("tips");
    if (!tipsBox) {
        tipsBox = document.createElement("ul");
        tipsBox.id = "tips";
        tipsBox.style.textAlign = "left";
        tipsBox.style.marginTop = "10px";
        document.querySelector(".input-box").appendChild(tipsBox);
    }
    tipsBox.innerHTML = "";
    tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        li.style.fontSize = "12px";
        li.style.color = "#bbb";
        tipsBox.appendChild(li);
    });
}

// Live update while typing
passwordInput.addEventListener("input", updateStrength);

// Button check (optional)
checkBtn.addEventListener("click", updateStrength);