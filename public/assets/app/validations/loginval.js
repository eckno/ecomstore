const form = document.getElementById("logForm");
const getLoader = document.getElementById("sploader");
const getSpText = document.getElementById("sptext");
//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //
    showLoader(getLoader, getSpText);
    //
    const email_ = $("#logForm #email").val();
    const pass_ = $("#logForm #auth").val();
    //
    if(email_ == "" || pass_ == ""){
        //
        hideLoader(getLoader, getSpText);
        //
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Kindly provide your email and password.',
            footer: ''
          })
    }
    
    //
    const udata = {
        email: email_,
        auth: pass_,
        isasync: true
    }

    //
    $.ajax({
        type: "POST",
        url: "/login",
        dataType: "JSON",
        data: udata,
        success: function (res){
            if(res.success === true)
            {
                //
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
                  //
                  Toast.fire({
                    icon: 'success',
                    title: 'Login successful'
                  })
                  //
                 setTimeout(() => {
                 redirectUrl("/dashboard");
                 }, 3000);
            }
              
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