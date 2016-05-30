$('.mod-tab .tabs li').on('click', function(e){
   var $cur = $(this);
   var idx = $cur.index();
   $cur.siblings().removeClass('active');
   $cur.addClass('active');

   $cur.parents('.mod-tab').find('.panel').removeClass('active');
   $cur.parents('.mod-tab').find('.panel').eq(idx).addClass('active');
});  

$('.mod-tab .prod').on('mouseenter', function(e){
  $(this).addClass('hover');
});
$('.mod-tab .prod').on('mouseleave', function(e){
  $(this).removeClass('hover');
});
