define(["jquery", "template", "util"], function($, template, util){

		var csid = util.getQuery("id");

		// 发送请求，渲染模版
		$.ajax({
			url: '/api/course/lesson',
			data: {cs_id: csid},
			success: function(data){
					if(data.code == 200){
						// console.log(data);
						var html = template("step3-tpl", data.result);
						$(".steps").html(html);
					}

			}
		});
});