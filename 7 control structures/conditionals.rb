def conditional_one(number)
	if(number < 10)
		"Number is less than 10"
	else
		"Number is more than 10"
	end
end


def conditional_two(number)
	"Less than 10" if (number < 10)
	#"More than 10" if (number > 10)
end

def conditional_three(number)
	(number < 10) ? 'Less than 10' : 'More than 10'
end

puts conditional_one(1)
puts conditional_two(1)
puts conditional_three(1)
