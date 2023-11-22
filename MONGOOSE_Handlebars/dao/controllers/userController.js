const bcrypt = require('bcrypt')

const User = require("../models/User")


const findUserByUsername =  async (username) => {
    return await User.findOne({username})
}

const createUser = async  (user) =>{

    const newUser = new User(user)
    return await newUser.save()
}

const isValidCredentials = async (user) =>{
    const userFound = await User.findOne({email: user.email})
    console.log('hola', userFound)
    console.log(user)
    if(userFound){
        console.log(userFound.password, user.password)
        //bcrypt.compare espera recibir el texto a comparar primero y luego el texto hasheado
        const passwordMatched = await bcrypt.compare(user.password, userFound.password)
        console.log(passwordMatched)
        if(passwordMatched){
            return {ok: true, userFound}
        }
    }
    return {ok: false, message: 'No existe un usuario con esas credenciales!'}
}
 

module.exports = {findUserByUsername, createUser, isValidCredentials}
