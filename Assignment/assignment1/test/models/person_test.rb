require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  test "invalid with empty attributes" do
    person = Person.new
    assert !person.valid?
    assert person.errors[:title].any?
    assert person.errors[:forename].any?
    assert person.errors[:surname].any?
    assert person.errors[:email].any?
    assert person.errors[:dob].any?
    assert person.errors[:address1].any?
    assert person.errors[:postcode].any?
    assert person.errors[:license_type].any?
    assert person.errors[:license_period].any?
    assert person.errors[:occupation].any?
    assert person.errors[:number_of_claims].any?
  end


  test "unique email" do
    person = Person.new(title: "MR",
                        forename: "ALEX",
                        surname:  "ROAN",
                        email:  people(:one).email,
                        dob:  "1992-05-17",
                        address1: "19 SPENCER DRIVE",
                        postcode: "CF64 2LR",
                        license_type:  "FULL",
                        license_period: "3",
                        occupation: "STUDENT",
                        number_of_claims: "2")
    assert !person.valid?
    end
end
