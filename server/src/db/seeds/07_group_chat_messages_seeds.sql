INSERT INTO group_chat_messages (chat_room_id, sender_id, message, created_at) VALUES
-- Konoha Village Chat (chat_room_id: 1)
(1, 1, 'Welcome to the Konoha Village Chat project. Let''s start by outlining our features and design.', '2024-01-06 09:00:00'),
(1, 2, 'I think we should focus on integrating real-time messaging features first.', '2024-01-06 10:30:00'),
(1, 12, 'Agreed. We also need to set up user authentication and security.', '2024-01-07 14:15:00'),
(1, 3, 'How about we finalize the tech stack by the end of this week?', '2024-01-08 08:45:00'),
(1, 2, 'I can work on the initial UI design. Any preferences for the layout?', '2024-01-08 16:00:00'),
(1, 12, 'Let''s include a chat history feature. It''s crucial for our app.', '2024-01-09 11:00:00'),
(1, 1, 'Great ideas. I''ll start setting up the project repository.', '2021-01-10 10:00:00'),
(1, 3, 'Is everyone okay with the current tech stack? Any objections?', '2024-01-10 15:00:00'),
(1, 12, 'No objections from my side. Let''s get started on the implementation.', '2024-01-11 09:00:00'),
(1, 2, 'I''ll focus on backend integration and real-time messaging.', '2024-01-11 12:00:00'),
(1, 1, 'Perfect. I''ll work on the frontend components.', '2024-01-12 10:00:00'),
(1, 3, 'We should have a progress check-in by next week.', '2024-01-12 15:00:00'),
(1, 12, 'Sounds good. I''ll prepare a progress report.', '2024-01-13 09:00:00'),
(1, 2, 'Let''s schedule a meeting to review the first build.', '2024-01-14 08:00:00'),


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

-- Dragon Ball Training Tracker (chat_room_id: 4)
(4, 4, 'Welcome to the Dragon Ball Training Tracker. Let''s get started on our features.', '2024-03-24 09:00:00'),
(4, 5, 'I''ll work on the training session scheduling. Any other priorities?', '2024-03-24 10:00:00'),
(4, 13, 'We need to track battle results and training progress.', '2024-03-25 08:30:00'),
(4, 6, 'Agreed. I''ll handle the battle results module.', '2024-03-25 11:00:00'),
(4, 5, 'Let''s finalize the UI design this week.', '2024-03-26 09:00:00'),
(4, 13, 'I''ll work on the front-end components for tracking.', '2024-03-26 11:30:00'),
(4, 6, 'We should be ready for initial testing by next week.', '2024-03-27 10:00:00'),
(4, 5, 'Sounds good. I''ll prepare a test plan.', '2024-03-27 14:00:00'),
(4, 13, 'Let''s also ensure we have a way to record user feedback.', '2024-03-28 09:00:00'),
(4, 4, 'I''ll add that to the plan. Thanks, everyone.', '2024-03-28 11:00:00'),

-- One Piece Treasure Market (chat_room_id: 5)
(5, 3, 'We''ve reached the max capacity for the One Piece Treasure Market project. Let''s ensure everything is in order.', '2024-04-13 09:00:00'),
(5, 10, 'I''m finalizing the marketplace features. How are the payment systems?', '2024-04-14 10:00:00'),
(5, 11, 'I''m integrating payment gateways. We should be ready for testing soon.', '2024-04-15 08:30:00'),
(5, 1, 'Let''s also work on user reviews and ratings.', '2024-04-15 11:00:00'),
(5, 10, 'I''ll handle the review system. We need to ensure it''s secure.', '2024-04-16 09:00:00'),
(5, 11, 'I''m setting up the admin panel for managing listings.', '2024-04-16 12:00:00'),
(5, 14, 'We should schedule a beta test for the end of the week.', '2024-04-17 08:00:00'),
(5, 14, 'I''ll start preparing the test environment.', '2024-04-17 10:00:00'),
(5, 11, 'Great. I''ll update the documentation.', '2024-04-18 09:00:00'),
(5, 3, 'Thanks. Let''s meet for a review meeting after the beta test.', '2024-04-19 09:00:00'),

