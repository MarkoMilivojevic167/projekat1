$(document).ready(function()
{
  function darkmode(){
    promenaBoje();
    localStorage.setItem("mode", "dark");
    $("#radio-b").prop("checked", true);
    }



function nodark(){
        vracanjeBoje();
        localStorage.setItem("mode", "light1");
        }

  if(localStorage.getItem("mode")=="dark")
        darkmode();
        
  else
    nodark();

$('.radio').change(function(e){   

    if ($("#radio-b").is(':checked')) 
    {
        darkmode();

        console.log("cekiran");
        this.setAttribute("checked", "checked");
        this.checked = true;
        }
    else
    {
        nodark();
        e.preventDefault(); 
        this.checked = false;
        
    }

});

function promenaBoje(){
    $('body').addClass('dark');
    $(".content").addClass("contentDark");
    $(".buttonContent").addClass("darkButtonContent");
    $(".sidenav a, .sidenav p ").addClass("darkSidenav");
    $(".hamburger").addClass("darkHamburger");
    $("#autorContainer").addClass("contentDark");
    $("#autorContainer").addClass("darkSidenav");
    $("#desginBy").addClass("contentDark");
    $("#desginBy").addClass("darkSidenav");
    $("#desginBy img").attr("src", "assets/images/logoWhite.png");
    $(".switch--horizontal .toggle-outside").addClass("darkModeDugmeNapolje");

}

function vracanjeBoje(){
    $('body').removeClass('dark');
    $(".content").removeClass("contentDark");
    $(".buttonContent").removeClass("darkButtonContent");
    $(".sidenav a, .sidenav p ").removeClass("darkSidenav");
    $(".hamburger").removeClass("darkHamburger");
    $("#autorContainer").removeClass("contentDark");
    $("#autorContainer").removeClass("darkSidenav");
    $("#desginBy").removeClass("contentDark");
    $("#desginBy").removeClass("darkSidenav");
    $("#desginBy img").attr("src", "assets/images/logo.png");
    $(".switch--horizontal .toggle-outside").removeClass("darkModeDugmeNapolje");
}

});