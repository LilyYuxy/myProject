define(["jquery","template","bootstrap"],function($,template) {

		//渲染模版
		$.ajax({
			url: '/api/teacher',
			type: 'get',
			success: function(data){
					// console.log(data);
					if(data.code == 200){
						var html = template("teacherlist-tpl",data);
						$("#teacherlist").html(html);
						console.log(data);	
					}
			},
		})

		//为按钮注册事件委托，实现查看功能
		$("#teacherlist").on("click",".btn-check",function(){
				// alert(1);
				var tcid = $(this).parent().data("id");
				$.ajax({
					url: '/api/teacher/view',
					type: 'get',
					data: {tc_id: tcid},
					success: function(data){
							// console.log(data);
							if(data.code == 200){
								// 将数据渲染到模态框
								var html = template("teacher-modal-tpl",data.result);
								console.log(data.result);
								$("#teacherModal").html(html);
								// 展示模态框
								$("#teacherModal").modal("show");
							}
					}
				})
				
		});


		// 为注销和启用按钮注册事件
		$("#teacherlist").on('click', '.btn-onoff', function() {
			// alert(1);
			// 获取用户当前的状态
			var status = $(this).data("status");
			var id = $(this).parent().data("id");
			var $that = $(this);
			// 向后台请求数据
			$.ajax({
				url: '/api/teacher//handle',
				type: 'POST',
				data: {
					tc_id:id,
					tc_status: status
				},
				success: function(data){
						// console.log(data);
						if(data.code == 200){
							// console.log(data);
							$that.data("status", data.result.tc_status);
							if(data.result.tc_status == 1){
								$that.removeClass('btn-warning');
								$that.addClass('btn-success');
								$that.text("启 用");
							}else{
								$that.removeClass('btn-success');
								$that.addClass('btn-warning');
								$that.text("注 销");
							}
							
						}
				}
			});
		});

});