-- Fullmetal Alchemist Research Hub (chat_room_id: 6) - Project Completed
(6, 5, 'The Fullmetal Alchemist Research Hub project is complete. Great job, everyone!', '2024-07-01 15:00:00'),
(6, 7, 'Thanks! It was a fantastic project to work on.', '2024-07-01 15:15:00'),
(6, 8, 'Agreed. The final results are impressive.', '2024-07-01 15:30:00'),
(6, 5, 'Let''s review the outcomes and prepare a final report.', '2024-07-02 09:00:00'),
(6, 7, 'I''ll handle the final report compilation.', '2024-07-02 10:00:00'),
(6, 8, 'I''ll assist with the review and ensure everything is documented.', '2024-07-02 11:00:00'),
(6, 9, 'Thanks, everyone. I''ll schedule a wrap-up meeting for next week.', '2024-07-02 12:00:00'),
(6, 7, 'Sounds good. I''ll prepare the presentation for the meeting.', '2024-07-03 09:00:00'),
(6, 8, 'Looking forward to seeing the final presentation.', '2024-07-03 10:00:00'),
(6, 5, 'Meeting scheduled for June 10th. Thanks again for all your hard work.', '2024-07-03 11:00:00'),

-- Stand User Network (chat_room_id: 7)
(7, 6, 'Welcome to the Stand User Network project! Let''s outline our features and objectives.', '2024-05-20 09:00:00'),
(7, 6, 'I''ll handle the Stand user stats and abilities management.', '2024-05-20 10:00:00'),
(7, 1, 'We need to set up user interactions and battle tracking.', '2024-05-21 08:30:00'),
(7, 11, 'I''ll work on integrating the interaction features.', '2024-05-21 11:00:00'),
(7, 6, 'Let''s finalize the database schema for storing Stand and battle data.', '2024-05-22 09:00:00'),
(7, 3, 'I''ll prepare the initial UI designs for user management.', '2024-05-22 11:30:00'),
(7, 11, 'Great. I''ll start on the API for Stand data retrieval.', '2024-05-23 09:00:00'),
(7, 1, 'We should set up a testing environment by next week.', '2024-05-24 09:00:00'),
(7, 3, 'I''ll assist with the test environment setup.', '2024-05-25 09:00:00'),
(7, 11, 'Thanks. I''ll arrange a review meeting next week.', '2024-05-26 08:00:00'),


-- Death Note Analysis Tool (chat_room_id: 8)
(8, 7, 'Starting the Death Note Analysis Tool project. Let''s discuss our analysis features.', '2024-07-10 09:00:00'),
(8, 5, 'I''ll work on the feature to track character interactions.', '2024-07-10 10:00:00'),
(8, 14, 'We need a system to analyze plot developments and key events.', '2024-07-11 08:30:00'),
(8, 7, 'Agreed. I''ll start with the data analysis components.', '2024-07-11 11:00:00'),
(8, 5, 'Let''s also include a visualization tool for the analysis results.', '2024-07-12 09:00:00'),
(8, 14, 'I''ll handle the visualizations and reporting features.', '2024-07-12 10:00:00'),
(8, 7, 'We should prepare a test build by next week.', '2024-07-13 09:00:00'),
(8, 5, 'I''ll assist with testing and bug fixes.', '2024-07-14 09:00:00'),
(8, 14, 'Let''s schedule a review meeting after the test.', '2024-07-15 09:00:00'),

-- Inuyasha Time Travel Diary (chat_room_id: 9)
(9, 8, 'Welcome to the Inuyasha Time Travel Diary project. Let''s define our time travel features.', '2024-06-21 09:00:00'),
(9, 7, 'I''ll handle the time travel tracking module.', '2024-06-21 10:00:00'),
(9, 2, 'We need to integrate character and event logs.', '2024-06-22 08:30:00'),
(9, 1, 'I''ll work on integrating the event logging features.', '2024-06-22 11:00:00'),
(9, 7, 'Let''s also set up a system for visualizing time travel paths.', '2024-06-23 09:00:00'),
(9, 8, 'I''ll start on the visualization components.', '2024-06-23 10:00:00'),
(9, 1, 'We should aim for a demo by next week.', '2024-06-24 09:00:00'),
(9, 7, 'I''ll prepare a test plan for the demo.', '2024-06-25 09:00:00'),
(9, 2, 'Great. Let''s schedule a review meeting.', '2024-06-26 08:00:00'),
(9, 8, 'I''ll arrange the meeting. Thanks, everyone.', '2024-06-27 09:00:00'),

