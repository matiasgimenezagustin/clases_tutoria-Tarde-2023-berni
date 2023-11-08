

const User = require("../models/User")


const findUserByUsername =  async (username) => {
    return await User.findOne({username})
}

const createUser = async  (user) =>{

    const newUser = new User(user)
    return await newUser.save()
}


module.exports = {findUserByUsername, createUser}
