json.array!(@policies) do |policy|
  json.extract! policy, :excess, :breakdown_cover, :windscreen_cover, :person_pk
  json.url policy_url(policy, format: :json)
end