-- Attack on Titan Defense Simulator (chat_room_id: 10)
(10, 9, 'Let''s start our Attack on Titan Defense Simulator project. We need to discuss the simulation features.', '2024-02-01 09:00:00'),
(10, 13, 'I''ll handle the defense system setup.', '2024-02-01 10:00:00'),
(10, 11, 'We should integrate enemy AI and defense mechanics.', '2024-02-02 08:30:00'),
(10, 4, 'I''ll work on the AI and simulation mechanics.', '2024-02-02 11:00:00'),
(10, 13, 'Let''s set up a test environment for simulation.', '2024-02-03 09:00:00'),
(10, 6, 'I''ll prepare the testing framework.', '2024-02-03 11:00:00'),
(10, 9, 'We should aim for a demo by next week.', '2024-02-04 09:00:00'),
(10, 13, 'Sounds good. I''ll assist with the demo preparation.', '2024-02-05 09:00:00'),
(10, 11, 'Let''s schedule a review meeting after the demo.', '2024-02-06 09:00:00'),
(10, 4, 'I agree. I''ll organize the review meeting and send out invites.', '2024-02-07 09:00:00'),
(10, 13, 'Please make sure the demo is ready for the review.', '2024-02-07 10:00:00'),
(10, 11, 'I''ll finalize the demo setup and prepare the presentation.', '2024-02-07 11:00:00'),
(10, 4, 'Review meeting scheduled for July 12th. Looking forward to it!', '2024-02-08 09:00:00'),
(10, 6, 'Thanks. I''ll ensure everything is ready by then.', '2024-02-08 10:00:00'),
(10, 9, 'See you at the review meeting. Let''s make sure the demo goes smoothly.', '2024-02-08 11:00:00'),

-- Dragon Ball Tournament Organizer (chat_room_id: 11) - Project Completed
-- Chat history from the project completion
(11, 4, 'The Dragon Ball Tournament Organizer project is complete. Great work, team!', '2024-08-01 15:00:00'),
(11, 2, 'Thanks! It was an exciting project to work on.', '2024-08-01 15:15:00'),
(11, 6, 'Agreed. The final product looks amazing.', '2024-08-01 15:30:00'),
(11, 4, 'Let''s prepare the final project report and summary.', '2024-08-02 09:00:00'),
(11, 14, 'I''ll handle the report and final documentation.', '2024-08-02 10:00:00'),
(11, 13, 'I''ll assist with the review and finalize the documentation.', '2024-08-02 11:00:00'),
(11, 4, 'Thanks, everyone. I''ll set up a wrap-up meeting next week.', '2024-08-03 09:00:00'),
(11, 6, 'Sounds good. I''ll prepare the presentation for the meeting.', '2024-08-03 10:00:00'),
(11, 2, 'Looking forward to the final review.', '2024-08-04 09:00:00'),
(11, 14, 'I''ll ensure everything is ready for the meeting.', '2024-08-04 10:00:00'),
(11, 4, 'Meeting scheduled for August 10th. Great job, everyone.', '2024-08-04 10:00:00'),


-- Saiyan Training Log (chat_room_id: 12)
(12, 4, 'Welcome to the Saiyan Training Log project. Let''s define the training features and goals.', '2024-08-01 09:00:00'),
(12, 14, 'I''ll handle the training log management system.', '2024-08-01 10:00:00'),
(12, 8, 'We need to set up user progress tracking and training statistics.', '2024-08-02 08:30:00'),
(12, 13, 'I''ll work on the user progress tracking features.', '2024-08-02 11:00:00'),
(12, 14, 'Let''s finalize the database schema for storing training data.', '2024-08-03 09:00:00'),
(12, 8, 'I''ll prepare the initial UI designs for the training log.', '2024-08-03 11:30:00'),
(12, 13, 'Great. I''ll start on integrating the training data system.', '2024-08-04 09:00:00'),
(12, 4, 'We should set up a testing environment by next week.', '2024-08-05 09:00:00'),
(12, 8, 'I''ll assist with setting up the test environment.', '2024-08-06 09:00:00'),
(12, 4, 'Thanks. I''ll arrange a review meeting next week.', '2024-08-07 08:00:00'),

