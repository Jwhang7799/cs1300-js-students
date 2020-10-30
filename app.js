var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=g7kOODin_YFO-PZOvw5lrBaO1gH5_Adp0drBHV4qJjU";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

const displayContent = () => {
  corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      getData(request.response);
    })
  );
}

const getData = (response) => {
  const plantData = JSON.parse(response).data;
  console.log(plantData[0]);
  var filterPlant = plantData.filter(data => {
    return data.year > 1753; 
  });
  addToDom(filterPlant);
}

const addToDom = (plantArr) => {
  for (plant of plantArr) {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute("class", plant.common_name);

    const plantName = document.createElement('h3');
    plantName.innerText = plant.common_name;

    const imgUrl = plant.image_url;
    const plantImg = document.createElement('img');
    plantImg.setAttribute('src', imgUrl);

    wrapperDiv.appendChild(plantName);
    wrapperDiv.appendChild(plantImg);

    document.getElementById("plants").appendChild(wrapperDiv);
  };
}
