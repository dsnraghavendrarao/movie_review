json.array!(@posts) do |post|
  json.extract! post, :id, :title, :description,:rating,:date,:availability
  json.url post_url(post, format: :json)
end
