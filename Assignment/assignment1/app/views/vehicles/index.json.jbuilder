json.array!(@vehicles) do |vehicle|
  json.extract! vehicle, :registration, :annual_mileage, :value, :parking_location, :policy_start_date, :person_pk
  json.url vehicle_url(vehicle, format: :json)
end
