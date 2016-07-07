RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
   config.model 'Post' do
    label "Movie" 
    label_plural "Movies"

      field :title
      field :rating
      field :description do
        label "Review"
      end
      field :date
      field :availability
      field :avatar
      # field :theaters
    end

  config.model 'Review' do
    label "theater"
    field :content do
      label "Theater name"
    end
    field :post do
      label "movie"
    end
    # visible false
  end
  config.model 'Admin' do
    visible false
  end
  config.model 'Bookings' do
    field :post do
      label "Movie"
    end
  end
  config.model 'comments' do
    field :post do
      label "Movie"
    end
    field :body do
      label "comment"
    end
  end
end
