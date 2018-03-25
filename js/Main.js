var name = "hosico_cat";
$.ajax({
    url: "https://igpi.ga/" + name + "/media",
    dataType: "jsonp",
    data: { count: 3 },
    success: function (json){
        for(var i in json.posts) {
            var img = document.createElement("IMG");
            img.src = json.posts[i].display_url;
            picOutput = document.getElementById("instaPics");
            picOutput.appendChild(img);
        }
    }
});