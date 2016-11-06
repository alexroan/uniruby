json.array!(@claims) do |claim|
  json.extract! claim, :claim_date, :value, :claim_type, :description, :person_pk
  json.url claim_url(claim, format: :json)
end
