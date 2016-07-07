require 'rails_helper'

RSpec.describe PostsController, :type => :controller do
  describe "GET index" do
    it "has a 200 status code" do
      # get :index
      response.code.should eq("200")
    end
  end

    it "assigns @posts" do
      @posts = Post.all
      get :index
      expect(@posts.length).to be >= 0      
    end
    it "assigns @posts" do
      @posts = Post.all
       get :index
      expect(assigns(:posts).to_a).to eq(@posts)
    end
    it "renders the index template" do
    	get :index
       
      expect(response).to render_template("index")
    end
     it "assigns the requested for post as @post" do
      post = Post.create(title: '',
	  description: 'kiranpost'
	      	)
      get :edit, {:id => post.to_param}
      expect(assigns(:post)).to eq(post)
    end

end
 