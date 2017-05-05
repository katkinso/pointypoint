$(document).ready(function(){

  $.ajax({
    type: 'POST',
    url: '/',
    data: {'filmTitle':imdbFilmTitle},
    success: function(data){
      //do something with the data via front-end framework
      console.log(data)
       location.reload();
    }
  });

  


  $('form#addImdbFilm').on('submit', function(){

      var imdbFilmTitle = $('#imdbFilmTitle').val()
      console.log(imdbFilmTitle)

      $.ajax({
        type: 'POST',
        url: '/',
        data: {'filmTitle':imdbFilmTitle},
        success: function(data){
          //do something with the data via front-end framework
          console.log(data)
           location.reload();
        }
      });

      return false;

  });

  $('a.film-list').on('click', function(){
      var imdbId = $(this)[0].id
      console.log($(this))
      //select the film
      $('a.film-list').attr('class', 'list-group-item film-list')
      $(this).addClass('active')
  });

});
