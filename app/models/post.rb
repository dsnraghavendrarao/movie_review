class Post < ActiveRecord::Base
	has_many :comments, dependent: :destroy
		has_many :reviews, dependent: :destroy
		has_many :bookings, dependent: :destroy
	#validates_presence_of :title,:description
	 has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates_inclusion_of :rating, :in => [1,2,3,4,5],
  :message => "between 1 to 5"
  validates_presence_of :rating
  validates_presence_of :description
  validates_presence_of :title 
  validates_presence_of :date
  validates_presence_of :availability
  validates_presence_of :avatar
end
