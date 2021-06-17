INSERT INTO customers (name, email, address, city, postcode, country) 
VALUES ('John Smith','j.smith@johnsmith.org','11 New Road','Liverpool','L10 2AB','UK');

INSERT INTO hotels (name, rooms, postcode)
VALUES ('Triple Point Hotel', 10, 'CM194JS');

INSERT INTO bookings (customer_id, hotel_id, checkin_date, nights) 
VALUES (1, 1, '2019-10-01', 2);

INSERT INTO customers (name, email, address, city, postcode, country)
VALUES ('Ronar Eusebio', 'ronar@eusebio.com', 'Sant Ildefons 56', 'Barcelona', '08940', 'ES');

INSERT INTO hotels (name, rooms, postcode)
VALUES ('Triple Point Hotel', 10, 'CM194JS');

INSERT INTO hotels (name, rooms, postcode)
VALUES ('Royal Cosmos Hotel', 5, 'TR209AX');

INSERT INTO hotels (name, rooms, postcode)
VALUES ('Pacific Petal Motel', 15, 'BN180TG');