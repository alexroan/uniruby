class Vehicle < ActiveRecord::Base

  validates_presence_of :registration, :annual_mileage, :value, :parking_location, :policy_start_date, :person_pk
  validates_numericality_of :annual_mileage, :value,
                            greater_than_or_equal_to: 0

  def self.per_page
    8
  end
end
