$(document).ready(function() {
		$('a[href^="#"]').bind('click', function(e) {
				e.preventDefault();
				var target = $(this).attr("href");
        $('html, body').stop().animate({
						scrollTop: $(target).offset().top
				}, 600, function() {
						location.hash = target;
				});
				return false;
		});
});

$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
		$('.box').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('.menu a.is-active').removeClass('is-active');
						$('.menu a').eq(i).addClass('is-active');
				}
		});
}).scroll();


$.getJSON("data.json", function(data) {
  $('#title').html(data.title);
  $('#subtitle').html(data.subtitle);
  $('#logo').attr("src", data.logo);
  $('#footer_text').html(data.footer);
  $('#base_url').html(data.base.url);
  $('#base_info').html(data.base.info);
  $('#auth_info').html(data.auth);
  $('#limits_info').html(data.limits);
  $('#contact_info').html(data.contact.info);
  $('#contact_link').html(data.contact.link);

  var i = 0;
  $.each(data.endpoints, function() {
    i++;
    var endpoint_id = "endpoint"+i;
    newEndpointBox(endpoint_id);
    $.each(this, function(key, val) {
      if(key == "name"){
        $('#'+endpoint_id+' .endpoint-name').html(val);
        newEndpointMenuItem(val, endpoint_id);
      }else if(key == "text"){
        $('#'+endpoint_id+' .endpoint-text').html(val);
      }else if(key == "url"){
        $('#'+endpoint_id+' .endpoint-url').html(val);
      }else if(key == "method"){
        $('#'+endpoint_id+' .endpoint-method').text(val);
      }else if(key == "response"){
        $('#'+endpoint_id+' .endpoint-response-format').text(val.format);
        $.ajax({
            type: "GET",
            url: val.example,
            dataType: "text",
            success: function(result) {
              $('#'+endpoint_id+' .endpoint-response').text(result);
            }
          });
      }
    });
  });

});


function newEndpointBox(id){
  var html = '<div class="box" id="'+id+'">';
  html += '<h4 class="title is-3 endpoint-name"></h4>';
  html += '<article class="message is-primary">';
  html += '<div class="message-body endpoint-text">';
  html += '</div>';
  html += '</article>';
  html += '<pre><code><span class="tag is-primary endpoint-method"></span> <span class="endpoint-url"></span></code></pre>';
  html += '<br />';
  html += '<h5 class="title is-5">Response <span class="tag is-primary endpoint-response-format"></span></h5>';
  html += '<pre class="endpoint-response"></pre>';
  html += '</div>';
  $('#boxes').append(html);
}
function newEndpointMenuItem(title, to_id){
  $('.endpoints-menu').append('<li><a href="#'+to_id+'">'+title+'</a></li>');
}
