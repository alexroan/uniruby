def f(count, &block)
	value = 1
	1.upto(count) do |i|
		value = value + i
		yield(i, value)
	end
end


f(5) do |i, value| puts "f(#{i})=#{value}" end