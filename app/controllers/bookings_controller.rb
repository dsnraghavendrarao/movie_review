class BookingsController < ApplicationController
	respond_to :json
	def index
	end
	
	def create
		@booking = Booking.new
		@booking.user_id = current_user.id
		@booking.date = params[:date]
		@booking.ticket = params[:ticket]
		@booking.post_id = params[:PostId]
		@booking.save()
		@availability = params[:PostAvailability].to_i - params[:ticket].to_i 

		#updating availabiltiy of tickets in post controller
		@update_availability = Post.where(:id => params[:PostId].to_i).first_or_create!
		@update_availability.update_attributes(:availability => @availability)	
		puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
		puts "#{params.inspect}"
		puts "#{current_user.id}"
		puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
	end
end
