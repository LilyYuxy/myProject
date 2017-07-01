define(["jquery","template","util","form"],function($,template,util){

	var query = 	util.getQueryObj();

	if(query.id){
		// 如果获取到id，则为编辑；否则添加
		// 编辑
		$.ajax({
			url: '/api/teacher/edit',
			type: 'GET',
			data: {tc_id: query.id},
			success: function(data){
					data.result.title = "讲师编辑";
					data.result.btnText = "保 存";
					data.result.type = "edit";
					// 渲染模版
					var html = template("add-edit-tpl",data.result);
					$('.teacher').html(html);
			}
		})
	
			
	}else{
		// 添加// 渲染模版
			var html = template("add-edit-tpl",{
				title: "讲师添加",
				btnText: "添 加",
				type: "add"
			});
			$('.teacher').html(html);

	}

	// 给保存按钮注册点击事件
	$("#teacher").on('click', '#btnSave', function() {
			var type = $(this).data("type");
			var url = "";
			if(type == "edit"){
				url = "/api/teacher/update";
			}else{
				url = "/api/teacher/add";
			}

			// 表单异步提交	
		$("#teacherform").ajaxSubmit({
			url: url,
			type: "post",
			success: function(data){
					if(data.code == 200){
						location.href = "/teacher/list";
					}
			}

		});
		return false;
	});

});