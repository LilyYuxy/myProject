// <!--引用模版引擎  -->
// 定义模块化
define(["jquery","template","cookie"],function($,template){
				// 判断当前页面的路径
				if("/dashboard/login" !== location.pathname){
					var userInfo = JSON.parse($.cookie("userinfo"));
	        console.log(userInfo);
	        var html = template("profile-tpl",userInfo);
	        console.log(html);

	        // 渲染
	        $("#userinfo").html(html);
				}
 
})
    