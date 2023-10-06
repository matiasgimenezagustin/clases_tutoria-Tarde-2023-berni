const persona = {
    nombre: 'pepe',
    trabajo: 'Front end developer',
    sueldoPretendidoMesAgosto: 8000000,
    edad: 40
}

const decirInformacion = ({nombre, trabajo, sueldoPretendidoMesAgosto: sueldoPrentendido}) =>{

    console.log(`hola soy ${nombre} y trabajo como ${trabajo}.\nMi sueldo pretendido es de: $${sueldoPrentendido}`)

}

decirInformacion(persona)

const numeros = [123, 342]

const [vida, nivel] =  numeros

console.log('Mi vida es: ' + vida)
console.log('Mi nivel es: ' + nivel)

const useState = () =>['hola', (value)=>value]

const [variable, setVariable] = useState()

console.log(variable)