$( document ).ready(function() {



    setTimeout(function() {
        $("#notification").hide();
    }, 2000);


    menu();

    getProducts();

    

});


function getProducts(){
    $.ajax({
        url:"data/products.json",
        dataType:"JSON",
        success:function(data){
            var leftProducts = data;
            var rightProducts = data;

            var rightProduct = [];
            var leftProduct = [];
            
            function sortProducts(data) {
                data.sort((a, b) => {
                  return a.id - b.id;
                });
              }
            
            $("#rightButton").click(function(){
                
                $.each($(".checkrightContent:checked"), function(){
                    leftProducts.push({
                        id : parseInt($(this).val()),
                        name :  $(this).attr('name')
                    });
                });
                
                sortProducts(leftProducts)
                printProducts(leftProducts,"leftContent");
                // console.log(leftProducts);
            });
            
            
        
        
            
            $("#leftButton").click(function(){
                $.each($(".check:checked"), function(){
                    leftProduct.push({
                        id : parseInt($(this).val()),
                        name :  $(this).attr('name')
                    });
                });
                sortProducts(leftProduct)
                disableButton(leftProduct);
                printProducts(leftProduct,"rightContent");
                // console.log(leftProduct);
                
            });


            sortProducts(leftProducts)
            
            printProducts(leftProducts,"leftContent"); 

            

            $("#leftButton").click(function(){
                var idDelete = [];
                $.each($(".check:checked"), function(){
                    idDelete.push(parseInt(($(this).val())));
                });
                
                for (var i = 0; i < leftProducts.length; i++) {
                    var obj = leftProducts[i];
                
                    if (idDelete.indexOf(obj.id) !== -1) {
                        leftProducts.splice(i, 1);
                        i--;
                    }
                }
                var newArray = leftProducts.filter(function(obj) {
                    return idDelete.indexOf(obj.id) === -1;
                });
                console.log(leftProducts);
                sortProducts(leftProducts)
                printProducts(leftProducts,"leftContent"); 
            })

            $("#rightButton").click(function(){
                var idDelete = [];
                $.each($(".checkrightContent:checked"), function(){
                    idDelete.push(parseInt(($(this).val())));
                });
                console.log(idDelete);
                
                
                for (var i = 0; i < leftProduct.length; i++) {
                    var obj = leftProduct[i];

                    if (idDelete.indexOf(obj.id) !== -1) {
                        leftProduct.splice(i, 1);
                        i--;
                        
                    }
                }
                var newArray = leftProduct.filter(function(obj) {
                    return idDelete.indexOf(obj.id) === -1;
                });
                console.log(leftProduct);
                sortProducts(leftProduct);
                disableButton(leftProduct);
                printProducts(leftProduct,"rightContent"); 
            })


            $("#c").click(function(){
                
                $.ajax({
                    url:"obrada.php",
                    type:"POST",
                    data:{
                        products:leftProduct
                    },
                    success:function(data){
                        console.log(data);
                        if(data.length>0){
                            
                            $("#info").html("<div id='notification' class='notificationColorGreen'>Send!</div>");
                            setTimeout(function() {
                                $("#notification").hide(500);
                              }, 2000);
                        }else{
                            $("#info").html("<div id='notification' class='notificationColorRed'>No Products!</div>");
                            setTimeout(function() {
                                $("#notification").hide(500);
                              }, 2000);

                        }

                    },
                    error:ajaxError
            });
        })
                
                

        },error:ajaxError
    });
}

function printProducts(data,content){
    let html = "";
    for(let item of data){
        if(content=="rightContent"){
            html += products(item,"rightContent");
        }else{
            html += products(item);
        }
    } 
    $("#"+content).html(html);
}
  
function products(item,side=""){
    return `<li>  
                <div class="inputGroup">
                    <input class='check${side}' id="${item.name}" name="${item.name}" value='${item.id}' type="checkbox"/>
                    <label for="${item.name}">${item.name}</label>
                </div>
            </li>`;
}

function ajaxError(greska, status, statusText){
    console.error('GRESKA AJAX: ');
    console.log(status);
    console.log(statusText);
    if(greska.status == 500){
        console.log(greska.parseJSON);
        alert(greska.parseJSON.poruka);
    }
    else if(greska.status == 400){
        alert('Niste poslali ispravno parametre!')
    } 
  }  


  function menu(){
    document.querySelector("#hamburger").addEventListener("click",function(){
        document.querySelector("header").style.transition="1s";
        document.querySelector("#mySidenav").style.width = "100%";
        document.getElementById("mySidenav").style.display="flex";
    });
    document.querySelector("#meniLinkClose").addEventListener("click",function(){
        document.querySelector("header").style.transition="1s";
        document.querySelector("#mySidenav").style.width = "0";
        document.getElementById("mySidenav").style.display="none";
    });
}

function disableButton(data){
    if(data.length==0){
        document.querySelector("#rightButton").style.cursor="not-allowed";
    }else{
        document.querySelector("#rightButton").style.cursor="pointer";
    }
}