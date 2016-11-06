class Policy < ActiveRecord::Base
  validates_numericality_of :excess,
                            greater_than_or_equal_to: 0
  validates_uniqueness_of :person_pk


  def self.per_page
    8
  end

end
