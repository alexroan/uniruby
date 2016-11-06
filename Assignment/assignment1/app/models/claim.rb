class Claim < ActiveRecord::Base

  validates_presence_of :claim_date, :value, :claim_type, :person_pk
  validates_numericality_of :value, :person_pk,
                            greater_than_or_equal_to: 0

  def self.per_page
    8
  end
end
