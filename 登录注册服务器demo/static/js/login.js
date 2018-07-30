$(function(){
  //验证用户名是否为非法值
  function check_word(ass_val,pass_val,verifyPass){
    var re = /^[a-zA-Z0-9]{6,20}$/;
    //验证账户名是否为空
    if(!ass_val){
      return 0
    }
    //验证账户名是否符合要求
    else if (!re.test(ass_val)) {
      return 1
    }
    //验证密码是否为空
    else if (!pass_val){
      return 2
    }
    //验证二次密码是否正确
    else if (verifyPass){
      return 3
    }
    else{
      return 4
    }
  }

  //二次验证输入密码
  function verifyPassword(){
    var pass = $("input[type='password']");
    for(var i = 0 ; i<pass.length ; i++){
      //以第一个密码框的输入密码验证其他密码输入框密码，如果有不相同的返回true，否则false
      if(pass[0].value !== pass[i].value){
        return true
      }
    }
    return false
  }

  //插入错误信息以及插入动画
  function insertErrorMessage(determine,insertElement){
    if(!!$("#tip")[0]){
      $("#tip").remove()
    }
    switch(determine){
      //插入用户名为空错误信息
      case 0:
      $("input[type='text']").after(insertElement);
      insertElement.text("用户名不能为空");
      insertElement.slideDown();
      $("input[type='text']").focus(function(e){
        e.stopPropagation()
        $("#tip").slideUp()
      })
      return true
      //插入用户名不符合要求错误信息
      case 1:
      $("input[type='text']").after(insertElement);
      insertElement.text("用户名非法,6至20为的大小写字母，可以包含数字");
      insertElement.slideDown();
      $("input[type='text']").focus(function(e){
        e.stopPropagation()
        $("#tip").slideUp()
      })
      return true
      //插入密码为空错误信息
      case 2:
      $("input[type='password']").after(insertElement);
      insertElement.text("密码不能为空");
      insertElement.slideDown();
      $("input[type='password']").focus(function(e){
        e.stopPropagation()
        $("#tip").slideUp()
      })
      return true
      //插入二次密码错误信息
      case 3:
      $("input[placeholder='重复密码']").after(insertElement);
      insertElement.text("两次输入的密码不相符");
      insertElement.slideDown();
      $("input[placeholder='重复密码']").focus(function(e){
        e.stopPropagation()
        $("#tip").slideUp()
      })
      return true
    }
  }

  //操作DOM
  function isview(){
    var ishas=check_word($("input[type='text']").val(),$("input[type='password']").val(),verifyPassword())
    var tip = $("<span id='tip' style='display:none'></span>");
    if(ishas!==4){
      return insertErrorMessage(ishas,tip);
    }
    return false
  }
  //提示信息动画
  function errorAnimate(){
    $("#message").css("top","7%")
    $("#message").animate({top:"10%",opacity:".8"},500,function(){
      setTimeout(function(){
        $("#message").animate({top:"13%",opacity:"0"},500,);
      },1500)
    })
  }
  // $(document).click(function(){
  //   console.log(isview())
  // })
  //提交验证
  $($(":button")[0]).on("click",function(e){
    if(!isview() && !!$(".signup")[0]){
      $.post("signup.html",{
        username:$(":text").val(),
        password:$(":password").val()
      },function(data,status){
          if(!!data){
            $("#message").text("注册成功");
            $($(":button")[1]).click()
            errorAnimate();
          }else{
            $("#message").text("账号已注册,请重新输入");
            $(":text").val("");
            errorAnimate();
          }
      })
    }else if(!isview() && !!$(".login")[0]){
      $.post("login.html",{
        username:$(":text").val(),
        password:$(":password").val()
      },function(data,status){
          if(!!data){
            $("#view_msg>ul").slideUp(1000,function(){
              $("#view_msg>ul").empty().append($("<h1 style='none'>登录成功,欢迎你"+data+"</h1>"));
              $("#view_msg>ul").css({
                boxShadow:"none",
                background:"none",
                top:"30%",
                textShadow:"3px 3px 5px #ccc"
              })
              $("#view_msg>ul").fadeIn(1000)
              $("h1").fadeIn(1000)
            })

          }else{
            $("#message").text("登录失败，账号或密码错误！");
            $(":password").val("");
            errorAnimate();
          }
      })
    }
  })

  //注册按钮
  $($(":button")[1]).click(function(e){
    e.stopPropagation()
    if($(this).val() == "注册"){
      $("#view_msg>ul").slideUp(1000,function(){
        $("#forms").attr("class","signup");
        $("#view_msg>ul>li :header").text("用户注册");
        $(":text").attr("placeholder","输入账户");
        $(":password").after($("<input type='password' placeholder='重复密码'>"));
        $($(":button")[0]).attr("value","注册");
        $($(":button")[1]).attr("value","返回")
        $("#view_msg>ul").slideDown(1000)
      })
    }
    else{
      $("#view_msg>ul").slideUp(1000,function(){
        $("#forms").attr("class","login");
        $("#view_msg>ul>li :header").text("用户登录");
        $(":text").attr("placeholder","账户");
        $("input[placeholder='重复密码']").remove();
        $($(":button")[0]).attr("value","登录");
        $($(":button")[1]).attr("value","注册");
        $("#view_msg>ul").slideDown(1000)
      })
    }
  })
  $("input[type='text']").val("")
})
