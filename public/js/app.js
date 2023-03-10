


// calling fetch in our client side JS is gonna kick off an asynchronous IO operation, much like calling a request in node JS
// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if (location == ''){
        return messageOne.textContent = 'Please enter a location.'
        
    }
    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        }else{
            console.log(data.location)
            messageOne.textContent = data.location
            console.log(data.forecast)
            messageTwo.textContent = data.forecast

        }
        
    })
})
   
})