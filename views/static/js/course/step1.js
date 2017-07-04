define(["jquery", "template", "util", "ckeditor", "form"], function($, template, util, CKEDITOR){

		

		var csid = util.getQuery("id");

		$.ajax({
			url: '/api/course/basic',
			data: {
				cs_id:csid
			},
			success: function(data){
				 if(data.code == 200){
				 		console.log(data);
				 		// 渲染模版
						var html = template("step1-tpl", data.result);
						$(".steps").html(html);
						CKEDITOR.replace("brief");
				 }
			}
		});

		// 表单提交
		$(".steps").on("submit", "form", function(){
			$(this).ajaxSubmit({
				url: "/api/course/update/basic",
				type: "post",
				success: function(data){
					if(data.code == 200){
						console.log(data);
						location.href = "/course/step2?id="+data.result.cs_id;
					}
				}
			});
			return false;
		});

		
});