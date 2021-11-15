$(function(){
  function calculation(){
    let result = (params.percent*slider_1.value)-slider_2.value;
    $("#result").html(result.toLocaleString());
  }
  function slider_number(selector, param){
    $(selector).html(param.toLocaleString()+" руб.");
  }
  let params = {
    slider_1:{
      value: 500000
    },
    slider_2:{
      value: 125000
    },
    percent: 1.5 
  }
  $(".input_email").inputmask("email");
  $(".input_phone").mask("9-999-999-99-99");
  
  $("#slider_1").ionRangeSlider({
    skin: "big",
    type: "single",
    min: 10000,
    max: 1000000,
    from: 500000,
    hide_min_max: true,
    hide_from_to: true,
    onStart: function (data) {
      params.slider_1.value= data.from;
      selector="#slider_1_result";
      slider_number(selector,params.slider_1.value);
    },
    onChange: function (data) {
      params.slider_1.value= data.from;
      selector="#slider_1_result";
      slider_number(selector,params.slider_1.value);
      calculation();
    }
});
  $("#slider_2").ionRangeSlider({
    skin: "big",
    type: "single",
    min: 50000,
    max: 200000,
    from: 125000,
    hide_min_max: true,
    hide_from_to: true,
    onStart: function (data) {
      params.slider_2.value= data.from;
      selector="#slider_2_result";
      slider_number(selector,params.slider_2.value)
    },
    onChange: function (data) {
      params.slider_2.value= data.from;
      selector="#slider_2_result";
      slider_number(selector,params.slider_2.value)
      calculation();
    }
  });
  $(".page3 .section1 .form-group:nth-of-type(4)>div>div>.text_number").on("click", function(){
    
    for (let i=0; i<3; i++){
      let percents= $(".page3 .section1 .form-group:nth-of-type(4)>div>div>.text_number");
      if (percents.eq(i).hasClass("clicked")){   
        $(percents[i]).css({
          "background-color": "black",
          "color": "white"
        });
        $(percents[i]).removeClass("clicked");
      }
    }
    $(this).addClass("clicked");
    $(this).css({
      "background-color": "white",
      "color": "black"
    });
    switch($(this).index()){
      case 0:
        params.percent = 1.5;
        break;
      case 1:
        params.percent = 2;
        break;
      case 2:
        params.percent = 2.5;
        break;
    }
    calculation();
  });
  $(".btn-close").on("click",function(e){
    let email_reset = $(this).parent().parent().children().children().children("input").eq(0);
    let phone_reset = $(this).parent().parent().children().children().children("input").eq(1);
    email_reset.val("");
    phone_reset.val("");
  })
  $(".modal-body .butn").on("click", function(e){
    let modal_body = $(this).parent().parent();
    console.log($(this).parent().parent().parent().children(".modal-header").children(".btn-close")[0]);
    let legend = modal_body.children("legend").eq(0).html();
    let email = modal_body.children().children("input").eq(0).val();
    let phone = modal_body.children().children("input").eq(1).val();
    let email_reset = modal_body.children().children("input").eq(0);
    let phone_reset = modal_body.children().children("input").eq(1);
    if ((email!="")&&(phone!="")){
      modal_body.children().children(".invalid-feedback").eq(0).css({"display": "none"});
      modal_body.children().children("input").eq(0).removeClass("invalid-input");
      modal_body.children().children("input").eq(0).addClass("success");
      modal_body.children().children(".invalid-feedback").eq(1).css({"display": "none"});
      modal_body.children().children("input").eq(1).removeClass("invalid-input");
      modal_body.children().children("input").eq(1).addClass("success");
      let obj = {
        "legend": legend,
        "email": email,
        "phone": phone
      }
      obj = JSON.stringify(obj);
      $.ajax({
        url: "ajax/send_form.php",
        data: obj,
        type: "POST",
        dataType: "json",
        success: function(msg){
          if (msg.empty_email=="ok"){
          }else{
          }
          if (msg.empty_phone=="ok"){
          }else{
          }
          if (msg.error_email!=""){
            console.log(msg.error_email);
          }
          if (msg.success=="ok"){
            modal_body.parent().children().children(".btn-close")[0].click();
            var answer_modal = new bootstrap.Modal($('#sending'));
            answer_modal.show();
            email_reset.val("");
            phone_reset.val("");
          }
        },
        error: function(msg){
          alert(msg.responseText);
        }
      });
    }else{
      if ((email=="")){
        modal_body.children().children(".invalid-feedback").eq(0).css({"display": "block"});
        modal_body.children().children("input").eq(0).removeClass("success");
        modal_body.children().children("input").eq(0).addClass("invalid-input");
      }else{
        modal_body.children().children(".invalid-feedback").eq(0).css({"display": "none"});
        modal_body.children().children("input").eq(0).removeClass("invalid-input");
        modal_body.children().children("input").eq(0).addClass("success");
      }
      if ((phone=="")){
        modal_body.children().children(".invalid-feedback").eq(1).css({"display": "block"});
        modal_body.children().children("input").eq(1).removeClass("success");
        modal_body.children().children("input").eq(1).addClass("invalid-input");
      }else{
        modal_body.children().children(".invalid-feedback").eq(1).css({"display": "none"});
        modal_body.children().children("input").eq(1).removeClass("invalid-input");
        modal_body.children().children("input").eq(1).addClass("success");
      }
      modal_body.parent().children().children(".btn-close")[0].addEventListener('click', function () { // Для демонстрации - при нажатии на вторую кнопку
        modal_body.children().children(".invalid-feedback").eq(0).css({"display": "none"});
        modal_body.children().children("input").eq(0).removeClass("invalid-input");
        modal_body.children().children("input").eq(0).addClass("success");
        modal_body.children().children(".invalid-feedback").eq(1).css({"display": "none"});
        modal_body.children().children("input").eq(1).removeClass("invalid-input");
        modal_body.children().children("input").eq(1).addClass("success");
        email_reset.val("");
        phone_reset.val("");
      })
    }
  });
  calculation();
});
