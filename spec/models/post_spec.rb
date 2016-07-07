require 'rails_helper'

# RSpec.describe Post, type: :model do
#   pending "add some examples to (or delete) #{__FILE__}"
# end
describe Post , :type => :model do
	it "is valid with  Post title and description  " do
		post = Post.new(
			
			title: 'dxsd',
			description: 'sdfkf')
		expect(post).to be_valid

	end
	it "is invalid with empty  title or  description  " do
		post = Post.new(
			
			title: '',
			description: '')
		expect(post).to be_invalid

	end

end
describe Post do
  it { should have_many(:comments) }
end