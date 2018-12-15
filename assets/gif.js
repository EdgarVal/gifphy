//starting buttons----------------------------------
var gifbtn = ["Batman", "Iron-Man", "Wonder-Woman", "Wolverine", "Starfire", "Captain-Planet", "Spider-Man"];

//Make buttons for gifbtn array---------------------
for (i = 0; i < gifbtn.length; i++) {
    var heroButton = $('<button>' + gifbtn[i] + '</button>');
    heroButton.attr('class', 'showGif btn-primary');        //adding bootstrap CSS styles to buttons & class name of showGif to use later      
    heroButton.attr('style', 'margin:3px;');        //adding bootstrap CSS styles to buttons
    heroButton.attr('data-hero', gifbtn[i]);
    $('#buttons-appear').append(heroButton);        //adding the buttons to the button div 
}

//Make new button from search bar input--------------
$('#searchInput').click(function () {
    var searchBar = $('#searchBar').val().trim();
    if (searchBar == "") {
        return false;   //if statement so user cant add button without typing in something first
    }
    gifbtn.push(searchBar);
    var searchedHero = $('<button>' + searchBar + '</button>');
    searchedHero.attr('class', ' showGif btn-primary');
    searchedHero.attr('style', 'margin:3px;');
    searchedHero.attr('data-hero', searchBar);
    $('#buttons-appear').append(searchedHero);
    $('#searchBar').empty();
    addClick();
    // console.log(searchBar);
})


//function to get gif API data for the hero button that is clicked-----------------------
// function addClick() {

$(".showGif").on("click", function () {
    var hero = $(this).attr("data-hero");
    // console.log(hero);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(this);
    // "&api_key=J5tY9LvkXr9LeYD9hJP0Eq6C8wUBYm5h=10"; my own api didnt work?

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        var results = response.data

        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // console.log(i)
                var gifDIV = $('<div>');        //making a div for the gifs
                var rating = results[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var heroImage = $('<img>');
                // heroImage.attr("src", results[i].images.fixed_height.url);
                heroImage.attr('src', results[i].images.original_still.url); //line gets the gif in its 'still' state
                heroImage.attr({
                    'data-still': results[i].images.original_still.url,
                    'data-animate': results[i].images.original.url,
                    'data-state': 'still',
                    'class': 'gif',

                });
                gifDIV.append(p);       //adds the variable p named, which is the img's rating, above to each image
                gifDIV.append(heroImage);
                $('#gifs-appear').append(gifDIV);

                $('.showGif').on('click', clearGifDiv);
                // $('#gif').on('click', goStop);


            }
        }

        $('.gif').on('click', function () {
            console.log('test')

            var state = $(this).attr('data-state');
            if (state === 'still') {

                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
                console.log('clicked');
            }
            if (state === 'animate') {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        })
    });
});
// }

//clear gifs div function--------------------------
function clearGifDiv() {
    $('#gifs-appear').empty();
}

//play-stop gif function----------------------
// function goStop() {

//     $("#gif").on("click", function() {
//         console.log('clicked');

//         var state = $(this).attr('data-state');
//         if(state === 'still') {
//             $(this).attr('src', $(this).attr('data-animate'));
//             $(this).attr('data-state', 'animate');
//         }
//         if (state === 'animate') {
//             $(this).attr('src', $(this).attr('data-still'));
//             $(this).attr('data-state', 'still');
//         }
//     })
//  } 
//  addClick();
