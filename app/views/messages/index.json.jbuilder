json.array! @new_messages.each do |message|
  json.user_name message.user.name
  json.created_at  message.created_at.strftime('%Y/%m/%d %H:%M')
  json.body message.body
  json.image message.image.url
  json.id message.id
end

