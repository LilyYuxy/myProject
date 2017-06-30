// <!--引用模版引擎  -->
// 定义模块化
define(["jquery","template","cookie"],function($,template){

		$(function(){

			
			// 判断当前页面的路径,是不是在登录页，不是进行如下操作
			if("/dashboard/login" != location.pathname){
					// 完善登录功能，用户在未登录进入时跳转到登录界面
					if(!$.cookie("PHPSESSID")){
						location.href = "/dashboard/login";
					}else {
						var userInfo = JSON.parse($.cookie("userinfo"));
		        // console.log(userInfo);
		        var html = template("profile-tpl",userInfo);
		        // console.log(html);

		        // 渲染
		        $("#userinfo").html(html);
					} 
			}

			// 退出登录
			$("#logout").click(function() {
					$.ajax({
						url: "/api/logout",
						type: "post",
						success: function(data){
								// console.log(data);
								if(data.code == 200){
									location.href = "/dashboard/login";
								}
						}
					});
			});


		});
})
    