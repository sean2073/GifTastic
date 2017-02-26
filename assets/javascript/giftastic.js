// "document.ready" makes sure that our Javascript doesn't get run until the HTML document is finished loading.
    $(document).ready(function() {

// Initial array of topics
      var topics = ["Beyonce", "Lady Ga Ga", "Ciara", "Mariah Carey", "Madonna", "Janet Jackson", "Rihanna"];
      
      // Function for displaying movie data
      function renderButtons() {

        // Delete the content inside the topics-buttons div prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#topics-buttons").empty();
        // Loop through the array of topics (or pop stars), then generate buttons for each topic/popstar in the array
        for(var i = 0; i < topics.length; i++)
        {
          //$("#movies-view").html("<br>" + "<button type='submit' >"+ movies[i] + "<br>");
          var a = $("<button>");
          // Adding a class
          a.addClass("topic");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#topics-buttons").append(a);
          console.log(a);
        }// closes the above for loop
        $("button.topic").on("click", function(event) {
          //empty the images div.  Doing this so new images
          //appear everytime a button is clicked.
          $("#images").empty();
          //get the name of the button clicked
          var popStar = $(this).attr('data-name');
          //this is the query for the call to giphy api
          var queryURL="https://api.giphy.com/v1/gifs/search?q=" + popStar + "&api_key=dc6zaTOxFJmzC&fmt&limit=10";
          
          console.log("you clicked " + popStar);
          //construct the Ajax call
          
          $.ajax({
          url: queryURL,
          method: 'GET'
          }).done(function(response) {
            console.log(response.data);
            //the response object goes into the respArray
            var respArray = response.data;
            //the images will eventually go into the imgArray
            var imgArray = [];
            console.log(respArray);
            for(var i=0; i < respArray.length; i++){
            console.log(i);
           // $("#gif-response").html("Image Link: " + respArray[i].images.original_still.url);
            console.log("the rating is " + respArray[i].rating);
            var rating = respArray[i].rating;
            var newImg3 = $("<img>");

            newImg3.attr("src", respArray[i].images.original_still.url);
            newImg3.attr("data-still", respArray[i].images.original_still.url);
            newImg3.attr("data-animate", respArray[i].images.downsized_medium.url);
            newImg3.attr("data-state", "still");
            //newImg3.attr("gifrating", respArray[i].rating);
            newImg3.addClass("gifs");
            imgArray.push(newImg3);
           // $("#images").append(newImg3);
            //(response.Title + "<img src='" + response
            $("#images").append("<br><br><p>Rated: " + rating + "</p>");
          //  $("#images").append(newImg3 + "<br>'" + rating);
            $("#images").append(newImg3);
            
          }// closes the for loop
          console.log(imgArray);
          
          });  //closes the ajax function

      });//closes button.topic function
      }//closes renderButtons()
      //images is the parent and gifs is the child
       $("#images").on("click", ".gifs", function(event) {
        console.log("It worked!! ");
        var state = $(this).attr('data-state');
        
        console.log("The state of the gif is " + state);
        
        var animateGif = $(this).attr('data-animate');
        var stillGif = $(this).attr('data-still');
        if(state == 'still'){
          //$(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("src", animateGif);
          $(this).attr("data-state", "animate");
        }
        else{
          //$(this).attr("src", $(this).attr("data-still"));
          $(this).attr("src", stillGif);
          $(this).attr("data-state", "still");
        }

        //$(this).attr('src', respArray[0].images.preview_gif.url);
       // $("#images").append(newImg3);
       });//closes images.onclick function
      // This function handles events where the add popstar button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();

        // grab the text the user types into the input field
       
        
        var userInput = $("#topics-input").val().trim();
        console.log(userInput);

        
        // add the new pop star into the topics array
        topics.push(userInput);
        console.log(topics);

        // The renderButtons function is called, rendering the list of pop star buttons
        renderButtons();
      });
      
      // Calling the renderButtons function to display the initial list of pop stars
      renderButtons();
     });// closes document.ready function