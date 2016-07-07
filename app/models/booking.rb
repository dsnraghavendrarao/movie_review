class Booking < ActiveRecord::Base
belongs_to :post
belongs_to :user
	
	    validates_presence_of :date
	    validates_presence_of :ticket

end
