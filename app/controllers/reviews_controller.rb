class ReviewsController < ApplicationController
	respond_to :json
	def new
    @review = Review.new
  end
 def index
    @reviews = Review.all
respond_with(@reviews) do |format|
    format.json { render :json => @reviews.as_json }
   #  format.json { render :json => @reviews.to_json(:include => :user) }
   
   
end
  end
def show
	#@reviews=Comment.where(:post_id=>params[:id])
	@reviews=Review.where(:post_id=>params[:id])
	 puts @reviews.inspect
	# render json: @reviews, status: :ok
  render json: @reviews.as_json(include: { post: { only: :title} },
                                                only: [:review,:content,:created_at]), status: :ok
   

  # GET /posts/1/edit
  end

  def create
    @review = Review.new
     @review.post_id = params[:PostId]
     @review.user_id=current_user.id
     @review.content = params[:content]
     @review.save
    render json: @review, status: :ok
    
  end
   def comment_params
      params.require(:review).permit(:content)
    end



end
