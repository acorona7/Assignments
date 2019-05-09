use sakila;

select first_name, last_name from actor;

select concat(first_name, + " ", + last_name) as Actor_Name from actor;

select actor_id, first_name, last_name from actor
where first_name = "Joe";

select actor_id, first_name, last_name from actor
where last_name like '%GEN%';

select actor_id, first_name, last_name from actor
where last_name like '%LI%' order by last_name desc, first_name desc;

select country_id, country 
from country
where country in ('Afghanistan', 'Bangladesh', 'China');

alter table actor
add column description blob;

alter table actor
drop column description; 

SELECT last_name, COUNT(*) AS Actors_Count
FROM actor GROUP BY last_name;

SELECT last_name, COUNT(*) AS Actors_Count
FROM actor GROUP BY last_name HAVING COUNT(*) > 1;

update actor 
set first_name = 'HARPO'
where first_name = 'GROUCHO' and last_name = 'WILLIAMS';

update actor
set first_name = 'GROUCHO'
where first_name = 'HARPO' and last_name = 'WILLIAMS'; 

describe sakila.address;

select staff.first_name, staff.last_name, address.address, address.address_id
from staff
inner join address on staff.address_id = address.address_id; 

SELECT payment.staff_id, staff.first_name, staff.last_name, sum(payment.amount) as 'Total Amount'
FROM staff INNER JOIN payment ON
staff.staff_id = payment.staff_id AND payment_date LIKE '2005-08%'
group by first_name, last_name;

SELECT film.title, COUNT(film_actor.actor_id) as Actors
FROM film_actor
JOIN film
ON film_actor.film_id = film.film_id
GROUP BY film.title;

select title, (select count(*) from inventory
where film.film_id = inventory.film_id)
as Actors from film
where film_id = '439';

select customer.first_name, customer.last_name, sum(payment.amount) as 'Total Amount'
from payment
join customer
on payment.customer_id = customer.customer_id
group by last_name asc;

select title from film
where title like 'K%' or title like 'Q%'
and title in (select title from film where language_id = 1);

select first_name, last_name from actor 
where actor_id in (select actor_id from film_actor where film_id = 
(select film_id from film where title = 'Alone Trip'));

select first_name, last_name, email
from country inner join city
	on city.country_id = country.country_id 
join address
	on address.city_id = city.city_id
join customer
	on customer.address_id = address.address_id
where country = 'Canada';

select title
from film join film_category 
	on film.film_id = film_category.film_id
join category on category.category_id = film_category.category_id
where name = 'Family';

select film.title, count(film.title) as 'Frequency' from film
join inventory on film.film_id = inventory.film_id
join rental on inventory.inventory_id = rental.inventory_id
group by film.film_id
order by Frequency desc;

select store.store_id, sum(payment.amount) as 'Dollars' from store
join staff on store.store_id = staff.store_id
join payment on staff.staff_id = payment.staff_id
group by store.store_id;

select store.store_id, city.city, country.country from store
join address on store.address_id = address.address_id
join city on address.city_id = city.city_id
join country on city.country_id = country.country_id; 

select category.name, sum(payment.amount) as 'Gross Revenue' from payment
join rental on payment.rental_id = rental.rental_id
join inventory on rental.inventory_id = inventory.inventory_id
join film_category on inventory.film_id = film_category.film_id
join category on film_category.category_id = category.category_id
group by category.category_id
order by 'Gross Revenue' desc limit 5;

create view Top_Five as
		select category.name, sum(payment.amount) as 'Gross Revenue' from payment 
		join rental on payment.rental_id = rental.rental_id 
		join inventory on rental.inventory_id = inventory.inventory_id 
		join film_category on inventory.film_id = film_category.film_id
		join category on film_category.category_id = category.category_id
		group by category.category_id
		order by 'Gross Revenue' desc limit 5;

select * from Top_Five;

drop view Top_Five;