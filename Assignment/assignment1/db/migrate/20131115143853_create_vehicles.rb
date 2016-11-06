class CreateVehicles < ActiveRecord::Migration
  def change
    create_table :vehicles do |t|
      t.string :registration, null: false
      t.integer :annual_mileage, null: false
      t.integer :value, null: false
      t.string :parking_location, null: false
      t.datetime :policy_start_date, null: false
      t.integer :person_pk, null: false

      t.timestamps
    end
  end
end
