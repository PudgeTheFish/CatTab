// TODO: Close the dropdown menu if the user clicks outside of it

var arrayPets = {};
arrayPets["cats"] = [
    ["1733371297", "hosico_cat" ],
    ["1835767567", "white_coffee_cat"],
    ["27467826", "nala_cat"],
    ["2126993164", "cobythecat"],
    ["2364218849", "yochigin"],
    ["2002884381", "superhirocat"],
    ["2931497894", "cat_leon_"],
    ["3082806475", "BritishSweetHearts_benji_Leyla"],
    ["3046485017", "meeraf_theheadbutt"],
    ["179141085", "maru_the_cat"],
    ["30844342", "iamlilbub"],
    ["1113834473", "bonebone29"]
];

arrayPets["dogs"] = [
    ["2885393157", "simba.thesamoyed"],
    ["592328384", "thedogist"],
    ["2559954933", "brussels.sprout"],
    ["305744482", "samsonthedood"],
    ["339723842", "marniethedog"],
    ["732880793", "loki_the_wolfdog"],
    ["732880793", "itsdougthepug"],
    ["194146115", "jiffpom"],
    ["124317", "marutaro"],
    ["48699301", "manny_the_frenchie"],
    ["3634331312", "crumpetthecorgi"]
];

arrayPets["birds"] = [
    ["4026873483", "ducksmakegreatpets"],
    ["1947756211", "adventures_of_roku"],
    ["3626066976", "rhea_thenakedbirdie"],
    ["2066658283", "katies_birds"],
    ["1465513928", "irn_rio"],
    ["2289602904", "lory.lorikeet"],
    ["1032675214", "beakertheparrotlet"],
    ["1363072218", "royalbirdy"],
    ["1459744978", "capone_the_bird"],
    ["305843022", "rosiethelovie"],
    ["5565285897", "puffie_the_chow"]
];

window.onload=function() {
    console.log("window is loaded");
    document.getElementById("dropdownButton").addEventListener("click", showDropdown);
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
        });
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
    chrome.storage.sync.set({"petType": type});
    loadPics(type);
    document.getElementById("instaPics").innerHTML = "";
    document.getElementById("credit").innerHTML = "";
    console.log("changePet was called");
}

function loadPics(type) {
    var petType = type;
    var randomNumber = Math.floor(Math.random()*arrayPets[petType].length);
    var name = arrayPets[petType][randomNumber][0];

    $.ajax({
        url: "https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={\"first\":3,\"id\":\"" + name + "\"}",
        dataType: "json",

        success: function (data){
            var json = JSON.stringify(data);
            json = JSON.parse(json);

            for (var item in json.data.user.edge_owner_to_timeline_media.edges) {
                var img = document.createElement("IMG");
                img.classList.add("picture");
                img.src = json.data.user.edge_owner_to_timeline_media.edges[item].node.display_url;
                picOutput = document.getElementById("instaPics");
                picOutput.appendChild(img);
            }

            var handle = arrayPets[petType][randomNumber][1];
            var paragraphDiv = document.getElementById("credit");
            var text = document.createTextNode("@" + handle);
            paragraphDiv.textContent.replace("@" + handle);
            paragraphDiv.appendChild(text);
        }
    });
}


//dropdown menu
/* When the user clicks on the button, toggle between hiding and showing
   the dropdown content */
function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

/*
function closeMenu() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}
*/