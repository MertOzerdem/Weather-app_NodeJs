const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    messageOne.textContent= "loading...";
    messageTwo.textContent= "";

    //const fetchAddress = "http://localhost:3000";
    const fetchAddress = "";
    let targetLocation = search.value;
    const fetchAddressWithQuesry = fetchAddress + "/weather?address=" + targetLocation;

    fetch(fetchAddressWithQuesry).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                messageOne.textContent= data.error;
            }
            else{
                console.log(data);
                messageOne.textContent= "Temperature is " + data.temperature + " Celcius," +
                                        " and feelslike " + data.feelslike + " Celcius";
                messageTwo.textContent= "At " + data.location;
            }
            
        })
    })
})
