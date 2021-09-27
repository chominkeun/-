const { data } = require("jquery");


function headerSlide(){
	$('.togBtn').on('click', function(){
		if(!$('.header').is(':hidden')){
			$('.header').slideUp(300);
			$('.container').animate({paddingTop:0}, 300);
			$('.togBtn').animate({top:0}, 300);
			$(this).find('span').text('OPEN');
		}else{
			$('.header').slideDown();
			$('.container').animate({paddingTop:125}, 300);
			$('.togBtn').animate({top:125}, 300);
			$(this).find('span').text('CLOSE');
		}
	});
}
$(document).ready(function () {

	$("input[name='allchk']").click(function () {
		//Ŭ���Ǿ�����
		if ($("input[name='allchk']").prop("checked")) {
			//input�±��� name�� chk�� �±׵��� ã�Ƽ� checked�ɼ��� true�� ����
			$("input[name=chk]").prop("checked", true);
			//Ŭ���� �ȵ�������
		} else {
			//input�±��� name�� chk�� �±׵��� ã�Ƽ� checked�ɼ��� false�� ����
			$("input[name=chk]").prop("checked", false);
		}
	})

	$("input[name='chk']").change(function () {
		//Ŭ���Ǿ�����
		var checkCnt = $("input[name='chk']:checked").length;
		var AllCheck = $("input[name='chk']").length;

		if (checkCnt == AllCheck) $("input[name=allchk]").prop("checked", true);
		else $("input[name=allchk]").prop("checked", false);
		console.log("checkCnt:" + checkCnt);
		console.log("AllCheck:" + AllCheck);
	});

});


//allChk
function allChk(){
	if (!$('[data-evt="allChk"]').length > 0) return;

	
	console.log("checkCnt:" + checkCnt);
	console.log("AllCheck:" + AllCheck);



	/*$('[data-evt="allChk"]').each(function(){
		var name = $(this).attr('name');
		var _this = $(this);
		_this.on('change', function(){
			if($(this).prop("checked")){
				$('[name='+name+']').prop("checked", true);
			}else{
				$('[name='+name+']').prop("checked", false);
			}
		});
		$('[name='+name+']').on('change', function(){
			var total= $('[name='+name+']').not('.allChk').length;
			var chked= $('[name='+name+']:checked').not('.allChk').length;
			console.log(chked, total);
			if(chked == total){
				 _this.prop("checked", true);
			}else{
				_this.prop("checked", false);
			}
		});
	});*/
}


//popup
function popOpen(id, name, price, num) {
	console.log(name);
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/product/${name}`,
		success : function(res){
			$("#productName").val(res.PRT_NAME);
			$("#productPrice").val(res.PRICE);
			if(res.PRT_CATEGORY_ID === 1){
				$("#productCategory").val('음료');
			} else if(res.PRT_CATEGORY_ID === 2){
				$("#productCategory").val('푸드');
			} else if(res.PRT_CATEGORY_ID === 3){
				$("#productCategory").val('디저트');
			}
			$("#productDesc").val(res.PRT_DESC);
			$("#productImage").attr("src", res.IMAGE_FILE);
			$(id).fadeIn(300);
			$('body').css({'overflow': 'hidden'});

	//popupHSetting(id);
	setTimeout(popupHSetting, 200, id)
	$(window).resize(function(){
		popupHSetting(id);
	});	
	$(id+' .mask').on('click', function(){
		popClose(id);
	});	
},
		error : function(error){
			console.log('error : ' + error);
		}
	})

	document.item.num.value = num;
	var product_Name = name;
	var product_Price = price;
	$("#productName").val(product_Name);
	$("#productPrice").val(product_Price);
	$(id).fadeIn(300);
	$('body').css({'overflow': 'hidden'});

	//popupHSetting(id);
	setTimeout(popupHSetting, 200, id)
	$(window).resize(function(){
		popupHSetting(id);
	});	
	$(id+' .mask').on('click', function(){
		popClose(id);
	});	
	/*$("#mod").on('click', function (e) {
		e.stopPropagation();
		e.preventDefault();
		
	});*/
}

function popOpen1(id, num) {
	console.log(num);
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/order/${num}`,
		success : function(res){
			var sum = 0;
			var ordernum = res[0].ORDER_NUM;
			var orderdate = res[0].ORDER_TIME;
			var customername = res[0].CUST_NM;
			$("#detailNum").text(ordernum);
			$("#detailDate").text(orderdate);
			$("#detailCustomer").text(customername+'님');
			$("#order_detail").empty();
			for(var i = 0; i<res.length; i++) {
				var name = res[i].PRT_NAME;
				var qty = res[i].ORDER_QTY;
				var price = res[i].ORDER_PRICE;
				sum = sum + price;
				var sen = "<tr><td>"+name+"</td><td>"+qty+"</td><td>"+price+"</td></tr>";
				$("#order_detail").append(sen);
			}
			console.log(sum);
			$(".price").text(sum);
			$(id).fadeIn(300);
			$('body').css({'overflow': 'hidden'});

			//popupHSetting(id);
			setTimeout(popupHSetting, 200, id)
			$(window).resize(function(){
				popupHSetting(id);
			});	
			$(id+' .mask').on('click', function(){
				popClose(id);

			});	
		},
		error : function(error){
		console.log('error : ' + error);
		}
	})
	
	$(id).fadeIn(300);
	$('body').css({ 'overflow': 'hidden' });

	//popupHSetting(id);
	setTimeout(popupHSetting, 200, id)
	$(window).resize(function () {
		popupHSetting(id);
	});
	$(id + ' .mask').on('click', function () {
		popClose(id);
	});
}

