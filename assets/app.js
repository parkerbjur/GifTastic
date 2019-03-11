

let termArray = [
            "Crocodile",
            "Kangaroo",
            "Dog",
            "Cat",
            "Polar Bear",
            "Iquana",
            "Fox",
            ]
let searchTerm;
let limit = 10;
let gifArray = [];


// Make the AJAX call to GIPHY API
function loadArray () {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=qxDRTRuyMxSpb24QwSsQfR25opOROZfM&limit=10&rating=pg-13';
    $.ajax({ url: queryURL, method: 'GET' })
    .done(function (response){
        for(i=0; i < response.data.length; i++){
            let gif = response.data[i]
            gifArray[i] = gif;
        }
        appendElements();
    ;})
}

function clearElements () {
    $("#gifContainer").remove();
    $("#gifContainerDiv").append("<div id='gifContainer'></div>")
}

function appendElements () {
    clearElements();
    $(".gifContainer").empty();
    for(i=0; i < gifArray.length; i++){
        let image = `<span><p>${gifArray[i].rating}</p><img src="${gifArray[i].images.fixed_height.url}" onclick='changeImage(event);' position=${i} status="gif"></span>`
        $("#gifContainer").append(image);
    }
}

function handleClick (e) {
    searchTerm = e.currentTarget.innerText
    loadArray();
}

function setup () {
    for(i=0; i < termArray.length; i++){
        let button = `<button class="gifButton" onclick="handleClick(event);">${termArray[i]}</button>`;
        $("#buttonContainerDiv").append(button);
    }
}

function changeImage (event) {
    let status = event.path[0].getAttribute("status")
    console.log(status)
    let position = event.path[0].getAttribute("position")
    console.log(position)
    if(status == "gif"){
        event.path[0].src = gifArray[position].images.fixed_height_still.url
        event.path[0].setAttribute("status", "still")
    }
    if(status == "still"){
        event.path[0].src = gifArray[position].images.fixed_height.url
        event.path[0].setAttribute("status", "gif")
    }
}

function addButton () {
    let buttonText = $("#buttonText").val();
    let button = `<button class="gifButton" onclick="handleClick(event);">${buttonText}</button>`;
    $("#buttonContainerDiv").append(button);
    $("#buttonText").val('');
}

//$(".gifButton").on("click", handleClick())
