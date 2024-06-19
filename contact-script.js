// שליחת השם, האימייל וההודעה בצור קשר לשרת (POST)
let btn_send = document.querySelector(".btn-send");
btn_send.addEventListener("click", async () => {
    console.log("123") // מוסיף מאזין לכפתור השליחה שברגע שנלחץ, מבצע פעולה אסינכרונית
    const name_input_contact = document.getElementById('name-input-contact').value // משיג את ערך האימייל שהמשתמש הקליד בתיבת הטקסט באמצעות ה־ID שלה
    const email_input_contact = document.getElementById('email-input-contact').value // משיג את ערך הסיסמה שהמשתמש הקליד בתיבת הטקסט באמצעות ה־ID שלה
    const message_input_contact = document.getElementById('message-input-contact').value
    const response = await fetch("http://127.0.0.1:3004/Contact", { // מבצע בקשת fetch אסינכרונית לנתיב "http://127.0.0.1:3004/Contact" באמצעות POST
      method: "POST", 
      mode: "cors",
      headers: {
        "Content-Type": "application/json"}, // הגדרת הכותרות של הבקשה, כאשר התוכן מסוג JSON
      body: JSON.stringify({"name_input_contact": name_input_contact, "email_input_contact": email_input_contact, "message_input_contact": message_input_contact})}); // שולח את גוף הבקשה כאובייקט JSON המכיל את ערכי שדות האימייל והסיסמה
    });123