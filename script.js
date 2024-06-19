// החלפת דף הכניסה וההרשמה
let register_btn = document.querySelector(".Register-btn"); // מאתחל משתנה עבור הכפתור "הרשמה" באמצעות מזהה קלאס
let login_btn = document.querySelector(".Login-btn");
let form = document.querySelector(".Form-box"); 
register_btn.addEventListener("click", () => { // מוסיף מאזין לכפתור "הרשמה" שברגע שנלחץ, מוסיף קלאס "change-form" לטופס
  form.classList.add("change-form");
});
login_btn.addEventListener("click", () => { // מוסיף מאזין לכפתור "התחברות" שברגע שנלחץ, מסיר את הקלאס "change-form" מהטופס
  form.classList.remove("change-form");
});

// שליחת האימייל והסיסמה בלוגין לשרת (POST)
let submit_btn_login = document.querySelector(".submit-btn-login"); 
submit_btn_login.addEventListener("click", async () => { // מוסיף מאזין לכפתור השליחה שברגע שנלחץ, מבצע פעולה אסינכרונית
  const email_input_login = document.getElementById('email-input-login').value // משיג את ערך האימייל שהמשתמש הקליד בתיבת הטקסט באמצעות ה־ID שלה
  const password_input_login = document.getElementById('password-input-login').value // משיג את ערך הסיסמה שהמשתמש הקליד בתיבת הטקסט באמצעות ה־ID שלה
  console.log(`Before loging with`);
  const response = await fetch("http://127.0.0.1:3004/login", { // מבצע בקשת fetch אסינכרונית לנתיב "http://127.0.0.1:3004/login" באמצעות POST
    method: "POST", 
    mode: "cors",
    headers: {
      "Content-Type": "application/json"}, // הגדרת הכותרות של הבקשה, כאשר התוכן מסוג JSON
    body: JSON.stringify({"email": email_input_login, "password": password_input_login})}); // שולח את גוף הבקשה כאובייקט JSON המכיל את ערכי שדות האימייל והסיסמה
    if(response.status === 200) {
      console.log("Good !!!")
      window.location.assign('personal-questionnaire.html')
    }
    else {
      console.log("Bad !!!")
    }
  });

// שליחת האימייל והסיסמה בהרשמה לשרת (POST)
let submit_btn_register = document.querySelector(".submit-btn-register");
submit_btn_register.addEventListener("click", async () => {
  const username_input_register = document.getElementById('username-input-register').value
  const email_input_register = document.getElementById('email-input-register').value
  const password_input_register = document.getElementById('password-input-register').value
  const response = await fetch("http://127.0.0.1:3004/Register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify({"user": username_input_register, "email": email_input_register, "password": password_input_register})})
});