
# 1..40.times do |i|
#   Person.create(title:   "title#{i}",
#                 forename:   "forename#{i}",
#                 surname:   "surname",
#                 email:   "alr#{i}@aber.ac.uk",
#                 dob:     "17-05-1992",
#                 phone_number:   "phone_number",
#                 address1:   "address1",
#                 address2:   "address2",
#                 address3:   "address3",
#                 postcode:   "postcode",
#                 license_type:   "license_type",
#                 license_period:  3,
#                 occupation:   "occupation",
#                 number_of_claims:  1)
# end


#1..40.times do |i|
#  Vehicle.create(registration:   "reg#{i}",
#                 annual_mileage:   "#{i}",
#                 value:   "#{i}",
#                 parking_location:   "inside",
#                 policy_start_date:     "17-05-2013",
#                 person_pk:   "#{i}")


1..40.times do |i|
    Claim.create(claim_date:    "17/05/1992",
                  value:        "#{i}",
                  claim_type:   "",
                  description:  "#{i}",
                  person_pk:    "#{i}")
end