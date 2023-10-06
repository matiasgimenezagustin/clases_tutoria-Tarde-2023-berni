
const llamarAPI = async () =>{
    let persona = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
    
    console.log(persona)
}


llamarAPI()