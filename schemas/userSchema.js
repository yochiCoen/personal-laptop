const mongoose = require('mongoose'); // יבוא של מודול Mongoose לצורך התקשרות עם מסד הנתונים

// יצירת סכמה עבור משתמש
const userSchema = new mongoose.Schema({
    user: {type: String, required: true}, 
    password: {type: String, required: true}, 
    email: {type: String, required: true}, 
});

module.exports = mongoose.model('user', userSchema); // יצוא המודל