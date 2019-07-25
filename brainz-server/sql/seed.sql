INSERT INTO users
    (f_name, l_name, email, password)
VALUES
    ('Anonymous Zombie', 'Rob', 'zombie@horde', '1');

INSERT INTO game_modes
    (difficulty)
VALUES
    ('easy'),
    ('medium'),
    ('hard');

INSERT INTO scores
    (wave, kills, user_id, game_mode_id)
VALUES
    (5, 69, 1, 1);