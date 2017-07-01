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

			// 给当前导航栏在被选中时更换背景色
			$(".navs>ul>li").click(function(){
				$(this).children("a").addClass("active");
				$(this).siblings().children('a').removeClass('active');
			});
				

			
			$(".navs>ul>li>ul").parent().click(function(){
				// 导航栏显示二级菜单功能
				var $ul = $(this).children("ul");
				$ul.slideToggle();

				// 找二级菜单下的a标签如果有选中的就把当前li的active给取消掉
				// if($ul.find('a.active').length > 0){
				// 	$(this).children('a').removeClass('active');
				// }
				// alert(1);				
			});

			// 让当前页面对应的导航栏菜单变暗
			// 遍历每个a标签
			$(".navs a").each(function(i, v){
				// i为索引，v为每个a标签
				// console.log(i);
				// console.log(v);
				if($(v).attr("href") == location.pathname){
					$(v).addClass('active');
					$(v).parent().parent().slideDown();
				}

			});



		});
})
    