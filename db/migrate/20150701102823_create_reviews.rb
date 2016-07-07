class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :content
      t.references :post, index: true
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
