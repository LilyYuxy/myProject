define(["jquery", "template", "util", "uploadify", "jcrop"], function($, template, util){

		var csid = util.getQuery("id");
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;

		// 图片裁切插件的api
		var jcrop_api;

		// 发送请求，渲染模版
		$.ajax({
			url: '/api/course/picture',
			data: {
				cs_id: csid
			},
			success: function(data){
						console.log(data);
						var html = template("step2-tpl", data.result);
						$(".steps").html(html);

						// 上传照片插件
								$("#uploadBtn").uploadify({
										swf: '/views/assets/uploadify/uploadify.swf',
										uploader: "/api/uploader/cover",
										width: 70,
										buttonClass: "btn btn-success btn-sm",
										buttonText: "选择图片",
										fileObjName: "cs_cover_original",
										itemTemplate: "<p></p>",
										formData: {
											cs_id: csid
										},
										onUploadSuccess: function(file, data, response){
												data = JSON.parse(data);
												$(".preview>img").attr("src", data.result.path);
												$("#cropBtn").prop("disabled", false);
												if(jcrop_api){
													jcrop_api.destroy();
													$("#cropBtn").prop("disabled", true);
												}
										}
								});
								$("#uploadBtn-button").css("line-height", "1.5");
			}

		});

		// 剪裁图片
			$(".steps").on("click", "#cropBtn", function(){
				// alert(1);
				var text = $(this).text();
				if(text == "裁切图片"){
						$(".thumb>img").remove();
						$(".preview>img").Jcrop({
								boxWidth: 400,
								aspectRatio: 2,
  							setSelect: [ 0, 0, 400, 200 ]
						},function(){
							var jcrop_api = this;
  						thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120,  thumbnail: ".thumb"});
						});

						$(".preview").on("cropmove", function(a, b, c){
								x = c.x;
								y = c.y;
								w = c.w;
								h = c.h;	
						});
						$(this).text("保存图片");
				}else{
					$(this).prop("disabled", true);
					$that = $(this);
					// 发送请求
					$.ajax({
						url: '/api/course/update/picture',
						type: "post",
						data: {
							cs_id: csid,
							x: x,
							y: y,
							w: w,
							h: h

						},
						success: function(data){
								if(data.code == 200){
									// console.log(data);
									location.href = "/course/step3?id="+data.result.cs_id;
								}
						}
					})
					
				}

			});


});