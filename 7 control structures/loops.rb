def loop_one
	i = 1
	while (i<10)
		i += 1
		puts i
	end
end

def loop_two
	i = 1
	i += 1 while (i < 100)
	puts i
end

def loop_three
	i = 1
	begin
		i += 1
	end while (i < 100)
	puts i
end

def loop_four
	i = 1
	i += 1 until(i >= 1000)
	puts i
end

def loop_five
	i=1
	loop do
		break i if (i >= 4000)
		i += 1
	end
	puts i
end

def loop_six
	i = 1
	4.times do i += 1 end
	puts i
end

def loop_seven
	r = []
	for i in 0..7
		next if i % 2 == 0
		r << i
	end
	puts r
end
	

loop_one
loop_two
loop_three
loop_four
loop_five
loop_six
loop_seven