def literal_hash
	print "\n"
	hash = {'one'=>1, 'two'=>2, 'three'=>3}
	hash['two']
end

def populate_hash
	print "\n"
	hash = Hash.new
	hash['one'] = 1
	hash['two'] = 2
	hash
end

def symbols_hash
	print "\n"
	hash = Hash.new
	hash = {one:1, two:2}
	hash
end

#Keys can also be other arbitrary objects

	
	
puts literal_hash
puts populate_hash
puts symbols_hash