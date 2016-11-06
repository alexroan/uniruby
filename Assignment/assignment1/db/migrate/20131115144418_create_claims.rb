class CreateClaims < ActiveRecord::Migration
  def change
    create_table :claims do |t|
      t.date :claim_date, null: false
      t.integer :value, null: false
      t.string :type, null: false
      t.string :description
      t.integer :person_pk, null: false

      t.timestamps
    end
  end
end
