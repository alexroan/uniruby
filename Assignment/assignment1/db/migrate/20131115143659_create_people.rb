class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :title, null: false
      t.string :forename, null: false
      t.string :surname, null: false
      t.string :email, null: false
      t.date :dob, null: false
      t.string :phone_number
      t.string :address1, null: false
      t.string :address2
      t.string :address3
      t.string :postcode, null: false
      t.string :license_type, null: false
      t.integer :license_period, null: false
      t.string :occupation, null: false
      t.integer :number_of_claims, null: false

      t.timestamps
    end

    add_index :people, :surname
    add_index :people, :email
  end
end
