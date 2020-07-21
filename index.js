function getRandomFoods() {
    const url = "https://api.spoonacular.com/recipes/random?number=12&apiKey=c27618bedd4b4071b925b766be18e0a4";
    let recipes = Object(); //dictionary

    $.getJSON(url, function(data) {
        for (let i = 0; i < data.recipes.length; i++) {
            recipes[i] = [data.recipes[i].id, data.recipes[i].title, data.recipes[i].image];
        }

        displayFoods(recipes);
    });
}


function displayFoods(recipes) {
    console.log(recipes);
    var boxes = document.getElementsByClassName("myGridContainer")[0].children;


    for (let i = 0; i < boxes.length; i++) {
        //children[0] = div (the image of food shown)
        //children[1] = p (the title of food shown)

        boxes[i].children[0].style.backgroundImage = "url(" + recipes[i][2] + ")";
        console.log(recipes[i][2])

        // some may not have images... take care of that

        boxes[i].children[0].style.maxHeight = "100%";
        boxes[i].children[0].style.maxWidth = "100%";
        boxes[i].children[0].style.objectFit = "cover";

        //boxes[i].children[0].style.backgroundSize = "cover";



        boxes[i].children[1].textContent = recipes[i][1];


        boxes[i].addEventListener("click", function() {
            infoPage(recipes[i]);
        });

        // When mouse if over block, show title
    }
}


function infoPage(recipeInfo) {
    window.location = "infoPage.html" + "?id=" + recipeInfo[0] + ",title=" + recipeInfo[1] + ",img=" + recipeInfo[2];
}


getRandomFoods();






/*
$(document).ready(function() {
    console.log("this is a test")
    fetch('https://www.googleapis.com/youtube/v3/activities?key=AIzaSyAYx8S1WBcGNYgSN6RwY41NZNC-h_dKXlU&part=snippet&channelId=UC-lHJZR3Gqxm24_Vd_AJ5Yw')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch( (err) => {
        console.log(err)
    })
})
*/




/*
function authenticate() {
    console.log("2");


    //return gapi.auth2.getAuthInstance()
    //    .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
    //    .then(function() { console.log("Sign-in successful"); },
    //          function(err) { console.error("Error signing in", err); });
    //
}

function loadClient() {
    console.log("3");

    gapi.client.setApiKey("AIzaSyAYx8S1WBcGNYgSN6RwY41NZNC-h_dKXlU");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    console.log("4");

    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 5,
      "q": "grilled cheese sandwich",
      "type": [
        "video"
      ],
      "videoEmbeddable": "true",
      "videoLicense": "creativeCommon"
    }).then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
}

function searchByKeyword() {
  console.log("searchByKeyword()");
  console.log(YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25}));
}


//var videoArray;

//gapi.load("client", function() {

const popularFoods = ["pizza", "sushi", "ramen", "tacos",
                      "sashimi", "paela", "jiaozi", "cheeseburger",
                      "mochi", "dim sum", "risotto", "hamburger",
                      "croisant", "cupcake", "roti", "mac and cheese"];

for (let i = 0; i < 1; i++)
    getVideos(i);

//console.log(videoArray);

//});

function getVideos(i) {
    console.log("food = " + popularFoods[i]);

  $.ajax({
    type: "GET",
    url: "https://www.googleapis.com/youtube/v3/search",
    data: {
        key: "AIzaSyAYx8S1WBcGNYgSN6RwY41NZNC-h_dKXlU",
        q: "sushi",
        part: "snippet",
        maxResults: 10,
        type: "video",
        videoEmbeddable: true,
        videoLicense: "creativeCommon",
        videoCategoryId: "26",
        relevanceLanguage: "EN"
    },
    success: function(data) {
        console.log(data);
        //displayVideos(data.items);
    },
    error: function(response) {
        console.log("Request Failed");
    }
  });
}

function displayVideos(videoArray) {
    console.log(videoArray);

    var boxes = document.getElementsByClassName("myGridContainer")[0].children;

    //for (let i = 0; i < boxes.length; i++) {
        // if recipes[j] is null, do shit

    boxes[i].style.backgroundImage = "url(" + videoArray.snippet.thumbnails.default.url + ")";
    boxes[i].style.maxHeight = "100%";
    boxes[i].style.maxWidth = "100%";
    boxes[i].style.objectFit = "fill";
    //}

    //for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function() {
        infoPage(videoArray[i].id.videoId);
    });
    //}
}


function infoPage(videoID) {
    //window.open("infoPage.html", "_self");
    window.location = "infoPage.html" + "?id=" + videoID;
}
*/
