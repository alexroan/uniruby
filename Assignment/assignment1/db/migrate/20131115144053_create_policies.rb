class CreatePolicies < ActiveRecord::Migration
  def change
    create_table :policies do |t|
      t.integer :excess, null: false
      t.string :breakdown_cover, null: false
      t.boolean :windscreen_cover, null: false
      t.integer :person_pk

      t.timestamps
    end
  end
end
