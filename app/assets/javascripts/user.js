$(document).on('turbolinks:load', function(){
  var search_result = $("#user-search-result");

  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${user.name}</p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
               </div>`
    search_result.append(html);
    return html;
  }

  function appendNoUser(message){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${message}</p>
                </div>`
    search_result.append(html);
    return html;
  }

  function addUser(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html);

    return html;
  }


  $("#user-search-field").on("keyup",function(){
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
         users.forEach(function(user){
           appendUser(user);
         });
       }
       else {
         appendNoUser("一致するユーザーは見つかりませんでした");
       }
      })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
   })

  $("#user-search-result").on('click','.user-search-add',function(){
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    addUser(name, id);
    $("#user-search-result").empty();
    
  })
  
  $('#chat-group-users').on('click','.user-search-remove',function(){
    $(this).parent().remove();
    
  })
   
});

