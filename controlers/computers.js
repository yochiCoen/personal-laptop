const Computer = require('../schemas/computerSchema'); // יבוא מודול המכיל את הסכמה של מחשב

// הוספת מחשב חדש למסד הנתונים
async function newComputer(req, res) {
    console.log(`I am in register with: ${JSON.stringify(req.body)}`); // הדפסת הגעת הבקשה לבדיקת איתור באגים
    const computer = new Computer(req.body); // יצירת אובייקט מודל המחשב על פי נתוני הבקשה
    try {
        const data = await computer.save(); // שמירת המחשב החדש במסד הנתונים
        return res.send("The computer has been successfully added to the database"); // הודעת הצלחה במקרה של שמירה בהצלחה
    } catch (err) {
        console.log("EROR...@@@@@@@@@"); // הדפסת הודעת שגיאה לצורך ניטור ותיקון
        return res.status(500).send('Sorry, an error occurred'); // הודעת שגיאה כללית במקרה של כשל בשמירה
    }
}

function updateGrade(req, gradeObj, computer) {
    // בדיקה האם היצרן של המחשב תואם את היצרן המבוקש בבקשה
    if (req.query.manufacturer === computer.manufacturer) {
        gradeObj.grade += 1;
    }
    // בדיקה האם המחיר של המחשב תואם את המחיר המבוקש בבקשה
    if ((req.query.price <= computer.price)&(req.query.price <= computer.price)) {
        gradeObj.grade += 1;
    }
    // בדיקה האם המעבד של המחשב תואם את המעבד המבוקש בבקשה
    if (req.query.processor === computer.processor) {
        gradeObj.grade += 1;
    }
    // בדיקה האם המעבד של המחשב תואם את גודל המסך המבוקש בבקשה
    if (req.query.screen_size === computer.screen_size) {
        gradeObj.grade += 1;
    }
    // בדיקה האם המעבד של המחשב תואם את הרם המבוקש בבקשה
    if (req.query.ram === computer.ram) {
        gradeObj.grade += 1;
    }
}
FileSystemEntry
async function calcComputerGrades(req) {
    const computers = await Computer.find({}); // משיג את כל המחשבים מהמסד נתונים
    const grades = []; // מערך ריק שבו נאחסן את הציונים של כל מחשב
    // לולאת חישוב הציונים עבור כל מחשב
    for (let i = 0; i < computers.length; i++) {
        grades[i] = {computer: computers[i], grade: 0}; // ציון התחלתי - 0
        updateGrade(req, grades[i], computers[i])
    }
    console.log(`Grades are: ${JSON.stringify(grades)}`); // הדפסת הציונים שנאספו לכל מחשב
    return grades;
}

function getBestComputers(computerGrades) {
    computerGrades.sort(function(a,b) {
        return b.grade - a.grade
    });
    console.log(`Final grades are: ${JSON.stringify(computerGrades)}`); // הדפסת הציונים שנאספו לכל מחשב
    
    return computerGrades.slice(0, 3)
}

// מחזירה את חמשת המחשבים שהכי קרובים לפרמטרים שהלקוח מעדיף במחשב
async function get5HighRatedComputers(req, res) {
    const computerGrades = await calcComputerGrades(req)
    const bestComputers = getBestComputers(computerGrades)
    return res.send(bestComputers)
}

// יצוא
module.exports = {
    newComputer,
    get5HighRatedComputers
}