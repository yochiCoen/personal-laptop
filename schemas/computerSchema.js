const mongoose = require('mongoose'); // יבוא של מודול Mongoose לצורך התקשרות עם מסד הנתונים

// יצירת סכמה עבור מחשב
const computerSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true }, 
    price: { type: Number, required: true },
    processor: { type: String, required: true }, 
    screen_size: { type: String, required: true },
    ram: { type: String, required: true } 
});

module.exports = mongoose.model('computer', computerSchema); // יצוא המודל