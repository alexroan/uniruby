def iterator_do(*stuff)
	stuff.each do |el| 
		print(el, ' ') 
	end
end


def iterator_upto
	var = 1
	1.upto(1) do |i| var += i end
	print(var)
end


iterator_do('My', 'name', 'is', 'Alex')
iterator_upto