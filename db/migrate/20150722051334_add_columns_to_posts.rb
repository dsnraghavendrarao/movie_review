class AddColumnsToPosts < ActiveRecord::Migration
  def change
  	add_column :posts, :rating, :integer
  	add_column :posts, :availability, :integer
  	add_column :posts, :date, :date
  end
end
