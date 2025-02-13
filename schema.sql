BEGIN;

CREATE TABLE IF NOT EXISTS public.event_registrations
(
    id serial NOT NULL,
    user_id integer,
    event_id integer,
    is_paid boolean DEFAULT false,
    payment_status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'pending'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT event_registrations_pkey PRIMARY KEY (id),
    CONSTRAINT event_registrations_user_id_event_id_key UNIQUE (user_id, event_id)
);

CREATE TABLE IF NOT EXISTS public.event_social_posts
(
    id serial NOT NULL,
    event_id integer,
    facebook_post_id character varying(255) COLLATE pg_catalog."default",
    posted_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT event_social_posts_pkey PRIMARY KEY (id),
    CONSTRAINT event_social_posts_facebook_post_id_key UNIQUE (facebook_post_id)
);

CREATE TABLE IF NOT EXISTS public.events
(
    id serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    venue character varying(255) COLLATE pg_catalog."default",
    is_virtual boolean DEFAULT false,
    price numeric(10, 2) DEFAULT 0.00,
    payment_required boolean DEFAULT false,
    cover_image bytea,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_visible boolean DEFAULT true,
    type character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'workshop'::character varying,
    organizer_id integer,  -- Add this line
    CONSTRAINT events_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.interested_sessions
(
    id serial NOT NULL,
    user_id integer,
    session_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT interested_sessions_pkey PRIMARY KEY (id),
    CONSTRAINT interested_sessions_user_id_session_id_key UNIQUE (user_id, session_id)
);

CREATE TABLE IF NOT EXISTS public.payments
(
    id serial NOT NULL,
    user_id integer,
    event_id integer,
    amount_paid numeric(10, 2) NOT NULL,
    payment_method character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT payments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.sessions
(
    id serial NOT NULL,
    event_id integer,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    speaker_id integer,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    venue character varying(255) COLLATE pg_catalog."default",
    is_virtual boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT sessions_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.speaker_profiles
(
    id serial NOT NULL,
    user_id integer,
    bio text COLLATE pg_catalog."default",
    expertise text COLLATE pg_catalog."default",
    linkedin_url character varying(255) COLLATE pg_catalog."default",
    website_url character varying(255) COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT speaker_profiles_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password_hash text COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(50) COLLATE pg_catalog."default",
    facebook_id character varying(255) COLLATE pg_catalog."default",
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'attendee'::character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    given_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    profile_picture bytea,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_facebook_id_key UNIQUE (facebook_id)
);

-- Junction table for many-to-many relationship between events and organizers
CREATE TABLE IF NOT EXISTS public.event_organizers
(
    event_id integer,
    user_id integer,
    PRIMARY KEY (event_id, user_id),
    CONSTRAINT event_organizers_event_id_fkey FOREIGN KEY (event_id)
        REFERENCES public.events (id) ON DELETE CASCADE,
    CONSTRAINT event_organizers_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id)
    REFERENCES public.events (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.event_registrations
    ADD CONSTRAINT event_registrations_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.event_social_posts
    ADD CONSTRAINT event_social_posts_event_id_fkey FOREIGN KEY (event_id)
    REFERENCES public.events (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.events
    ADD CONSTRAINT events_organizer_id_fkey FOREIGN KEY (organizer_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.interested_sessions
    ADD CONSTRAINT interested_sessions_session_id_fkey FOREIGN KEY (session_id)
    REFERENCES public.sessions (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.interested_sessions
    ADD CONSTRAINT interested_sessions_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.payments
    ADD CONSTRAINT payments_event_id_fkey FOREIGN KEY (event_id)
    REFERENCES public.events (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.sessions
    ADD CONSTRAINT sessions_event_id_fkey FOREIGN KEY (event_id)
    REFERENCES public.events (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.sessions
    ADD CONSTRAINT sessions_speaker_id_fkey FOREIGN KEY (speaker_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.speaker_profiles
    ADD CONSTRAINT speaker_profiles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;