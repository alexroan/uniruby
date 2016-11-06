json.array!(@people) do |person|
  json.extract! person, :title, :forename, :surname, :email, :dob, :phone_number, :address1, :address2, :address3, :postcode, :license_type, :license_period, :occupation, :number_of_claims, :unique_string
  json.url person_url(person, format: :json)
end
