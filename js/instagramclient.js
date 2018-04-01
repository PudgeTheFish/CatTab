var textArray = [
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
var randomNumber = Math.floor(Math.random()*textArray.length);

var name = textArray[randomNumber];



$.ajax({
    url: "https://igpi.ga/" + name + "/media",
    dataType: "jsonp",
    data: { count: 4 },
    success: function (json){
        for(var i in json.posts) {
            var img = document.createElement("IMG");
            img.classList.add("picture");
            img.src = json.posts[i].display_url;
            picOutput = document.getElementById("instaPics");
            picOutput.appendChild(img);


        }

        var paragraphDiv = document.getElementById("credit");
        var text = document.createTextNode("@" + name);

        paragraphDiv.appendChild(text);
    }
});