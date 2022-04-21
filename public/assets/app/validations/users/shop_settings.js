const shop_details_form = document.getElementById("b_details_form");
const shop_details_form_btn_sub = document.getElementById("b_details_form_btn_sub");

//
shop_details_form.addEventListener("submit", (e) => {
    e.preventDefault();
    //
    showLoader(shop_details_form_btn_sub);
    //
    var bname = shop_details_form['b_name'].value;
    var bslogan = shop_details_form['b_slogan'].value;
    var bemail = shop_details_form['b_email'].value;
    var bnumber = shop_details_form['b_number'].value;
    var baddress = shop_details_form['b_address'].value;
    var bdescription = shop_details_form['b_description'].value;
    var socialfb = shop_details_form['social_fb'].value;
    var socialinsta = shop_details_form['social_insta'].value;
    var socialtwit = shop_details_form['social_twit'].value;
    //
    if(bname =="" || bemail =="" || baddress == ""){
        hideLoader(shop_details_form_btn_sub, "Save");
        return notif({
            type: "error",
            msg: "<b>Error: </b>Please fill all required field.",
            position: "center",
            width: 500,
            height: 60,
            autohide: false
        });
    }
    //
    var set_data = {
        bname: bname,
        bslogan: bslogan,
        bemail: bemail,
        bnumber:bnumber,
        baddress: baddress,
        bdescription: bdescription,
        socialfb: socialfb,
        socialinsta: socialinsta,
        socialtwit: socialtwit
    }
    //
    $.ajax({
        type: "POST",
        url: "/dashboard/settings/shop",
        dataType: "JSON",
        data: set_data,
        success: function(resp){
            //
            hideLoader(shop_details_form_btn_sub, "Save");
            console.log(resp['data']);
            if(resp['data'].success)
            {
                return notif({
                    msg: "<b>Success:</b> Saved successfully",
                    type: "success"
                });
            }
        },
        error: function(errorResp){
            //
            hideLoader(shop_details_form_btn_sub, "Save");
            return notif({
                type: "error",
                msg: `<b>Error: </b>${errorResp['responseJSON'].errors}`,
                position: "center",
                width: 500,
                height: 60,
                autohide: true
            });
        }
    })
})

//
const showLoader = (btn) => {
    btn.innerHTML =`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>`;
}
///
const hideLoader = (btn, text) => {
    btn.innerHTML = text;
}