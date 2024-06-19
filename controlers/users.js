const User = require('../schemas/userSchema')
async function register(req, res) {
    console.log(`I am in register with: ${JSON.stringify(req.body)}`)
    const user = new User(req.body);
    try {
        const data = await user.save();
        return res.send("user is added ")
    } catch (err) {
        console.log("Error.....@@@@@@@@@")
    }
    // return res.send("user is not added ")
}

async function login(req, res) {
    console.log(JSON.stringify(req.body))
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!user) {
        return res.status(401).send('Sorry, user is not correct');
    }

    return res.send("user is logged in")
}

module.exports = {
    register,
    login
}