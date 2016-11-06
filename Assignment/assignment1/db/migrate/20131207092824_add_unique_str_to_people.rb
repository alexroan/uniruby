class AddUniqueStrToPeople < ActiveRecord::Migration
  def change
    add_column :people, :unique_string, :string
  end
end
