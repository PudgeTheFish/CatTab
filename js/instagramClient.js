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
    "maru_the_cat",
    "iamlilbub",
    "bonebone29"
];

arrayPets["dogs"] = [
    "simba.thesamoyed",
    "thedogist",
    "brussels.sprout",
    "samsonthedood",
    "marniethedog",
    "loki_the_wolfdog",
    "itsdougthepug",
    "jiffpom",
    "marutaro",
    "manny_the_frenchie",
    "crumpetthecorgi"
];

arrayPets["birds"] = [
    "ducksmakegreatpets",
    "adventures_of_roku",
    "gotcha_the_cockatoo",
    "rhea_thenakedbirdie",
    "katies_birds",
    "irn_rio",
    "lory.lorikeet",
    "beakertheparrotlet",
    "royalbirdy",
    "capone_the_bird",
    "rosiethelovie"
];

window.onload=function() {
    console.log("window is loaded");
    document.getElementById("dropdownButton").addEventListener("click", myFunction);
    document.getElementById("catsButton").addEventListener("click",
        function() {
            changePet("cats");
        });
    document.getElementById("dogsButton").addEventListener("click",
        function() {
            changePet("dogs");
        });
    document.getElementById("birdsButton").addEventListener("click",
        function() {
            changePet("birds");
        }
        );
};

var defaultVal = "cats";
chrome.storage.sync.get({"petType": defaultVal}, function(item) {
    var petType = item.key;
    if (petType === "undefined"){}
    else {
        console.log("petType is " + item.petType);
    }
    loadPics(item.petType);
});

//onClick function
function changePet(type) {
    closeMenu();
    chrome.storage.sync.set({"petType": type});
    loadPics(type);
    document.getElementById("instaPics").innerHTML = "";
    document.getElementById("credit").innerHTML = "";
    console.log("changePet was called");
}

function loadPics(type) {
    var petType = type;
    var randomNumber = Math.floor(Math.random()*arrayPets[petType].length);
    var name = arrayPets[petType][randomNumber];

    $.ajax({
        url: "https://www.instagram.com/" + name + "/?__a=1",
        dataType: "json",
        //data: { count: 4 },

        success: function (data){
            //for (var imgs in document.getElementById("instaPics").children){
                //delete each image
            //}
            var json = JSON.stringify(data);
            json = JSON.parse(json);

            for (var item in json.graphql.user.edge_owner_to_timeline_media.edges) {
                var img = document.createElement("IMG");
                img.classList.add("picture");
                img.src = json.graphql.user.edge_owner_to_timeline_media.edges[item].node.display_url;
                picOutput = document.getElementById("instaPics");
                picOutput.appendChild(img);
            }

            var paragraphDiv = document.getElementById("credit");
            var text = document.createTextNode("@" + name);
            paragraphDiv.textContent.replace("@" + name);
            paragraphDiv.appendChild(text);
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