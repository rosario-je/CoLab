INSERT INTO group_chat_messages (chat_room_id, sender_id, message, created_at) VALUES
-- Messages for chat room 2 ('Naruto Missions Tracker')
(2, 2, 'Hey team, we need to finalize the design for the mission tracking interface. Please review the latest wireframes.', '2024-02-11 10:00:00'),
(2, 2, 'I''ve completed the backend integration for tracking mission statuses. Let''s test it to ensure everything is working properly.', '2024-02-11 11:00:00'),
(2, 1, 'I''ve started working on the mission rewards module. The initial setup is done, and I''m integrating it with the frontend.', '2024-02-12 09:30:00'),
(2, 1, 'I''ve encountered some issues with the data validation for mission rewards. I''ll need help to debug this.', '2024-02-12 10:00:00'),
(2, 11, 'I''m setting up the API endpoints for mission assignments. The basic functionality is working, but I need some feedback on the implementation.', '2024-02-13 14:00:00'),
(2, 11, 'I''ve added error handling to the mission assignment API. Can someone test the endpoints and confirm if they are working as expected?', '2024-02-13 15:00:00'),
(2, 10, 'I''ve finished implementing the mission status updates. I''m now working on the user notifications for status changes.', '2024-02-14 16:00:00'),
(2, 10, 'I''m having some issues with the notifications. The system seems to be sending duplicate messages. I''ll need some help to fix this.', '2024-02-14 17:00:00'),

-- Messages for chat room 3 ('Straw Hat Crew Task Manager')
(3, 3, 'I''ve started the development of the task assignment module. The basic functionality is in place. Let me know if you have any suggestions.', '2024-07-02 09:00:00'),
(3, 3, 'I''m working on integrating the task manager with our existing database. I''ll update the team once this is completed.', '2024-07-02 10:30:00'),
(3, 1, 'I''ve finished designing the task dashboard. The user interface is now ready for review.', '2024-07-03 08:45:00'),
(3, 1, 'I''m integrating the dashboard with the task management backend. This includes linking tasks to user profiles.', '2024-07-03 10:15:00'),
(3, 8, 'I''m developing the task notifications system. The initial version is complete, but it needs further testing.', '2024-07-04 11:00:00'),
(3, 8, 'I''m encountering issues with the notification delivery. It seems that some notifications are not being sent. I''ll need assistance to resolve this.', '2024-07-04 12:30:00'),
(3, 1, 'We should have a code review meeting tomorrow to go over our current progress and discuss any challenges we''re facing.', '2024-07-05 13:00:00'),
(3, 3, 'Agreed. I''ll prepare the agenda and send out invites for the meeting.', '2024-07-05 14:00:00'),


-- Conversation for 'Saiyan Battle Simulator'
(14, 4, 'Hey team, we need to start planning our work for the Saiyan Battle Simulator. Let''s discuss our goals and set up our tasks.', '2024-07-26 09:00:00'), -- Goku
(14, 6, 'I think the first step should be to sketch out the UI design. We need to decide on the layout for battle strategies and training logs.', '2024-07-26 09:15:00'), -- Natsu
(14, 13, 'I can start working on the UI mockups based on our initial ideas. We need to make sure it aligns with the project vision.', '2024-07-26 09:30:00'), -- Megumi
(14, 9, 'I''ll handle the backend setup and database schema. We should prepare for various battle scenarios and track user progress.', '2024-07-26 09:45:00'), -- Mikasa
(14, 4, 'Great. Mikasa, ensure the backend can support our planned features and user data.', '2024-07-26 10:00:00'), -- Goku
(14, 6, 'I''ll work on the initial design for the main dashboard and battle interface. I''ll need everyone''s input before finalizing it.', '2024-07-26 10:15:00'), -- Natsu
(14, 13, 'I''ll review the mockups and give feedback. We should also discuss user roles and permissions soon.', '2024-07-26 10:30:00'), -- Megumi
(14, 9, 'I''ll start setting up user roles in the backend. We''ll need different roles for users, admins, and so on.', '2024-07-26 10:45:00'), -- Mikasa
(14, 4, 'Sounds good. Let''s plan a quick meeting for tomorrow to review what we have and decide on our next steps.', '2024-07-26 11:00:00'), -- Goku
(14, 6, 'I''ll aim to have some initial mockups ready by then for everyone to look at.', '2024-07-26 11:15:00'), -- Natsu
(14, 13, 'I''ll prepare some initial scenarios and use cases to test the UI concepts.', '2024-07-26 11:30:00'), -- Megumi
(14, 9, 'I''ll ensure that the backend is ready for integration with the frontend as soon as we have the initial designs.', '2024-07-26 11:45:00'), -- Mikasa
(14, 4, 'Perfect. Please document your progress and any issues you encounter. We''ll review everything in tomorrow''s meeting.', '2024-07-26 12:00:00'), -- Goku
(14, 6, 'Will do. I''ll keep everyone updated with my progress on the UI design.', '2024-07-26 12:15:00'), -- Natsu
(14, 13, 'I''ll gather feedback and prepare questions for our discussion tomorrow.', '2024-07-26 12:30:00'), -- Megumi
(14, 9, 'Hey team, I''ve completed the backend setup and tested the initial endpoints. Everything is working as expected so far, but we need to start integrating with the frontend soon.', '2024-08-02 09:00:00'), -- Mikasa
(14, 4, 'Thanks for the update, Mikasa. Once the frontend integration starts, let''s ensure we have a solid testing plan in place.', '2024-08-02 09:15:00'), -- Goku
(14, 6, 'I''m almost done with the revised UI designs. I''ll be ready to share them with everyone for feedback by tomorrow.', '2024-08-02 09:30:00'), -- Natsu
(14, 13, 'Great to hear. I''m also finalizing the user scenarios and test cases. I''ll have them ready for review by the end of the day.', '2024-08-02 09:45:00'), -- Megumi
(14, 4, 'Perfect. Let''s aim to have a detailed review session in a few weeks to align on our progress and address any issues.', '2024-08-02 10:00:00'); -- Goku