INSERT INTO users
    (f_name, l_name, email, password)
VALUES
    ('Anonymous Zombie', 'Rob', 'zombie@horde', '1'),
    ('eli', 'z', 'ez@ez', '1'),
    ('ronito', 'j', 'rj@rj', '1'),
    ('bob', 'b', 'bb@bb', '1'),
    ('elle', 'z', 'ez@aol.com', '$2a$10$HrEd023RQ16JogzPvugUC.CJvHhXMYE7nckp9A0LqcuOwWCpQlZTW'),
    ('a', 'b', 'ab@ab.com', '$2a$10$TbyRTkXam8eTdLTN2.1on.HjbEZeSo6hXrtx08FXWUPp9gxlw7Tia');

INSERT INTO scores
    (wave, kills, user_id, game_mode_id, timestamp)
VALUES
    (5, 16, 1, 1, '08/04/2019, 05:03:49 pm'),
    (3,	2, 4, 2, 2, '06/29/2019, 11:16:25 am'),
    (4,	3, 7, 3, 3, '06/29/2019, 11:17:25 am'),
    (6,	4, 11, 4, 2, '06/29/2019, 11:18:25 am'),
    (7,	5, 16, 4, 2, '06/29/2019, 11:19:25 am'),
    (8,	6, 22, 4, 2, '03/29/2019, 11:20:25 am'),
    (9,	7, 25, 4, 3, '04/29/2019, 11:21:25 am'),
    (10, 8, 33, 2, 3, '05/29/2019, 11:22:25 am'),
    (11, 9, 41, 4, 2, '06/26/2019, 11:23:25 am'),
    (12, 5, 15, 3, 1, '06/27/2019, 11:24:25 am');