$(function(){
  function buildHTML(message){
    var image = (message.image === null) ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="chat-main__message">      
                  <p class="chat-main__message-name">
                    ${message.user_name}
                  </p>
                  <p class="chat-main__message-time">s
                    ${message.created_at}
                  </p>
                  <p class="main-message-text">
                    ${message.body}
                    ${image}
                  </p>
                </div>`

    return html;
  }


  $("#new__message").on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var form = $(this);

    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__list").append(html);
      form[0].reset();
      $(".chat-main__content").animate({scrollTop: $(".chat-main__content")[0].scrollHeight}, 'fast');
    })

    .fail(function() {
      alert('error');
    })
    .always(function(){
      $(".form__submit").prop('disabled', false)
    })
  });
});