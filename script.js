
const closeButton=document.getElementById("closeicon")
function letsChat(){
    window.open("https://t.me/Priyanshuk_01",'_blank'); 
}
var counter= 0

function closeAndOpenPopUP(){
    const popUpWindow=document.getElementById("popup_window")
    if(counter==0){
        popUpWindow.style.display="block"
        counter++;

    }
    else{
        popUpWindow.style.display="none";
        counter--
    }
    
}
