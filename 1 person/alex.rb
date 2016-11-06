require './Person.rb'

class Alex < Person
	def initialize
		super('Alex Roan')
	end
end

puts Alex.new.greet