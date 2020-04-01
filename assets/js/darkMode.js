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
    $(".contentDarkNone").addClass("contentDark");
    $(".buttonContent").addClass("darkButtonContent");
    $(".darkSidenavNone a, .darkSidenavNone p,darkSidenavNone,h2 ").addClass("darkSidenav");
    $(".bar").addClass("darkHamburger");
    $("#desginBy img").attr("src", "assets/images/logoWhite.png");
    $(".switch--horizontal .toggle-outside").addClass("darkModeDugmeNapolje");
}

function vracanjeBoje(){
    $('body').removeClass('dark');
    $(".contentDarkNone").removeClass("contentDark");
    $(".buttonContent").removeClass("darkButtonContent");
    $(".darkSidenavNone a, .darkSidenavNone p ,darkSidenavNone, h2").removeClass("darkSidenav");
    $(".bar").removeClass("darkHamburger");
    $("#desginBy img").attr("src", "assets/images/logo.png");
    $(".switch--horizontal .toggle-outside").removeClass("darkModeDugmeNapolje");
}

});