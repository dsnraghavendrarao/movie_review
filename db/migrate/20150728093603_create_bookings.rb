class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.integer :post_id
      t.integer :user_id
      t.date :date
      t.integer :ticket

      t.timestamps null: false
    end
  end
end
