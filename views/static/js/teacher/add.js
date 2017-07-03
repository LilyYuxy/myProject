define(["jquery","template","util","form","datepicker","datepicker-zh","validate"],function($,template,util){

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
						$("input[name=tc_join_date]").datepicker({
							format:"yyyy-mm-dd",
							language:"zh-CN"
						});
						$("#teacherform").validate({
								sendForm:false,
									// 表单异步提交	
								valid:function(){
									$("#teacherform").ajaxSubmit({
											url: "/api/teacher/update",
											type: "post",
											success: function(data){
													if(data.code == 200){
														location.href = "/teacher/list";
													}
											}
									});
								}
						});
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
			$("input[name=tc_join_date]").datepicker({
						format:"yyyy-mm-dd",
						language: "zh-CN"
				});
			$("#teacherform").validate({
					description: {
							"tcname": {
								required: "请输入正确信息"
							},
							"tcpass": {
								required: "请输入正确格式"
							},
							"tcjoindate": {
								required: "请输入正确入职时间"
							}
					},
					onBlur: true,
					onKeyup: true,
					sendForm: false,
					eachInvalidField: function(){
						// console.log("eachValidField,被调用了", this);
						this.parent().parent().addClass('has-error').removeClass('has-success');
					},
					eachValidField: function(){
						this.parent().parent().addClass('has-success').removeClass('has-error');
					},
					valid: function(){


							// 表单异步提交	
						$("#teacherform").ajaxSubmit({
								url: "/api/teacher/add",
								type: "post",
								success: function(data){
										if(data.code == 200){
											location.href = "/teacher/list";
										}
								}
						});
					}
			});

	}

});