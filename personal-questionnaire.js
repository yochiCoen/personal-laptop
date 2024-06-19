// שליחת השאלון האישי על המחשב לשרת (POST)
let submit_btn = document.querySelector(".btn"); 
submit_btn.addEventListener("click", async () => { // מוסיף מאזין לכפתור השליחה שברגע שנלחץ, מבצע פעולה אסינכרונית
  const manufacturer = document.getElementById('manufacturer').value;
  const price_index = document.getElementById('budget').selectedIndex;
  const screen_size = document.getElementById('screen size').value;
  const processor = document.getElementById('processor').value;
  const RAM = document.getElementById('RAM').value; 
  console.log(`Before ${price_index}`);
  const response = await fetch("http://127.0.0.1:3004/newComputer", { // מבצע בקשת fetch אסינכרונית לנתיב "http://127.0.0.1:3004/newComputer" באמצעות POST
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