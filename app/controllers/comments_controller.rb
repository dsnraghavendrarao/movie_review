class CommentsController < ApplicationController
	respond_to :json
	def new
    @comment = Comment.new
  end

def show
	#@comments=Comment.where(:post_id=>params[:id])
	@comments=Comment.where(:post_id=>params[:id])
	 @comments.inspect
	# render json: @comments, status: :ok
   render json: @comments.as_json(include: { user: { only: :email}, post: { only: :title} },
                                                only: [:comment,:body,:created_at,:custom_rating]), status: :ok
   
  # GET /posts/1/edit
  end

  def create
    @comment = Comment.new
    @comment.user_id=current_user.id
     @comment.post_id = params[:PostId]
     @comment.body = params[:body]
     @comment.custom_rating = params[:custom_rating]
     @comment.save
    render json: @comment, status: :ok
    
  end
   def comment_params
      params.require(:comment).permit(:body,:custom_rating)
    end
end
