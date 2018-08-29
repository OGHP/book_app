--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: heatherpa
--

CREATE TABLE public.books (
    id SERIAL PRIMARY KEY,
    author character varying(100),
    title character varying(255),
    isbn character varying(15),
    image_url character varying(255),
    description text
);


--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: heatherpa
--

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: heatherpa
--

--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: heatherpa
--

--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: heatherpa
--

COPY public.books (id, author, title, isbn, image_url, description) FROM stdin;
1	Wheeler W. Dixon	A History of Horror	9780813547954	http://books.google.com/books/content?id=5CtYoSSxomcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Ever since horror leapt from popular fiction to the silver screen in the late 1890s, viewers have experienced fear and pleasure in exquisite combination. A History of Horror, with rare stills from classic films, is the only book to offer a comprehensive survey of this ever-popular film genre. Chronologically examining over fifty horror films from key periods, this one-stop sourcebook unearths the historical origins of legendary characters and explores how the genre fits into the Hollywood studio system and how its enormous success in American and European culture expanded globally over time.
2	Stephen Prince	The Horror Film	9780813533636	http://books.google.com/books/content?id=S6jKVfuQG3wC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Focusing on recent postmodern examples, this is a collection of essays reviewing the history of the horror film and the psychological reasons for its persistent appeal.
3	Linda Badley	Film, Horror, and the Body Fantastic	9780313275234	http://books.google.com/books/content?id=PD1CZfa5wicC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Drawing from feminist film theory, psychoanalytic theory, cultural criticism, and gender studies, Badley interprets horror film as a discourse of the body.
4	Mark Jancovich	The Horror Film	9780415235624	http://books.google.com/books/content?id=Az5dE4nyznsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	This title brings together key articles to provide a comprehensive resource for students of horror cinema. Combining classic and recent articles, each section explores a central issue of horror film.
5	Gregory Albert Waller	American Horrors	9780252014482	http://books.google.com/books/content?id=AavstWM6jjIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api	Since the release of Rosemarys Baby in 1968, the American horror film has become one of the most diverse, commercially successful, widely discussed, and culturally significant film genres. Drawing on a wide range of critical methods, this title examines individual films, directors, and subgenres.
\.
