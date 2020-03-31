<?php
if(isset($_POST['products'])){
    $data=$_POST['products'];
    echo "<ul>";
    foreach($data as $product){
        echo"<li>";
        foreach($product as $key => $val){
            echo $key.": ".$val." ";
        }
        echo "</li>";
    }
    echo "</ul>";

}