class Person < ActiveRecord::Base

  validates_presence_of :title, :forename, :surname, :email, :dob, :address1, :postcode, :license_type, :license_period, :occupation, :number_of_claims
  validates_numericality_of :license_period, :number_of_claims,
                            greater_than_or_equal_to: 0
  validates_format_of :email,
                      with: /\A([\w\.\-\+]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      message: 'Bad email address format'
  validates_uniqueness_of :email

  def self.per_page
    8
  end

end
