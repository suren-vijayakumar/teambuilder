function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function shuffle(array) {// Fisher–Yates Shuffle
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}


var cohortAppend = function(myArray, noTeams) {

    $(".cohortDiv").children().remove();
    for(var c=0; c<noTeams; c++) {
        $(".cohortDiv").append("<div class ='group" + (c+1) +"'> <p>Group</p>" + (c+1) + "</div>");
        for (var f = 0; f < myArray[c].length; f++) {
            $(".cohortDiv").append("<div class='name'> "+ myArray[c][f].name + "</div>");
            //$(".name").append("<p> " + myArray[c][f].name + "</p>");
        }
    }

};



$(document).ready(function(){
    var gammaArray=[];
    var i = 0;
    var p=0;
    $.ajax({
        type: "GET",
        url: "/data",
        dataType: 'json',
        success: function (data) {
            for(var i= 1; i<=22; i++) {
                gammaArray.push(data[i]);
            }
            console.log(gammaArray);
        }

    });


    $('.cohortDiv').append("<button class='2teamButton btn btn-primary btn-lg'>2</button>");
    $('.cohortDiv').append("<button class='3teamButton btn btn-primary btn-lg'>3</button>");
    $('.cohortDiv').append("<button class='4teamButton btn btn-primary btn-lg'>4</button>");
    $('.cohortDiv').append("<button class='5teamButton btn btn-primary btn-lg'>5</button>");
    $('.cohortDiv').append("<button class='6teamButton btn btn-primary btn-lg'>6</button>");
    $('.cohortDiv').append("<button class='7teamButton btn btn-primary btn-lg'>7</button>");
    $('.cohortDiv').append("<button class='8teamButton btn btn-primary btn-lg'>8</button>");
    $('.cohortDiv').append("<button class='9teamButton btn btn-primary btn-lg'>9</button>");
    $('.cohortDiv').append("<button class='10teamButton btn btn-primary btn-lg'>10</button>");
    $('.cohortDiv').append("<button class='11teamButton btn btn-primary btn-lg '>11</button>");
    $('.cohortDiv').append("<button class='randomButton btn btn-warning btn-lg'>random</button>");



    $("body").on('click', '.2teamButton', function() {
        console.log("teamButton2 clicked!");
        noTeams=5;

    });

    $("body").on('click', '.randomButton', function() {

        p = Math.floor((gammaArray.length)/noTeams);// whole number people per team
        var teamArray =[];
        gammaArray= shuffle(gammaArray);
        for(var j=0; j<noTeams; j++){
            var tempArray=[];
            for (var k= j*p; k<p*(j+1); k++){
                tempArray.push(gammaArray.pop());

            }
            teamArray.push(tempArray);
        }

        var b= gammaArray.length; // getting the length of the remaining people
        for (var a=0; a<b; a++){
            teamArray[a].push(gammaArray.pop());
        }
        console.log(teamArray);
        cohortAppend(teamArray, noTeams);

    });


});