select * from customers WHERE name = 'Laurence Lebihan';

select name, country from customers WHERE country = 'UK';

select address, city, postcode from customers WHERE name = 'Melinda Marsh';

select * from hotels WHERE postcode = 'DGQ127';

select * from hotels WHERE rooms > 11;

select * from hotels WHERE rooms > 6 and rooms < 15;

select * from hotels WHERE rooms = 10 or rooms = 20;

select * from bookings WHERE customer_id = 1;

select * from bookings WHERE nights > 4;

select * from bookings WHERE checkin_date >= '2020-01-01';

select * from bookings WHERE checkin_date <= '2020-01-01' and nights < 4;

