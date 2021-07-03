select * from customers ; 


-- EXERCISE 1 
	-- Add a column date_of_birth of type DATE in the customers table.
alter table customers add column date_of_birth date;
		
	-- Rename the column date_of_birth to birthdate in the customers table.
alter table customers rename column date_of_birth to birthdate;

	-- Delete the column birthdate from the customers table.
alter table customers drop column birthdate;

-- EXERCISE 2
	-- Create a new table test.
create table test (
	id			int primary key,
	test_row	varchar(10)
);

	-- Drop the table test.
drop table test;

-- EXERCISE 3
	-- Update the postcode of the hotel named Elder Lake Hotel to L10XYZ.
select id, name, postcode from hotels where name = 'Elder Lake Hotel';
update hotels set postcode = 'L10XYZ' where id = 2;

	-- Update the number of rooms of Cozy Hotel to 25.
select id, name, rooms from hotels where name = 'Cozy Hotel';
update hotels set rooms = 25 where id = 7;

	-- For the customer named Nadia Sethuraman, update her address to 2 Blue Street, her city to Glasgow and her postcode to G11ABC in one query.
select * from customers c where name = 'Nadia Sethuraman';
update customers set address = '2 Blue Street', city = 'Glasgow', postcode = 'G11ABC' where id = 6;

	-- Update all the bookings of customer with ID 1 for the hotel with ID 1 to 5 nights in one query.
select customer_id, hotel_id, nights from bookings b where hotel_id = 1 and customer_id = 1;
update bookings set nights = 5 where hotel_id = 1 and customer_id = 1;

-- EXERCISE 4

	-- Delete the booking of customer ID 8 for the date 2020-01-03.
delete from bookings where customer_id = 8 and checkin_date = '2020-01-03'

	-- Delete all the bookings of customer ID 6.
delete from bookings where customer_id = 6;

	-- Delete the customer with ID 6.
delete from customers where id = 6;

-- EXERCISE 5

	-- Try and understand each of the queries above in your psql prompt.
SELECT * FROM customers INNER JOIN bookings ON customers.id=bookings.customer_id;
SELECT * FROM customers INNER JOIN bookings ON customers.id=bookings.customer_id;
SELECT * FROM bookings
INNER JOIN customers ON customers.id=bookings.customer_id
INNER JOIN hotels ON hotels.id=bookings.hotel_id;

	-- Retrieve all the bookings along with customer data for bookings starting in 2020.
select * from bookings b 
inner join customers c on b.customer_id = c.id
where b.checkin_date >= '2020-01-01';

	-- Retrieve the customer names, booking start dates and number of nights for all customers who booked the hotel name Jade Peaks Hotel.
select c.name from bookings b 
inner join customers c on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id 
where h.name = 'Jade Peaks Hotel';

	-- Retrieve all the booking start dates with customer names and hotel names for all bookings for more than 5 nights.
select b.checkin_date, c.name, h.name from bookings b 
inner join customers c on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id
where b.nights > 5;

-- EXERCISE 6
	
	-- Retrieve all customers whose name starts with the letter S.
select * from customers c where name like 'S%';

	-- Retrieve all hotels which have the word Hotel in their name.
select * from hotels h where name like '%Hotel%';

	-- Retrieve the booking start date, customer name, hotel name for the top 5 bookings ordered by number of nights in descending order.
select b.checkin_date, c.name, h.name, b.nights from bookings b 
inner join customers c on b.customer_id = c.id
inner join hotels h on b.hotel_id = h.id
order by b.nights desc 
limit 5;





