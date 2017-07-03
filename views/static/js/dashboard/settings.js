define(["jquery", "template", "datepicker", "datepicker-zh"], function($, template){

		// 渲染模版
		$.ajax({
			url: '/api/teacher/profile',
			success: function(data){
					if(data.code == 200){
						var html = template("settings-tpl",data.result);
						$(".settings").html(html);


						// 时间插件
						$("input[name=tc_birthday]").datepicker({
							format:"yyyy-mm-dd",
							language: "zh-CN"
						});
					}		
			}
		});
		

		
		
});