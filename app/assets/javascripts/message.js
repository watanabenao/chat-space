$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var image = (message.image === null) ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="chat-main__message" data-message-id= "${message.id}">      
                  <p class="chat-main__message-name">
                    ${message.user_name}
                  </p>
                  <p class="chat-main__message-time">
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

  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var id = $('.chat-main__message:last').data('message-id')
      $.ajax({
        url: location.href,
        type: 'GET',  
        dataType: 'json',
        data: {id: id}
      })
      .done(function(messages){
        messages.forEach(function(message){
         $(".chat-main__list").append(buildHTML(message));
         });
         $(".chat-main__content").animate({scrollTop: $(".chat-main__content")[0].scrollHeight}, 'fast');
      })
      .fail(function(data){
        alert('自動更新に失敗しました')
      })
    }else{
      clearInterval(interval);
    }}, 5000);

});