-- Thunder Breathing Training Hub (chat_room_id: 13)
(13, 10, 'Starting the Thunder Breathing Training Hub project. Let''s outline the training features and objectives.', '2024-08-01 09:00:00'),
(13, 12, 'I''ll handle the training modules and breathing techniques.', '2024-08-01 10:00:00'),
(13, 10, 'Let''s also prepare a system for user feedback and progress reports. And work on recruiting more members', '2024-08-02 09:00:00'),


-- Conversation for 'Saiyan Battle Simulator'
(14, 4, 'Hey team, we need to start planning our work for the Saiyan Battle Simulator. Let''s discuss our goals and set up our tasks.', '2024-07-26 09:00:00'), -- Goku
(14, 6, 'I think the first step should be to sketch out the UI design. We need to decide on the layout for battle strategies and training logs.', '2024-07-26 09:15:00'), -- Jotaro
(14, 13, 'I can start working on the UI mockups based on our initial ideas. We need to make sure it aligns with the project vision.', '2024-07-26 09:30:00'), -- Megumi
(14, 9, 'I''ll handle the backend setup and database schema. We should prepare for various battle scenarios and track user progress.', '2024-07-26 09:45:00'), -- Mikasa
(14, 4, 'Great. Mikasa, ensure the backend can support our planned features and user data.', '2024-07-26 10:00:00'), -- Goku
(14, 6, 'I''ll work on the initial design for the main dashboard and battle interface. I''ll need everyone''s input before finalizing it.', '2024-07-26 10:15:00'), -- Jotaro
(14, 13, 'I''ll review the mockups and give feedback. We should also discuss user roles and permissions soon.', '2024-07-26 10:30:00'), -- Megumi
(14, 9, 'I''ll start setting up user roles in the backend. We''ll need different roles for users, admins, and so on.', '2024-07-26 10:45:00'), -- Mikasa
(14, 4, 'Sounds good. Let''s plan a quick meeting for tomorrow to review what we have and decide on our next steps.', '2024-07-26 11:00:00'), -- Goku
(14, 6, 'I''ll aim to have some initial mockups ready by then for everyone to look at.', '2024-07-26 11:15:00'), -- Jotaro
(14, 13, 'I''ll prepare some initial scenarios and use cases to test the UI concepts.', '2024-07-26 11:30:00'), -- Megumi
(14, 9, 'I''ll ensure that the backend is ready for integration with the frontend as soon as we have the initial designs.', '2024-07-26 11:45:00'), -- Mikasa
(14, 4, 'Perfect. Please document your progress and any issues you encounter. We''ll review everything in tomorrow''s meeting.', '2024-07-26 12:00:00'), -- Goku
(14, 6, 'Will do. I''ll keep everyone updated with my progress on the UI design.', '2024-07-26 12:15:00'), -- Jotaro
(14, 13, 'I''ll gather feedback and prepare questions for our discussion tomorrow.', '2024-07-26 12:30:00'), -- Megumi
(14, 9, 'Hey team, I''ve completed the backend setup and tested the initial endpoints. Everything is working as expected so far, but we need to start integrating with the frontend soon.', '2024-08-02 09:00:00'), -- Mikasa
(14, 4, 'Thanks for the update, Mikasa. Once the frontend integration starts, let''s ensure we have a solid testing plan in place.', '2024-08-02 09:15:00'), -- Goku
(14, 6, 'I''m almost done with the revised UI designs. I''ll be ready to share them with everyone for feedback by tomorrow.', '2024-08-02 09:30:00'), -- Jotaro
(14, 13, 'Great to hear. I''m also finalizing the user scenarios and test cases. I''ll have them ready for review by the end of the day.', '2024-08-02 09:45:00'), -- Megumi
(14, 4, 'Perfect. Let''s aim to have a detailed review session in a few weeks to align on our progress and address any issues.', '2024-08-02 10:00:00'); -- Goku