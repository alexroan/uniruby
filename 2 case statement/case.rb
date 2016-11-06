def greet(*names)
	case names.length
	when 0
		"No names? That's a shame"
	when 1
		"At least there's one!"
	when 2..5
		"Hello #{names.join(', ')}. There is a good number of you"
	when 6..12
		"Wow there are #{names.length} names!"
	else
		"LOADS!"
	end
end

puts greet('Alex', 'Jim', 'Bob', 'Steve', 'Alan')
