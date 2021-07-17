/* Global Variables */
const myWebWither = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const myKey = '&appid=7bed822e8cba4d41d6f4b311e6729954';
const extraUnits = '&units=imperial';

const postToLocalData = {};
//const getfromLocalData = {};





// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event litener to the button
document.getElementById('generate').addEventListener('click', appWork);


function appWork(){
    // adjusting the url
    let myZip =  document.getElementById('zip').value;
    
    if (((isNaN(myZip)) || ((myZip == '')))) {
        window.alert('ZIP code you entered is Incorrect\nFor a testing purpose we will put New York as example');
    myZip = '10001';
    document.getElementById('zip').value = '10001';
    
    }
    const openWeathewUrl = myWebWither + myZip + myKey + extraUnits;

    // three asynchronous functions - read from openweather - write to the swever - read frpm the server
    getOpenWeather(openWeathewUrl)
    
    .then(function(){
        

    postLocal('/sendData', postToLocalData)
    })
      .then(function(getfromLocalData){
        getLocal('/receiveData')
      })

  }
  

 

  


// Async POST
const postLocal = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      
        const getfromLocalData = await response.json();
        return getfromLocalData;
      
    }catch(error) {
       
    console.log("errorpostLocal", error);
    }
};


// Async GET
const getLocal = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    
    const finalData = await request.json();
        document.getElementById('contry').innerHTML = "City: " + finalData.City;
        document.getElementById('date').innerHTML = "Date: " + finalData.Date;
        document.getElementById('temp').innerHTML = "Temperature: " + finalData.Temp + '<span>&#8457;</span>';
        document.getElementById('content').innerHTML = "User Message: " + finalData.Feel;
    }
    catch(error) {
        
      console.log("errorgetLocal", error);
    }
  };

// Async GET from openweather
const getOpenWeather = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
        const dataWeather = await request.json()
        postToLocalData.City = dataWeather.name + ' , ' + dataWeather.sys.country;
        postToLocalData.Temp = dataWeather.main.temp;
        postToLocalData.Feel = document.getElementById('feelings').value;
        postToLocalData.Date = newDate;
 
    }
    catch(error) {
        
      console.log("errorgetOpenWeather", error);
      
    }
  };