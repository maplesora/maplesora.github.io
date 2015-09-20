/* 调整#box的水平位置 */
$('#box').css('left',$(window).width()/2-$('#box').width()/2);
$(window).resize(function() {
	$('#box').css('left',$(window).width()/2-$('#box').width()/2);
}); 
$('#cnzz_stat_icon_1256394349').css('display','none');