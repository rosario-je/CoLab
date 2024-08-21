--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: chat_rooms; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.chat_rooms (
    id integer NOT NULL,
    project_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.chat_rooms OWNER TO final;

--
-- Name: chat_rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.chat_rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_rooms_id_seq OWNER TO final;

--
-- Name: chat_rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.chat_rooms_id_seq OWNED BY public.chat_rooms.id;


--
-- Name: group_chat; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.group_chat (
    id integer NOT NULL,
    project_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_chat OWNER TO final;

--
-- Name: group_chat_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.group_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_chat_id_seq OWNER TO final;

--
-- Name: group_chat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.group_chat_id_seq OWNED BY public.group_chat.id;


--
-- Name: group_chat_messages; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.group_chat_messages (
    id integer NOT NULL,
    chat_room_id integer NOT NULL,
    sender_id integer NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_chat_messages OWNER TO final;

--
-- Name: group_chat_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.group_chat_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_chat_messages_id_seq OWNER TO final;

--
-- Name: group_chat_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.group_chat_messages_id_seq OWNED BY public.group_chat_messages.id;


--
-- Name: group_chats; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.group_chats (
    id integer NOT NULL,
    project_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_chats OWNER TO final;

--
-- Name: group_chats_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.group_chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_chats_id_seq OWNER TO final;

--
-- Name: group_chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.group_chats_id_seq OWNED BY public.group_chats.id;


--
-- Name: join_requests; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.join_requests (
    id integer NOT NULL,
    user_id integer NOT NULL,
    project_id integer NOT NULL,
    is_accepted boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.join_requests OWNER TO final;

--
-- Name: join_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.join_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.join_requests_id_seq OWNER TO final;

--
-- Name: join_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.join_requests_id_seq OWNED BY public.join_requests.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO final;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO final;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: project_participants; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.project_participants (
    id integer NOT NULL,
    project_id integer,
    participant_id integer,
    is_approved boolean DEFAULT false,
    is_pending_join boolean DEFAULT false
);


ALTER TABLE public.project_participants OWNER TO final;

--
-- Name: project_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.project_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_participants_id_seq OWNER TO final;

--
-- Name: project_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.project_participants_id_seq OWNED BY public.project_participants.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    owner_id integer NOT NULL,
    max_participants integer NOT NULL,
    cover_photo_path character varying,
    github_repo character varying,
    figma_link character varying,
    trello_link character varying,
    is_in_progress boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.projects OWNER TO final;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO final;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: projects_participants; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.projects_participants (
    id integer NOT NULL,
    project_id integer,
    participant_id integer NOT NULL
);


ALTER TABLE public.projects_participants OWNER TO final;

--
-- Name: projects_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.projects_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_participants_id_seq OWNER TO final;

--
-- Name: projects_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.projects_participants_id_seq OWNED BY public.projects_participants.id;


--
-- Name: projects_pics; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.projects_pics (
    id integer NOT NULL,
    project_id integer NOT NULL,
    picture_path character varying NOT NULL,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    uploaded_by integer NOT NULL,
    is_cover_photo boolean DEFAULT false
);


ALTER TABLE public.projects_pics OWNER TO final;

--
-- Name: projects_pics_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.projects_pics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_pics_id_seq OWNER TO final;

--
-- Name: projects_pics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.projects_pics_id_seq OWNED BY public.projects_pics.id;


--
-- Name: tech_requirements; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.tech_requirements (
    id integer NOT NULL,
    project_id integer NOT NULL,
    tech_name character varying NOT NULL
);


ALTER TABLE public.tech_requirements OWNER TO final;

--
-- Name: tech_requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.tech_requirements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tech_requirements_id_seq OWNER TO final;

--
-- Name: tech_requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.tech_requirements_id_seq OWNED BY public.tech_requirements.id;


--
-- Name: todo_list; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.todo_list (
    id integer NOT NULL,
    project_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.todo_list OWNER TO final;

--
-- Name: todo_list_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.todo_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_list_id_seq OWNER TO final;

--
-- Name: todo_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.todo_list_id_seq OWNED BY public.todo_list.id;


--
-- Name: todo_lists; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.todo_lists (
    id integer NOT NULL,
    project_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.todo_lists OWNER TO final;

--
-- Name: todo_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.todo_lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_lists_id_seq OWNER TO final;

--
-- Name: todo_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.todo_lists_id_seq OWNED BY public.todo_lists.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: final
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    password character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    profile_pic character varying
);


ALTER TABLE public.users OWNER TO final;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: final
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO final;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: final
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chat_rooms id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.chat_rooms ALTER COLUMN id SET DEFAULT nextval('public.chat_rooms_id_seq'::regclass);


--
-- Name: group_chat id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat ALTER COLUMN id SET DEFAULT nextval('public.group_chat_id_seq'::regclass);


--
-- Name: group_chat_messages id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat_messages ALTER COLUMN id SET DEFAULT nextval('public.group_chat_messages_id_seq'::regclass);


--
-- Name: group_chats id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chats ALTER COLUMN id SET DEFAULT nextval('public.group_chats_id_seq'::regclass);


--
-- Name: join_requests id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.join_requests ALTER COLUMN id SET DEFAULT nextval('public.join_requests_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: project_participants id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.project_participants ALTER COLUMN id SET DEFAULT nextval('public.project_participants_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: projects_participants id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_participants ALTER COLUMN id SET DEFAULT nextval('public.projects_participants_id_seq'::regclass);


--
-- Name: projects_pics id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_pics ALTER COLUMN id SET DEFAULT nextval('public.projects_pics_id_seq'::regclass);


--
-- Name: tech_requirements id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.tech_requirements ALTER COLUMN id SET DEFAULT nextval('public.tech_requirements_id_seq'::regclass);


--
-- Name: todo_list id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.todo_list ALTER COLUMN id SET DEFAULT nextval('public.todo_list_id_seq'::regclass);


--
-- Name: todo_lists id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.todo_lists ALTER COLUMN id SET DEFAULT nextval('public.todo_lists_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: chat_rooms; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.chat_rooms (id, project_id, created_at) FROM stdin;
1	1	2024-01-05 14:23:45
2	2	2024-02-10 09:15:30
3	3	2024-07-01 11:32:10
4	4	2024-03-23 16:54:12
5	5	2024-07-05 08:42:30
6	6	2024-06-20 11:45:35
7	7	2024-05-20 15:22:10
8	8	2024-04-12 13:27:55
9	9	2024-02-25 09:40:10
10	10	2024-01-30 14:05:45
11	11	2024-03-10 16:30:55
12	12	2024-06-15 10:56:25
13	13	2024-07-15 12:30:00
14	14	2024-07-25 17:05:25
15	15	2024-08-15 15:25:02.214343
16	16	2024-08-20 12:50:02.407012
\.


--
-- Data for Name: group_chat; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.group_chat (id, project_id, created_at) FROM stdin;
\.


--
-- Data for Name: group_chat_messages; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.group_chat_messages (id, chat_room_id, sender_id, message, created_at) FROM stdin;
1	1	1	Welcome to the Konoha Village Chat project. Let's start by outlining our features and design.	2024-01-06 09:00:00
2	1	2	I think we should focus on integrating real-time messaging features first.	2024-01-06 10:30:00
3	1	12	Agreed. We also need to set up user authentication and security.	2024-01-07 14:15:00
4	1	3	How about we finalize the tech stack by the end of this week?	2024-01-08 08:45:00
5	1	2	I can work on the initial UI design. Any preferences for the layout?	2024-01-08 16:00:00
6	1	12	Let's include a chat history feature. It's crucial for our app.	2024-01-09 11:00:00
7	1	1	Great ideas. I'll start setting up the project repository.	2021-01-10 10:00:00
8	1	3	Is everyone okay with the current tech stack? Any objections?	2024-01-10 15:00:00
9	1	12	No objections from my side. Let's get started on the implementation.	2024-01-11 09:00:00
10	1	2	I'll focus on backend integration and real-time messaging.	2024-01-11 12:00:00
11	1	1	Perfect. I'll work on the frontend components.	2024-01-12 10:00:00
12	1	3	We should have a progress check-in by next week.	2024-01-12 15:00:00
13	1	12	Sounds good. I'll prepare a progress report.	2024-01-13 09:00:00
14	1	2	Let's schedule a meeting to review the first build.	2024-01-14 08:00:00
15	2	2	Hey team, we need to finalize the design for the mission tracking interface. Please review the latest wireframes.	2024-02-11 10:00:00
16	2	2	I've completed the backend integration for tracking mission statuses. Let's test it to ensure everything is working properly.	2024-02-11 11:00:00
17	2	1	I've started working on the mission rewards module. The initial setup is done, and I'm integrating it with the frontend.	2024-02-12 09:30:00
18	2	1	I've encountered some issues with the data validation for mission rewards. I'll need help to debug this.	2024-02-12 10:00:00
19	2	11	I'm setting up the API endpoints for mission assignments. The basic functionality is working, but I need some feedback on the implementation.	2024-02-13 14:00:00
20	2	11	I've added error handling to the mission assignment API. Can someone test the endpoints and confirm if they are working as expected?	2024-02-13 15:00:00
21	2	10	I've finished implementing the mission status updates. I'm now working on the user notifications for status changes.	2024-02-14 16:00:00
22	2	10	I'm having some issues with the notifications. The system seems to be sending duplicate messages. I'll need some help to fix this.	2024-02-14 17:00:00
23	3	3	I've started the development of the task assignment module. The basic functionality is in place. Let me know if you have any suggestions.	2024-07-02 09:00:00
24	3	3	I'm working on integrating the task manager with our existing database. I'll update the team once this is completed.	2024-07-02 10:30:00
25	3	1	I've finished designing the task dashboard. The user interface is now ready for review.	2024-07-03 08:45:00
26	3	1	I'm integrating the dashboard with the task management backend. This includes linking tasks to user profiles.	2024-07-03 10:15:00
27	3	8	I'm developing the task notifications system. The initial version is complete, but it needs further testing.	2024-07-04 11:00:00
28	3	8	I'm encountering issues with the notification delivery. It seems that some notifications are not being sent. I'll need assistance to resolve this.	2024-07-04 12:30:00
29	3	1	We should have a code review meeting tomorrow to go over our current progress and discuss any challenges we're facing.	2024-07-05 13:00:00
30	3	3	Agreed. I'll prepare the agenda and send out invites for the meeting.	2024-07-05 14:00:00
31	4	4	Welcome to the Dragon Ball Training Tracker. Let's get started on our features.	2024-03-24 09:00:00
32	4	5	I'll work on the training session scheduling. Any other priorities?	2024-03-24 10:00:00
33	4	13	We need to track battle results and training progress.	2024-03-25 08:30:00
34	4	6	Agreed. I'll handle the battle results module.	2024-03-25 11:00:00
35	4	5	Let's finalize the UI design this week.	2024-03-26 09:00:00
36	4	13	I'll work on the front-end components for tracking.	2024-03-26 11:30:00
37	4	6	We should be ready for initial testing by next week.	2024-03-27 10:00:00
38	4	5	Sounds good. I'll prepare a test plan.	2024-03-27 14:00:00
39	4	13	Let's also ensure we have a way to record user feedback.	2024-03-28 09:00:00
40	4	4	I'll add that to the plan. Thanks, everyone.	2024-03-28 11:00:00
41	5	3	We've reached the max capacity for the One Piece Treasure Market project. Let's ensure everything is in order.	2024-04-13 09:00:00
42	5	10	I'm finalizing the marketplace features. How are the payment systems?	2024-04-14 10:00:00
43	5	11	I'm integrating payment gateways. We should be ready for testing soon.	2024-04-15 08:30:00
44	5	1	Let's also work on user reviews and ratings.	2024-04-15 11:00:00
45	5	10	I'll handle the review system. We need to ensure it's secure.	2024-04-16 09:00:00
46	5	11	I'm setting up the admin panel for managing listings.	2024-04-16 12:00:00
47	5	14	We should schedule a beta test for the end of the week.	2024-04-17 08:00:00
48	5	14	I'll start preparing the test environment.	2024-04-17 10:00:00
49	5	11	Great. I'll update the documentation.	2024-04-18 09:00:00
50	5	3	Thanks. Let's meet for a review meeting after the beta test.	2024-04-19 09:00:00
51	6	5	The Fullmetal Alchemist Research Hub project is complete. Great job, everyone!	2024-07-01 15:00:00
52	6	7	Thanks! It was a fantastic project to work on.	2024-07-01 15:15:00
53	6	8	Agreed. The final results are impressive.	2024-07-01 15:30:00
54	6	5	Let's review the outcomes and prepare a final report.	2024-07-02 09:00:00
55	6	7	I'll handle the final report compilation.	2024-07-02 10:00:00
56	6	8	I'll assist with the review and ensure everything is documented.	2024-07-02 11:00:00
57	6	9	Thanks, everyone. I'll schedule a wrap-up meeting for next week.	2024-07-02 12:00:00
58	6	7	Sounds good. I'll prepare the presentation for the meeting.	2024-07-03 09:00:00
59	6	8	Looking forward to seeing the final presentation.	2024-07-03 10:00:00
60	6	5	Meeting scheduled for June 10th. Thanks again for all your hard work.	2024-07-03 11:00:00
61	7	6	Welcome to the Stand User Network project! Let's outline our features and objectives.	2024-05-20 09:00:00
62	7	6	I'll handle the Stand user stats and abilities management.	2024-05-20 10:00:00
63	7	1	We need to set up user interactions and battle tracking.	2024-05-21 08:30:00
64	7	11	I'll work on integrating the interaction features.	2024-05-21 11:00:00
65	7	6	Let's finalize the database schema for storing Stand and battle data.	2024-05-22 09:00:00
66	7	3	I'll prepare the initial UI designs for user management.	2024-05-22 11:30:00
67	7	11	Great. I'll start on the API for Stand data retrieval.	2024-05-23 09:00:00
68	7	1	We should set up a testing environment by next week.	2024-05-24 09:00:00
69	7	3	I'll assist with the test environment setup.	2024-05-25 09:00:00
70	7	11	Thanks. I'll arrange a review meeting next week.	2024-05-26 08:00:00
71	8	7	Starting the Death Note Analysis Tool project. Let's discuss our analysis features.	2024-07-10 09:00:00
72	8	5	I'll work on the feature to track character interactions.	2024-07-10 10:00:00
73	8	14	We need a system to analyze plot developments and key events.	2024-07-11 08:30:00
74	8	7	Agreed. I'll start with the data analysis components.	2024-07-11 11:00:00
75	8	5	Let's also include a visualization tool for the analysis results.	2024-07-12 09:00:00
76	8	14	I'll handle the visualizations and reporting features.	2024-07-12 10:00:00
77	8	7	We should prepare a test build by next week.	2024-07-13 09:00:00
78	8	5	I'll assist with testing and bug fixes.	2024-07-14 09:00:00
79	8	14	Let's schedule a review meeting after the test.	2024-07-15 09:00:00
80	9	8	Welcome to the Inuyasha Time Travel Diary project. Let's define our time travel features.	2024-06-21 09:00:00
81	9	7	I'll handle the time travel tracking module.	2024-06-21 10:00:00
82	9	2	We need to integrate character and event logs.	2024-06-22 08:30:00
83	9	1	I'll work on integrating the event logging features.	2024-06-22 11:00:00
84	9	7	Let's also set up a system for visualizing time travel paths.	2024-06-23 09:00:00
85	9	8	I'll start on the visualization components.	2024-06-23 10:00:00
86	9	1	We should aim for a demo by next week.	2024-06-24 09:00:00
87	9	7	I'll prepare a test plan for the demo.	2024-06-25 09:00:00
88	9	2	Great. Let's schedule a review meeting.	2024-06-26 08:00:00
89	9	8	I'll arrange the meeting. Thanks, everyone.	2024-06-27 09:00:00
90	10	9	Let's start our Attack on Titan Defense Simulator project. We need to discuss the simulation features.	2024-02-01 09:00:00
91	10	13	I'll handle the defense system setup.	2024-02-01 10:00:00
92	10	11	We should integrate enemy AI and defense mechanics.	2024-02-02 08:30:00
93	10	4	I'll work on the AI and simulation mechanics.	2024-02-02 11:00:00
94	10	13	Let's set up a test environment for simulation.	2024-02-03 09:00:00
95	10	6	I'll prepare the testing framework.	2024-02-03 11:00:00
96	10	9	We should aim for a demo by next week.	2024-02-04 09:00:00
97	10	13	Sounds good. I'll assist with the demo preparation.	2024-02-05 09:00:00
98	10	11	Let's schedule a review meeting after the demo.	2024-02-06 09:00:00
99	10	4	I agree. I'll organize the review meeting and send out invites.	2024-02-07 09:00:00
100	10	13	Please make sure the demo is ready for the review.	2024-02-07 10:00:00
101	10	11	I'll finalize the demo setup and prepare the presentation.	2024-02-07 11:00:00
102	10	4	Review meeting scheduled for July 12th. Looking forward to it!	2024-02-08 09:00:00
103	10	6	Thanks. I'll ensure everything is ready by then.	2024-02-08 10:00:00
104	10	9	See you at the review meeting. Let's make sure the demo goes smoothly.	2024-02-08 11:00:00
105	11	4	The Dragon Ball Tournament Organizer project is complete. Great work, team!	2024-08-01 15:00:00
106	11	2	Thanks! It was an exciting project to work on.	2024-08-01 15:15:00
107	11	6	Agreed. The final product looks amazing.	2024-08-01 15:30:00
108	11	4	Let's prepare the final project report and summary.	2024-08-02 09:00:00
109	11	14	I'll handle the report and final documentation.	2024-08-02 10:00:00
110	11	13	I'll assist with the review and finalize the documentation.	2024-08-02 11:00:00
111	11	4	Thanks, everyone. I'll set up a wrap-up meeting next week.	2024-08-03 09:00:00
112	11	6	Sounds good. I'll prepare the presentation for the meeting.	2024-08-03 10:00:00
113	11	2	Looking forward to the final review.	2024-08-04 09:00:00
114	11	14	I'll ensure everything is ready for the meeting.	2024-08-04 10:00:00
115	11	4	Meeting scheduled for August 10th. Great job, everyone.	2024-08-04 10:00:00
116	12	4	Welcome to the Saiyan Training Log project. Let's define the training features and goals.	2024-08-01 09:00:00
117	12	14	I'll handle the training log management system.	2024-08-01 10:00:00
118	12	8	We need to set up user progress tracking and training statistics.	2024-08-02 08:30:00
119	12	13	I'll work on the user progress tracking features.	2024-08-02 11:00:00
120	12	14	Let's finalize the database schema for storing training data.	2024-08-03 09:00:00
121	12	8	I'll prepare the initial UI designs for the training log.	2024-08-03 11:30:00
122	12	13	Great. I'll start on integrating the training data system.	2024-08-04 09:00:00
123	12	4	We should set up a testing environment by next week.	2024-08-05 09:00:00
124	12	8	I'll assist with setting up the test environment.	2024-08-06 09:00:00
125	12	4	Thanks. I'll arrange a review meeting next week.	2024-08-07 08:00:00
126	13	10	Starting the Thunder Breathing Training Hub project. Let's outline the training features and objectives.	2024-08-01 09:00:00
127	13	12	I'll handle the training modules and breathing techniques.	2024-08-01 10:00:00
128	13	10	Let's also prepare a system for user feedback and progress reports. And work on recruiting more members	2024-08-02 09:00:00
129	14	4	Hey team, we need to start planning our work for the Saiyan Battle Simulator. Let's discuss our goals and set up our tasks.	2024-07-26 09:00:00
130	14	6	I think the first step should be to sketch out the UI design. We need to decide on the layout for battle strategies and training logs.	2024-07-26 09:15:00
131	14	13	I can start working on the UI mockups based on our initial ideas. We need to make sure it aligns with the project vision.	2024-07-26 09:30:00
132	14	9	I'll handle the backend setup and database schema. We should prepare for various battle scenarios and track user progress.	2024-07-26 09:45:00
133	14	4	Great. Mikasa, ensure the backend can support our planned features and user data.	2024-07-26 10:00:00
134	14	6	I'll work on the initial design for the main dashboard and battle interface. I'll need everyone's input before finalizing it.	2024-07-26 10:15:00
135	14	13	I'll review the mockups and give feedback. We should also discuss user roles and permissions soon.	2024-07-26 10:30:00
136	14	9	I'll start setting up user roles in the backend. We'll need different roles for users, admins, and so on.	2024-07-26 10:45:00
137	14	4	Sounds good. Let's plan a quick meeting for tomorrow to review what we have and decide on our next steps.	2024-07-26 11:00:00
138	14	6	I'll aim to have some initial mockups ready by then for everyone to look at.	2024-07-26 11:15:00
139	14	13	I'll prepare some initial scenarios and use cases to test the UI concepts.	2024-07-26 11:30:00
140	14	9	I'll ensure that the backend is ready for integration with the frontend as soon as we have the initial designs.	2024-07-26 11:45:00
141	14	4	Perfect. Please document your progress and any issues you encounter. We'll review everything in tomorrow's meeting.	2024-07-26 12:00:00
142	14	6	Will do. I'll keep everyone updated with my progress on the UI design.	2024-07-26 12:15:00
143	14	13	I'll gather feedback and prepare questions for our discussion tomorrow.	2024-07-26 12:30:00
144	14	9	Hey team, I've completed the backend setup and tested the initial endpoints. Everything is working as expected so far, but we need to start integrating with the frontend soon.	2024-08-02 09:00:00
145	14	4	Thanks for the update, Mikasa. Once the frontend integration starts, let's ensure we have a solid testing plan in place.	2024-08-02 09:15:00
146	14	6	I'm almost done with the revised UI designs. I'll be ready to share them with everyone for feedback by tomorrow.	2024-08-02 09:30:00
147	14	13	Great to hear. I'm also finalizing the user scenarios and test cases. I'll have them ready for review by the end of the day.	2024-08-02 09:45:00
148	14	4	Perfect. Let's aim to have a detailed review session in a few weeks to align on our progress and address any issues.	2024-08-02 10:00:00
149	15	4	Hey Naruto!	2024-08-15 15:26:30.225828
150	15	1	Hey Goku!	2024-08-15 15:26:34.571793
151	16	4	hehehe	2024-08-20 12:50:26.263538
152	16	1	hehhee	2024-08-20 12:50:29.11588
\.


--
-- Data for Name: group_chats; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.group_chats (id, project_id, created_at) FROM stdin;
1	1	2024-07-31 13:12:56.005824
2	2	2024-07-31 13:12:56.005824
3	3	2024-07-31 13:12:56.005824
4	4	2024-07-31 13:12:56.005824
5	5	2024-07-31 13:12:56.005824
6	6	2024-07-31 13:12:56.005824
7	7	2024-07-31 13:12:56.005824
8	8	2024-07-31 13:12:56.005824
9	9	2024-07-31 13:12:56.005824
10	10	2024-07-31 13:12:56.005824
11	11	2024-07-31 13:12:56.005824
12	12	2024-07-31 13:12:56.005824
13	13	2024-07-31 13:12:56.005824
14	14	2024-07-31 13:12:56.005824
\.


--
-- Data for Name: join_requests; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.join_requests (id, user_id, project_id, is_accepted, created_at) FROM stdin;
1	1	15	t	2024-08-15 15:26:00.291467
2	4	16	t	2024-08-20 12:50:13.769127
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.notifications (id, sender_id, receiver_id, message, created_at) FROM stdin;
2	4	1	Your request to join project CoLab has been approved!	2024-08-15 15:26:17.045268
3	\N	4	You have requested to join the project: Test	2024-08-20 12:50:13.77226
4	1	4	Your request to join project Test has been approved!	2024-08-20 12:50:17.86586
\.


--
-- Data for Name: project_participants; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.project_participants (id, project_id, participant_id, is_approved, is_pending_join) FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.projects (id, name, description, owner_id, max_participants, cover_photo_path, github_repo, figma_link, trello_link, is_in_progress, created_at) FROM stdin;
1	Konoha Village Chat	A real-time messaging application for members of Konoha Village to communicate and strategize.	1	4	https://i.pinimg.com/originals/b1/71/ec/b171ec6c19523d1ee836cd2900af5893.jpg	https://github.com/example/konoha-village-chat	https://figma.com/example/konoha-village-chat	https://trello.com/example/konoha-village-chat	t	2024-01-05 14:23:45
2	Naruto Missions Tracker	A tool for tracking and managing missions assigned to ninja teams, including mission status, rewards, and team assignments.	2	4	https://i.pinimg.com/originals/ad/3d/ab/ad3dab47a175bf036e22a6e9545fa5e8.jpg	https://github.com/example/naruto-missions-tracker	https://figma.com/example/naruto-missions-tracker	https://trello.com/example/naruto-missions-tracker	t	2024-02-10 09:15:30
3	Straw Hat Crew Task Manager	A project management tool for organizing and assigning tasks to the Straw Hat Crew.	3	4	https://i.pinimg.com/originals/af/cc/de/afccdefeae5fee31e5dc4f56fe6b2bfe.jpg	https://github.com/example/crew-task-manager	https://figma.com/example/crew-task-manager	https://trello.com/example/crew-task-manager	t	2024-07-01 11:32:10
4	Dragon Ball Training Tracker	A project management tool for tracking and scheduling training sessions and battles.	4	4	https://qph.cf2.quoracdn.net/main-qimg-b54f828a154b86e5c4cbd8bffbf8fe93	https://github.com/example/dragon-ball-training-tracker	https://figma.com/example/dragon-ball-training-tracker	https://trello.com/example/dragon-ball-training-tracker	t	2024-03-23 16:54:12
5	One Piece Treasure Market	An online platform for buying and selling treasure maps and pirate memorabilia.	3	4	https://imgix.ranker.com/user_node_img/50135/1002685433/original/1002685433-photo-u-207946133	https://github.com/example/one-piece-treasure-market	https://figma.com/example/one-piece-treasure-market	https://trello.com/example/one-piece-treasure-market	t	2024-07-05 08:42:30
6	Fullmetal Alchemist Research Hub	A networking site for alchemists and researchers to share discoveries and collaborate.	5	4	https://i.pinimg.com/originals/5b/3f/46/5b3f46519bd873bc20e765ae122ed329.jpg	https://github.com/example/fullmetal-alchemist-research-hub	https://figma.com/example/fullmetal-alchemist-research-hub	https://trello.com/example/fullmetal-alchemist-research-hub	f	2024-06-20 11:45:35
7	Stand User Network	An app for tracking Stand users, their abilities, and their battles. Includes features for managing Stand stats, user interactions, and fight records.	6	4	https://i.kym-cdn.com/entries/icons/original/000/028/952/cover4.jpg	https://github.com/example/stand-user-network	https://figma.com/example/stand-user-network	https://trello.com/example/stand-user-network	t	2024-05-20 15:22:10
8	Death Note Analysis Tool	An application for analyzing and tracking Death Notes to prevent misuse and identify patterns.	7	4	https://i.redd.it/7n2k6cqfeu381.jpg	https://github.com/example/death-note-analysis-tool	https://figma.com/example/death-note-analysis-tool	https://trello.com/example/death-note-analysis-tool	t	2024-04-12 13:27:55
9	Inuyasha Time Travel Diary	A tool for documenting and managing time travel experiences and encounters with historical figures.	8	4	https://m.media-amazon.com/images/M/MV5BMGI2MDI1N2MtMjkzNC00NjkwLWIyNjAtYWM0OTAyMjAwMjY2XkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg	https://github.com/example/inuyasha-time-travel-diary	https://figma.com/example/inuyasha-time-travel-diary	https://trello.com/example/inuyasha-time-travel-diary	t	2024-02-25 09:40:10
10	Attack on Titan Defense Simulator	A simulation game for strategizing and training in defense against Titans.	9	4	https://i.pinimg.com/originals/74/b2/c2/74b2c27db97a1c64a6b2fc77d34cc73f.jpg	https://github.com/example/attack-on-titan-defense-simulator	https://figma.com/example/attack-on-titan-defense-simulator	https://trello.com/example/attack-on-titan-defense-simulator	t	2024-01-30 14:05:45
11	Dragon Ball Tournament Organizer	An application for organizing and managing Dragon Ball tournaments, including schedules, participant tracking, and match results.	4	4	https://i.pinimg.com/originals/80/3d/bf/803dbf1f6f9c8e18fd297c29995d13dc.jpg	https://github.com/example/dragon-ball-tournament-organizer	https://figma.com/example/dragon-ball-tournament-organizer	https://trello.com/example/dragon-ball-tournament-organizer	f	2024-03-10 16:30:55
12	Saiyan Training Log	A tool for Saiyan warriors to log their training progress, battle encounters, and power level improvements.	4	4	https://i.pinimg.com/originals/04/77/90/04779067a514363b57857c1fbf898029.jpg	https://github.com/example/saiyan-training-log	https://figma.com/example/saiyan-training-log	https://trello.com/example/saiyan-training-log	t	2024-06-15 10:56:25
13	Thunder Breathing Training Hub	A platform for Demon Slayers to master Thunder Breathing techniques, track their training progress, and share their achievements. Includes resources, training modules, and performance tracking.	10	4	https://i.pinimg.com/originals/42/97/2e/42972e03f3ee6080e4d40e1d108e0dfc.jpg	https://github.com/example/zenitsu-thunder-breathing-training-hub	https://figma.com/example/zenitsu-thunder-breathing-training-hub	https://trello.com/example/zenitsu-thunder-breathing-training-hub	t	2024-07-15 12:30:00
14	Saiyan Battle Simulator	A simulation tool for Saiyan warriors to strategize and prepare for battles.	4	4	https://i.pinimg.com/originals/4d/f1/a0/4df1a066cbb26470ef104572a0c68e8d.jpg	https://github.com/example/saiyan-battle-simulator	https://figma.com/example/saiyan-battle-simulator	https://trello.com/example/saiyan-battle-simulator	t	2024-07-25 17:05:25
16	Test	hehehe	1	4					t	2024-08-20 12:50:02.399869
15	CoLab	Colab is a collaborative platform that allows developers to create, join, and manage programming projects. Users can discover projects, collaborate with team members, and effectively manage project details. The app features user authentication, real-time chat, and a project dependant links for GitHub, Trello, and Figma to streamline the project management process.	4	3	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXIAMGkFLzsVXDbZBe176IGoJxYd8Ya2tEkw&s.jpg	https://github.com/rosario-je/CoLab	https://www.figma.com/design/Rek7dJx6vCEmI4pmdVzAtq/FInal-Project?node-id=303-406&t=fDOCw9EXwpE5C39V-1	https://trello.com/b/WmY4gf0Z/colab-final-project	f	2024-08-15 15:25:02.206622
\.


--
-- Data for Name: projects_participants; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.projects_participants (id, project_id, participant_id) FROM stdin;
1	1	2
2	1	3
3	1	12
4	2	1
5	2	11
6	2	10
7	3	1
8	3	12
9	4	6
10	4	13
11	4	5
12	5	1
13	5	14
14	5	11
15	5	10
16	6	9
17	6	7
18	6	8
19	7	1
20	7	3
21	7	11
22	8	14
23	8	5
24	9	1
25	9	2
26	9	7
27	10	4
28	10	6
29	10	13
30	10	11
31	11	6
32	11	13
33	11	14
34	11	2
35	12	8
36	12	13
37	12	14
38	13	12
39	14	6
40	14	13
41	14	9
42	15	1
43	16	4
\.


--
-- Data for Name: projects_pics; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.projects_pics (id, project_id, picture_path, uploaded_at, uploaded_by, is_cover_photo) FROM stdin;
1	1	1048204.png	2024-07-28 13:08:56.353846	1	f
2	2	89476.png	2024-07-28 13:08:56.353846	1	f
3	3	1048204.png	2024-07-28 13:08:56.353846	3	f
4	4	1048204.png	2024-07-28 13:08:56.353846	4	f
5	5	89476.png	2024-07-28 13:08:56.353846	1	f
6	6	89476.png	2024-07-28 13:08:56.353846	1	f
7	7	1048204.png	2024-07-28 13:08:56.353846	1	f
8	8	1048204.png	2024-07-28 13:08:56.353846	1	f
9	9	89476.png	2024-07-28 13:08:56.353846	8	f
10	10	1048204.png	2024-07-28 13:08:56.353846	1	f
\.


--
-- Data for Name: tech_requirements; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.tech_requirements (id, project_id, tech_name) FROM stdin;
1	1	Tailwind CSS
2	1	PostgreSQL
3	1	JavaScript
4	1	React
5	2	Bootstrap
6	2	MySQL
7	2	Python
8	2	Django
9	3	Bulma
10	3	MongoDB
11	3	Node.js
12	3	Express.js
13	4	Materialize
14	4	SQLite
15	4	Java
16	4	Spring Boot
17	5	Foundation
18	5	PostgreSQL
19	5	Ruby
20	5	Rails
21	6	Semantic UI
22	6	MySQL
23	6	PHP
24	6	Laravel
25	7	Ant Design
26	7	MongoDB
27	7	JavaScript
28	7	Vue.js
29	8	Bulma
30	8	PostgreSQL
31	8	Python
32	8	Flask
33	9	Tailwind CSS
34	9	SQLite
35	9	JavaScript
36	9	React
37	10	Materialize
38	10	MySQL
39	10	Java
40	10	Spring Boot
41	11	Materialize
42	11	PostgreSQL
43	11	JavaScript
44	11	React
45	12	SCSS
46	12	MongoDB
47	12	TypeScript
48	12	Express.js
49	13	Ant Design
50	13	SQLite
51	13	JavaScript
52	13	Vue.js
53	14	Bulma
54	14	PostgreSQL
55	14	JavaScript
56	14	React
62	15	Express.js
63	15	Node.js
64	15	PostgreSQL
65	15	React
66	15	TailwindCSS
67	16	Ruby on Rails
68	16	Express.js
\.


--
-- Data for Name: todo_list; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.todo_list (id, project_id, created_at) FROM stdin;
\.


--
-- Data for Name: todo_lists; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.todo_lists (id, project_id, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: final
--

COPY public.users (id, first_name, last_name, password, username, email, profile_pic) FROM stdin;
1	Naruto	Uzumaki	123	naruto	naruto@test.com	naruto_pfp.png
2	Sakura	Haruno	123	sakura	sakura@test.com	sakura_pfp.png
3	Luffy	Monkey	123	luffy	luffy@test.com	luffy_pfp.png
4	Goku	Son	123	goku	goku@test.com	goku_pfp.png
5	Edward	Elric	123	edward	edward@test.com	ed_pfp.png
6	Jotaro	Kujo	123	jotaro	jotaro@test.com	jotaro_pfp.png
7	Light	Yagami	123	light	light@test.com	light_pfp.png
8	Inu	Yasha	123	inuyasha	inuyasha@test.com	inuyasha_pfp.png
9	Mikasa	Ackerman	123	mikasa	mikasa@test.com	mikasa_pfp.png
10	Zenitsu	Agatsuma	123	zenitsu	zenitsu@test.com	zenitsu_pfp.png
11	Gojo	Satoru	123	gojo	gojo@test.com	gojo_pfp.png
12	Tanjiro	Kamado	123	tanjiro	tanjiro@test.com	tanjiro_pfp.png
13	Megumi	Fushiguro	123	megumi	megumi@test.com	megumi_pfp.png
14	Reigen	Arataka	123	reigen	reigena@test.com	reigen_pfp.png
\.


--
-- Name: chat_rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.chat_rooms_id_seq', 16, true);


--
-- Name: group_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.group_chat_id_seq', 1, false);


--
-- Name: group_chat_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.group_chat_messages_id_seq', 152, true);


--
-- Name: group_chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.group_chats_id_seq', 14, true);


--
-- Name: join_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.join_requests_id_seq', 2, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.notifications_id_seq', 4, true);


--
-- Name: project_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.project_participants_id_seq', 1, false);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.projects_id_seq', 16, true);


--
-- Name: projects_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.projects_participants_id_seq', 43, true);


--
-- Name: projects_pics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.projects_pics_id_seq', 10, true);


--
-- Name: tech_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.tech_requirements_id_seq', 68, true);


--
-- Name: todo_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.todo_list_id_seq', 1, false);


--
-- Name: todo_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.todo_lists_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: final
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: chat_rooms chat_rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.chat_rooms
    ADD CONSTRAINT chat_rooms_pkey PRIMARY KEY (id);


--
-- Name: group_chat_messages group_chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat_messages
    ADD CONSTRAINT group_chat_messages_pkey PRIMARY KEY (id);


--
-- Name: group_chat group_chat_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat
    ADD CONSTRAINT group_chat_pkey PRIMARY KEY (id);


--
-- Name: group_chats group_chats_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chats
    ADD CONSTRAINT group_chats_pkey PRIMARY KEY (id);


--
-- Name: join_requests join_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.join_requests
    ADD CONSTRAINT join_requests_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: project_participants project_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.project_participants
    ADD CONSTRAINT project_participants_pkey PRIMARY KEY (id);


--
-- Name: projects_participants projects_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_participants
    ADD CONSTRAINT projects_participants_pkey PRIMARY KEY (id);


--
-- Name: projects_pics projects_pics_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_pics
    ADD CONSTRAINT projects_pics_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: tech_requirements tech_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.tech_requirements
    ADD CONSTRAINT tech_requirements_pkey PRIMARY KEY (id);


--
-- Name: todo_list todo_list_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (id);


--
-- Name: todo_lists todo_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.todo_lists
    ADD CONSTRAINT todo_lists_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: chat_rooms chat_rooms_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.chat_rooms
    ADD CONSTRAINT chat_rooms_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: group_chat_messages group_chat_messages_chat_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat_messages
    ADD CONSTRAINT group_chat_messages_chat_room_id_fkey FOREIGN KEY (chat_room_id) REFERENCES public.chat_rooms(id) ON DELETE CASCADE;


--
-- Name: group_chat_messages group_chat_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.group_chat_messages
    ADD CONSTRAINT group_chat_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: join_requests join_requests_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.join_requests
    ADD CONSTRAINT join_requests_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: join_requests join_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.join_requests
    ADD CONSTRAINT join_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects projects_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects_participants projects_participants_participant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_participants
    ADD CONSTRAINT projects_participants_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects_participants projects_participants_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.projects_participants
    ADD CONSTRAINT projects_participants_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: tech_requirements tech_requirements_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: final
--

ALTER TABLE ONLY public.tech_requirements
    ADD CONSTRAINT tech_requirements_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

