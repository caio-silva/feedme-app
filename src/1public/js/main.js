$(document).ready(function(){
  //ajax to post form
  $("#registerButton").click(function (){
    let form = $("form");
    $.post("http://localhost:8000/api/user/register",
    form,
    function (data, status){
      if (status == 400) alert(data.error);
      // $(location).attr('href',url);
      else alert("asdfasf")
    });
  });
});