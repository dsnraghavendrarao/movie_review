class Comment < ActiveRecord::Base
  belongs_to :post
    belongs_to :user
  validates_presence_of :body
  validates_inclusion_of :custom_rating, :in => [1,2,3,4,5],
  :message => "between 1 to 5"
  validates_presence_of :custom_rating  
end
