const form = document.getElementById("regForm");
const getLoader = document.getElementById("sploader");
const getSpText = document.getElementById("sptext");
//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //
    showLoader(getLoader, getSpText);
    //
    const email_ = $("#regForm #email").val();
    const fname_ = $("#regForm #fname").val();
    const phone_ = $("#regForm #phone").val();
    const pass_ = $("#regForm #auth").val();
    const pass_t_ = $("#regForm #auth_t").val();
    //
    if(email_ == "" || fname_ =="" || pass_ == "" || pass_t_ == ""){
        //
        hideLoader(getLoader, getSpText);
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have to fill all fields!',
            footer: '<a href="">Please check that all fields are filled correctly?</a>'
          })
    }else if(pass_.length < 5){
        //
        hideLoader(getLoader, getSpText);
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password should be more than five(5) characters',
            footer: '<a href="/">Invalid Password !</a>'
          })
    }
    else if(pass_ != pass_t_){
        //
        hideLoader(getLoader, getSpText);
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Mismatch password!',
            footer: '<a href="">Please check that your password\'s match?</a>'
          })
    }
    
    //
    const udata = {
        email: email_,
        fullname: fname_,
        password: pass_,
        password_t: pass_t_,
        phone: phone_,
        isasync: true
    }

    //
    $.ajax({
        type: "POST",
        url: "/register",
        dataType: "JSON",
        data: udata,
        success: function (res){
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Account registered successfully'
              })
              //
              setTimeout(() => {
                  redirectUrl("/login");
              }, 3000);
        },
        error: function (errorResp){
            //
            hideLoader(getLoader, getSpText);
            //
            if(errorResp.responseJSON.success == false)
            {
                //
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorResp.responseJSON.errors.message,
                    footer: '<a href="">Bad Request</a>'
                  })
            }
        }
    });
});
//