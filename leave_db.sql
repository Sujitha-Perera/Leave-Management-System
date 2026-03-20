--
-- PostgreSQL database dump
--

\restrict xFQ0eqoC90GGFXGobgYNWuAGemmRlqOEoJ3sEE1RC4G44xbyTec9Dznbu3ey2of

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: leaves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaves (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    start_date text NOT NULL,
    end_date text NOT NULL,
    reason text NOT NULL,
    status character varying(20) DEFAULT 'PENDING'::character varying,
    reviewed_by bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.leaves OWNER TO postgres;

--
-- Name: leaves_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leaves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leaves_id_seq OWNER TO postgres;

--
-- Name: leaves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leaves_id_seq OWNED BY public.leaves.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: leaves id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves ALTER COLUMN id SET DEFAULT nextval('public.leaves_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: leaves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaves (id, user_id, start_date, end_date, reason, status, reviewed_by, created_at, updated_at) FROM stdin;
1	2	2026-03-25	2026-03-27	Medical leave	APPROVED	4	2026-03-20 18:17:55.202433+05:30	2026-03-21 00:18:17.288996+05:30
2	3	2026-03-20	2026-03-21	sick	APPROVED	4	2026-03-20 20:43:19.783424+05:30	2026-03-21 00:18:25.976148+05:30
3	3	2026-03-24	2026-03-28	baw baw	REJECTED	4	2026-03-21 00:55:49.491149+05:30	2026-03-21 00:58:24.800252+05:30
4	3	2026-03-28	2026-03-30	sick\n	PENDING	\N	2026-03-21 02:02:58.748968+05:30	2026-03-21 02:02:58.748968+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password_hash, role, created_at, updated_at) FROM stdin;
1	Main Manager	manager@test.com	$2a$10$NI3HuhKsaCcE/Gq15tE7sesJ1NLTWHHzoU61BE3JvVajGKI09b8HK	MANAGER	2026-03-20 17:47:55.901491+05:30	2026-03-20 17:47:55.901491+05:30
2	Employee One	employee@test.com	$2a$10$4I0GzK7wuHKaRuc3wTbw7uY1oV29rj4HF1E04kUMHpnkI4OilVeTG	EMPLOYEE	2026-03-20 18:15:09.99219+05:30	2026-03-20 18:15:09.99219+05:30
3	sujitha perera	sujithascc1@gmail.com	$2a$10$WGWCOLLV3me1Q8com1MhRex2ASksGChzxlMN8D4Q45lozyJ1VHrqC	EMPLOYEE	2026-03-20 20:38:06.32432+05:30	2026-03-20 20:38:06.32432+05:30
4	suji manager	sujithap801@gmail.com	$2a$10$qaCu50AXU4tIuc7vc/dH4e3g6GDZecOt3Y1EH/8UCUJ1bic7rCdWK	MANAGER	2026-03-20 20:46:41.087109+05:30	2026-03-20 20:46:41.087109+05:30
5	sujitha perera manager	abc@gmail.com	$2a$10$ev9lj/GDvWQHDA7ICTgS3ukAS2ABwFHnAD.8C/eZ9eqDyZmuWa9RK	MANAGER	2026-03-21 01:00:21.509722+05:30	2026-03-21 01:00:21.509722+05:30
6	P.A Sujitha Perera	abcd@gamil.com	$2a$10$D86welLYNYe8fBVRHtCBWe1dOjJzrOAOpt.1i4XOTiJvM97frhJey	EMPLOYEE	2026-03-21 01:01:33.050353+05:30	2026-03-21 01:01:33.050353+05:30
7	efsefew	sujithap81@gmail.com	$2a$10$PJbsz6TjalNrkuSDJzpelOZjxfSR8XUM7cpuZ//v3fGPZrCXfClJG	EMPLOYEE	2026-03-21 02:48:16.477695+05:30	2026-03-21 02:48:16.477695+05:30
\.


--
-- Name: leaves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaves_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: leaves leaves_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT leaves_pkey PRIMARY KEY (id);


--
-- Name: users uni_users_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uni_users_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: leaves fk_leaves_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT fk_leaves_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict xFQ0eqoC90GGFXGobgYNWuAGemmRlqOEoJ3sEE1RC4G44xbyTec9Dznbu3ey2of

