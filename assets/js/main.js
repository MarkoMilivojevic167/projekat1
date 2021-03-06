$( document ).ready(function() {

    setTimeout(function() {
        $("#notification").hide();
    }, 2000);

    $("#mySidenav").hide();

    menu();
    
    getProducts();

    
});


function getProducts(){
    $.ajax({
        url:"data/products.json",
        dataType:"JSON",
        success:function(data){
            var products = data;
            var rightProduct = [];

            sortProducts(products)
            printProducts(products,"leftContent"); 

            $("#rightButton").click(function(){
                checkedProduct(products,"leftContent","rightContent")
            });
            
            $("#leftButton").click(function(){
                checkedProduct(rightProduct,"rightContent","leftContent")   
            });

            $('#leftButton').on('click',function(){
                insertProduct(products,"leftContent");
            });

            $('#rightButton').on('click',function(){
                insertProduct(rightProduct,"rightContent");
            }); 


            $("#c").click(function(){    
                sendProducts(rightProduct);
            });

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
  
function products(item,side="leftContent"){
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
        $("#mySidenav").slideToggle(400);
        document.querySelector("#hamburger").classList.toggle("change");
    });
    
}


function disableButton(data,button){
    if(data.length==0){
        document.querySelector(button).style.cursor="not-allowed";
    }else{
        document.querySelector(button).style.cursor="pointer";
    }
}

function sortProducts(data) {
    data.sort((a, b) => {
      return a.id - b.id;
    });
}

function insertProduct(data,content){
    var idDelete = [];
    $.each($(`.check${content}:checked`), function(){
        idDelete.push(parseInt(($(this).val())));
    });
                
    for (var i = 0; i < data.length; i++) {
    var obj = data[i];

    if (idDelete.indexOf(obj.id) !== -1) {
            data.splice(i, 1);
            i--;             
        }
    }

    if(content=="rightContent"){
        disableButton(data,"#rightButton");
    }else{
        disableButton(data,"#leftButton");
    }
    sortProducts(data);
    printProducts(data,content);
}

function checkedProduct(data,content,checkbox){
    $.each($(`.check${checkbox}:checked`), function(){
        data.push({
            id : parseInt($(this).val()),
            name :  $(this).attr('name')
        });
    });

    if(content=="rightContent"){
        disableButton(data,"#rightButton");
    }else{
        disableButton(data,"#leftButton");
    }

    sortProducts(data);
    printProducts(data,content);
}

function sendProducts(data){
    $.ajax({
        url:"obrada.php",
        type:"POST",
        data:{
            products:data
        },
        success:function(data){
            chcekProductsNumber(data);
        },
        error:ajaxError
});
}

function chcekProductsNumber(data){

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
}