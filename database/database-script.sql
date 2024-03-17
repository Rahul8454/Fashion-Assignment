 Database: fashionDB

-- DROP DATABASE IF EXISTS "fashionDB";

CREATE DATABASE "fashionDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.fashion_category

-- DROP TABLE IF EXISTS public.fashion_category;

CREATE TABLE IF NOT EXISTS public.fashion_category
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    category character varying(255) COLLATE pg_catalog."default",
    personkey character(2) COLLATE pg_catalog."default",
    CONSTRAINT fashion_category_pkey PRIMARY KEY (id),
    CONSTRAINT fashion_category_category_key UNIQUE (category)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fashion_category
    OWNER to postgres;

-- Table: public.fashion_sub_category

-- DROP TABLE IF EXISTS public.fashion_sub_category;

CREATE TABLE IF NOT EXISTS public.fashion_sub_category
(
    sub_category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    sub_category_name character varying(255) COLLATE pg_catalog."default",
    category_id integer,
    CONSTRAINT fashion_sub_category_pkey PRIMARY KEY (sub_category_id),
    CONSTRAINT fashion_sub_category_sub_category_name_key UNIQUE (sub_category_name),
    CONSTRAINT fashion_sub_category_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.fashion_category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fashion_sub_category
    OWNER to postgres;