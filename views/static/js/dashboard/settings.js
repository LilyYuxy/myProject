define(["jquery", "ckeditor", "template", "nprogress", "datepicker", "datepicker-zh", "region", "uploadify", "form"], function($, CKEDITOR, template, NProgress){

		// 渲染模版
		$.ajax({
			url: '/api/teacher/profile',
			success: function(data){
					if(data.code == 200){
							var html = template("settings-tpl",data.result);
							$(".settings").html(html);


							// 出生时间插件
							$("input[name=tc_birthday]").datepicker({
								format:"yyyy-mm-dd",
								language: "zh-CN"
							});

							// 入职时间插件
							$("input[name=tc_join_date]").datepicker({
								format:"yyyy-mm-dd",
								language: "zh-CN"
							});

							// 富文本编辑插件
							CKEDITOR.replace("introduce",{
									toolbarGroups: [
					        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
					        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
					        { name: 'styles' },
					        { name: 'colors' },
					        { name: 'about' }
					    ]
							});

							// 籍贯三级菜单
							$("#region").region({
									url: "/views/assets/jquery-region/region.json"
							});

							// 上传照片插件
							$("#upfile").uploadify({
									swf: '/views/assets/uploadify/uploadify.swf',
									uploader: "/api/uploader/avatar",
									width: 120,
									height: 120,
									buttonText: "",
									fileObjName: "tc_avatar",
									itemTemplate: "<p></p>",
									onUploadStart: function(){
											NProgress.start();
									},
									onUploadSuccess: function(file, data){
											data = JSON.parse(data);
											if(data.code == 200){
												$(".preview>img").attr("src", data.result.path);
											}
									},
									onUploadComplete: function(){
											NProgress.done();
									}
							});
					}		
			}
		});
		
		// 表单提交

		$(".settings").on("submit", "form", function(){
				$(this).ajaxSubmit({
						url: "/api/teacher/modify",
						type: "post",
						success: function(data){
								if(data.code == 200){
									alert("修改成功！");
								}
						}
				});

				return false;
		});
		
});