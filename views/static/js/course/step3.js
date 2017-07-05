define(["jquery", "template", "util", "bootstrap", "form"], function($, template, util){

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

		// 添加课时,直接渲染模版
		$(".steps").on("click", "#addlessonBtn", function(){
				// 显示模版的时候不需要显示内容，直接传进一个空对象
				var html = template("modal-tpl", {
					ct_cs_id: csid,
					title: "添加课时",
					btnText: "添 加",
					type: "add"
				});
				$(".modal-content").html(html);
				$("#chapterModal").modal("show");
		});


		// 点击保存，注册事件
		$(".modal-content").on("click", "#saveBtn", function(){
			// 判断免费课时的复选框的状态
			var isfree = 0;
			if($("#isfree").prop("checked")){
				isfree = 1;
			}
			var url = "/api/course/chapter/add";
			var type = $(this).data("type");
			if(type == "edit"){
				url = "/api/course/chapter/modify";
			}
				
			$("form").ajaxSubmit({
				url: url,
				type: "post",
				data: {
					ct_is_free: isfree
				},
				success: function(data){
					if(data.code == 200){
						$("#chapterModal").modal("hide");
						$.ajax({
							url: "/api/course/lesson",
							data: {
								cs_id: csid
							},
							success: function(data){
								if(data.code == 200){
									// console.log(data);
									var html = template("lesson-list-tpl",data.result);
									$(".lessons").html(html);
									$("dd:contains(课时：)").text("课时："+data.result.lessons.length);
								}
							}
						});
					}
				}

			});
			
		});

		// 编辑按钮注册事件
		$(".steps").on("click", ".edit-btn", function(){
			 //获取课程id
			 var ctid = $(this).data("id");
			 // 发送请求
			 $.ajax({
			 	url: "/api/course/chapter/edit",
			 	data: {
			 		ct_id: ctid
			 	},
			 	success: function(data){
			 		// console.log(data);
			 		if(data.code == 200){
			 			// 渲染模态框里的模版
			 			data.result.title = "编辑课时";
			 			data.result.btnText = "保 存";
			 			data.result.type = "edit";
			 			var html = template("modal-tpl", data.result);
						$(".modal-content").html(html);
						$("#chapterModal").modal("show");
			 		}
			 	}
			 });
		});
});