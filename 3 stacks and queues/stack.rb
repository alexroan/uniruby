def both
	print 'Array as a stack: '
	stack = Array.new()
	stack.push(1)
	stack.push(2)
	stack.push(4)
	print stack.pop until stack.empty?
	
	print "\n"
	print 'Array as queue: '
	queue = Array.new()
	queue.push('a').push('b').push('d')
	
	print queue.shift until queue.empty?
end

puts both