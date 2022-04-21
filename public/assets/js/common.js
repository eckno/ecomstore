//
const showLoader = (loader, btnText) => {
    //
   try{
       //
       loader.style.display ="block";
       btnText.style.display ="none";
   }
   catch (e) {
       return "Please parse in a valid param"
   }
}

const hideLoader = (loader, btnText) => {
    //
    try{
        loader.style.display ="none";
        btnText.style.display ="block";
    }
    catch (e) {
        return "Please parse in a valid param"
    }
}
//
const redirectUrl = (url) => {
    try{
        //
        location.href = url;
    }
    catch (e){
        return e;
    }
}