require 'rails_helper'

describe User , :type => :model do
	it " User is valid with  email and password   " do
		user = User.new(
			
			email: 'xxx@gmail.com',
			password:'12345678')
		expect(user).to be_valid

	end
	it " User is invalid with  empty email and password   " do
		user = User.new(
			
			email: '',
			password:'')
		expect(user).to be_invalid

	end
	it "should validate_uniqueness_of(:email)" do
	  	User.create(email: 'abc@gmail.com', password:'nyrosnyros')
	  	user = User.new(email: 'abc@gmail.com', password:'nyrosnyros')
	  	expect(user).to be_invalid

	  end
	  it "should check password length" do
	  	user=User.create(email: 'abc@gmail.com', password:'nyros')
	  	
	  	expect(user).to be_invalid
	  	
	  end
end