function popupHSetting(id){
	$(id + ' .popup').css('height', '');
		
	var maxH = $(id + ' .popupWrap').outerHeight();
	$(id + ' .popup').css('height', maxH);
}


function popClose(id){
	$(id).fadeOut(300);
	$('body').css({'overflow': ''});
}


function addItem(id) {
	var cnt = $("#menu_list li").length;
	
	$("#addProductName").val() 
	var add_item_name = $("#addProductName").val();
	var add_item_price = $("#addProductPrice").val();
	var add_item_Category = $("#addProductCategory").val();
	var add_item_Desc = $("#addProductDesc").val();
	var add_Opt_Size = $("#addProductOptSize").val();
	var add_Opt_Shot = $("#addProductShot").val();
	var add_Opt_2 = $("#addProductAddOpt2").val();
	var category_id = null;
	if(add_item_Category === '음료'){
		category_id = 1;
	} else if(add_item_Category === '푸드'){
		category_id = 2;
	} else if(add_item_Category === '디저트'){
		category_id = 3;
	}

	var body = {
		num : cnt,
		name : add_item_name, 
		price : add_item_price,
		Category_id : category_id,
		Desc : add_item_Desc,
		Size : add_Opt_Size,
		Shot : add_Opt_Shot,
		Opt_2 : add_Opt_2
		
	}

	//var addProductCategory = $("#addProductCategory").val();
	$.ajax({
		type : 'POST',
		url : 'http://localhost:3000/addproduct',
		data : body,
		success : function(res){
			if (res === 'OK') {
				var additem = "<li id = 'item_" + cnt + "'><div><a href=\"javascript: popOpen('#layerPop', '" + add_item_name + "', '" + add_item_price + "', '"+cnt+"')\"><div class='img'><img src='../images/temp_coffee.jpg' alt=''></div><strong class='tit' >" + add_item_name +"</strong></a></div></li>";
				$("#menu_list").append(additem);
				$("#addProductName").val("");
				$("#addProductPrice").val("");
				$("#addProductCategory").val("");
				$("#addProductDesc").val("");
				popClose('#layerPop2');
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}

function modItem() {
	var num = document.item.num.value;
	var mod_item_name = $("#productName").val();
	var mod_item_price = $("#productPrice").val();
	var mod_item_Category = $("#productCategory").val();
	var mod_item_Desc = $("#productDesc").val();
	var mod_Opt_Size = $("#productOptSize").val();
	var mod_Opt_Shot = $("#productAddShot").val();
	var mod_Opt_2 = $("#productAddOpt2").val();
	var category_id = null;

	if(mod_item_Category === '음료'){
		category_id = 1;
	} else if(mod_item_Category === '푸드'){
		category_id = 2;
	} else if(mod_item_Category === '디저트'){
		category_id = 3;
	}

	var body = {
		num : num,
		name : mod_item_name, 
		price : mod_item_price,
		Category_id : category_id,
		Desc : mod_item_Desc,
		Size : mod_Opt_Size,
		Shot : mod_Opt_Shot,
		Opt_2 : mod_Opt_2
		
	}

	$.ajax({
		type : 'POST',
		url : 'http://localhost:3000/modproduct',
		data : body,
		success : function(res){
			if (res === 'OK') {
				$("#item_" + num + " .tit").text(mod_item_name);
				$("#item_" + num + " a").attr("href", "javascript: popOpen('#layerPop', '" + mod_item_name + "', '" + mod_item_price + "', '" + num + "')");
				popClose('#layerPop');
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}

function delItem() {
	var num = document.item.num.value;
	var body = {
		num : num
	}
	$.ajax({
		type : 'POST',
		url : 'http://localhost:3000/delproduct',
		data : body,
		success : function(res){
			if (res === 'OK') {
				$("#item_" + num).remove();
				popClose("#layerPop")
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}

	})
	//이걸 밖에다가 안해두면 DB는 사라지는데 front가 안사라짐 왜?
	$("#item_" + num).remove();
	popClose("#layerPop")
}

function sortItem(categorynum) {
	var cnt = $("#menu_list li").length;
	var a = 0;
	
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/category/${categorynum}`,
		success : function(res){
			console.log('result:' +$("#item_" + 1 + " .tit").text());
			//console.log('name 1: ' + res[a].PRT_NAME);
			console.log('res: ' + res.length);
			if(res.length == 0) {
				for(j = 1; j <= cnt; j++) {
					$("#item_" + j).hide();
				}
			}
			else {
				for(j = 1; j < cnt; j++) {
					if(res[a].PRT_NAME === $("#item_" + j + " .tit").text()) {
						$("#item_" + j).show();
						if(a != res.length-1) {
							a++;
						}
						
					}
					else {
						$("#item_" + j).hide();
					}
				}	
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}
//전체 메뉴
function allItem() {
	var cnt = $("#menu_list li").length;
	var a = 0;
	
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/allproduct`,
		success : function(res){
			if(res.length == 0) {
				for(j = 0; j < cnt; j++) {
					$("#item_" + j).hide();
				}
			}
			else {
				for(j = 0; j < cnt; j++) {
					$("#item_" + j).show();
				}
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}
//초기 db 데이터 기반 메뉴 확인
function showItem() {
	var cnt = $("#menu_list li").length;
	var a = 0;
	
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/refreshPRT`,
		success : function(res){
			for (var i = 0; i<res.length; i++) {
				var additem = "<li id = 'item_" + (i+1) + "'><div><a href=\"javascript: popOpen('#layerPop', '" + res[i].PRT_NAME + "', '" + res[i].PRICE + "', '"+(i+1)+"')\"><div class='img'><img src='"+res[i].IMAGE_FILE+"' alt=''></div><strong class='tit' >" + res[i].PRT_NAME +"</strong></a></div></li>";
				$("#menu_list").append(additem);
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}

//초기 db 데이터 기반 주문 확인
function showOrder() {
	
	$.ajax({
		type : 'GET',
		url : `http://localhost:3000/allorder`,
		success : function(res){
			for (var i = 0; i<res.length; i++) {
				var date = res[i].ORDER_TIME;
				console.log(date);
				var num = res[i].ORDER_NUM;
				var customer = res[i].CUST_NM;
				var staff = res[i].STORE_NAME;
				var price = res[i].PRICE_SUM;
				var state = res[i].ORDER_STATE;
				var order = "<tr onclick=\"popOpen1('#layerPop', "+num+")\"><td id = \"orderDate\">"+date+"</td><td id = \"orderNum\">"+num+"</td><td id = \"orderCustomer\">"+customer+"</td><td id = \"orderStaff\">"+staff+"</td><td id = \"orderPrice\">"+price+"</td><td id = \"orderState\">"+state+"</td><td onclick=\"event.cancelBubble=true\"><label class=\"inpChk\"><span class=\"inp\"><input type=\"checkbox\" name=\"chk\"><span class=\"ic\"></span></span></label></td></tr>";
				$("#ordertable").append(order);
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}

function modOrderState(num) {
	if (num == 1) {
		var order_state = $("#orderstate1").text();
	}
	else {
		order_state = $("#orderstate2").text();
	}
	console.log("state:" + order_state);
	var ordernum = $("#detailNum").text();
	var body = {
		state: order_state,
		num: ordernum
	}

	$.ajax({
		type : 'POST',
		url : 'http://localhost:3000/modorderstate',
		data : body,
		success : function(res){
			if (res === 'OK') {
				popClose('#layerPop');
				location.reload();
			}
		},
		error : function(error){
			console.log('error : ' + error);
		}
	})
}

function delChk() {

	$("input[name = chk]:checked").parent().parent().parent().parent().remove()

}
$(function(){
	headerSlide();
	allChk();
	$('.layerPopup .mask').on('click', function(){
		var id = $(this).parents('.layerPopup').hide();
	});	
});