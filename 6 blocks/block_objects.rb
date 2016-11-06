class Repeater
	def initialize(&block)
		@block = block
		@count = 0
	end
	
	def repeat
		@count += 1
		@block.call(@count)
	end
	
end

#Instanciating a new Repeater class object with the new block
#do |count| puts "You called me #{count} times" end
#as the sole parameter.
repeater = Repeater.new do |count|
				puts "You called me #{count} times"
			end


3.times do repeater.repeat end