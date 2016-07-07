require 'rails_helper'
describe Review , :type => :model do
	it " Review is valid with    content  " do
		review = Review.new(
			
			content: 'dxsd')
		expect(review).to be_valid

	end
	it " Review is invalid   without content  " do
		review = Review.new(
		
			content: '')
		expect(review).to be_invalid

	end
	it { should belong_to :post }
end

