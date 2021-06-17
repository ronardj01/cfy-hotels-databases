select * from customers;
select * from hotels;
select * from bookings;

SELECT name,address FROM customers;

SELECT * FROM hotels WHERE rooms > 7;

SELECT name,address FROM customers WHERE id = 1;

SELECT * FROM bookings WHERE checkin_date > '2019/10/01';

SELECT * FROM bookings WHERE checkin_date > '2019/10/01' AND nights >= 2;

SELECT * FROM hotels WHERE postcode = 'CM194JS' OR postcode = 'TR209AX';