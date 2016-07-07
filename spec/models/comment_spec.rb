require 'rails_helper'

describe Comment , :type => :model do
	it " Comment is valid with    body  " do
		comment = Comment.new(
			
			body: 'dxsd')
		expect(comment).to be_valid

	end
	it " Comment is invalid   without body  " do
		comment = Comment.new(
			
			body: '')
		expect(comment).to be_invalid

	end
	it { should belong_to :post }
end