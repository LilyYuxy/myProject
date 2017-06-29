define(["jquery","form", "cookie"], function($){
	$(function(){
        $("#form-login").submit(function(){
            $(this).ajaxSubmit({
                url: "/api/login",
                type: "post",
                success: function(data){
                    console.log(data);
                    if(data.code == 200){
                        $.cookie("userinfo",JSON.stringify(data.result),{path:'/'});
                        location.href = "/";
                    }
                },
                error: function(){
                   console.log("error"); 
                }
            });
            return false;
        });
        
    });
});