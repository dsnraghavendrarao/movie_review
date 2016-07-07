class AddColumnToComment < ActiveRecord::Migration
  def change
  	add_column :comments, :custom_rating, :integer
  end
end
