class ChangeExcessDefault < ActiveRecord::Migration
  def change
    change_column :policies, :excess, :integer, :default => 1000
  end
end
