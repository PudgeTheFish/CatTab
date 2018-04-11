var arrayPets = {};
arrayPets["cats"] = [
    "hosico_cat",
    "white_coffee_cat",
    "nala_cat",
    "cobythecat",
    "yochigin",
    "superhirocat",
    "cat_leon_",
    "BritishSweetHearts_benji_Leyla",
    "meeraf_theheadbutt",
    "maru_the_cat"
];

arrayPets["dogs"] = [
    "simba.thesamoyed"
];

arrayPets["birds"] = [
    "simba.thesamoyed"
];

window.onload=function() {
    console.log("window is loaded");
    document.getElementById("dropdownButton").addEventListener("click", myFunction);
    document.getElementById("catsButton").addEventListener("click", changePet("cats"));
    document.getElementById("dogsButton").addEventListener("click", changePet("dogs"));
    document.getElementById("birdsButton").addEventListener("click", changePet("birds"));
};

var defaultVal = "cats";
chrome.storage.sync.get({"petType": defaultVal}, function(item) {
    var petType = item.key;
    if (petType === "undefined"){}
    else {
        console.log("petType is " + item.petType);
    }
});

//onClick function
function changePet(type) {
    closeMenu();
    chrome.storage.sync.set({"petType": type});
    loadPics(type);
}

function loadPics(type) {
    var petType = type;
    var randomNumber = Math.floor(Math.random()*arrayPets[petType].length);
    var name = arrayPets[petType][randomNumber];

    $.ajax({
        url: "https://instareverseproxy.herokuapp.com/" + name + "/media",
        dataType: "jsonp",
        data: { count: 4 },
        beforeSend: function(xhr){
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        },
        success: function (json){
            for (var imgs in document.getElementById("instaPics").children){
                //delete each image
            }

            for(var i in json.posts) {
                var img = document.createElement("IMG");
                img.classList.add("picture");
                img.src = json.posts[i].display_url;
                picOutput = document.getElementById("instaPics");
                picOutput.appendChild(img);
            }

            var paragraphDiv = document.getElementById("credit");
            var text = document.createTextNode("@" + name);
            paragraphDiv.textContent.replace("@" + name);
            //paragraphDiv.appendChild(text);
        }
    });
}


//dropdown menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    console.log("myFunc is called");
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
//window.onclick = closeMenu;

function closeMenu() {
    //if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    //}
}