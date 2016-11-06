#assigning values

#can be chained
a = b = 4
puts a+b

#Shortcuts
a += 2

#Parallel assignment
a, b = b, a
puts a
puts b

#array splitting/building

array = [1,2]
a,b = *array
*values = a,b