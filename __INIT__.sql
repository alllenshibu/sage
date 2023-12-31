DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS complaint CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS organization_manager CASCADE;
DROP TABLE IF EXISTS organization_employee CASCADE;
DROP TABLE IF EXISTS quiz_question CASCADE;
DROP TABLE IF EXISTS user_quiz_answer CASCADE;
DROP TABLE IF EXISTS counselling_request CASCADE;
DROP TABLE IF EXISTS counselling_session CASCADE;


CREATE TABLE IF NOT EXISTS "user"
(
    id    UUID DEFAULT uuid_generate_v4(),

    email VARCHAR(128) NOT NULL UNIQUE,
    name  VARCHAR(256),

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS role
(
    id   UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(32) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_role
(
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,

    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE IF NOT EXISTS complaint
(
    id          UUID DEFAULT uuid_generate_v4(),
    title       VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    user_id     UUID         NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS organization
(
    id   UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS organization_manager
(
    organization_id UUID NOT NULL,
    user_id         UUID NOT NULL,

    PRIMARY KEY (organization_id, user_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS organization_employee
(
    organization_id UUID NOT NULL,
    user_id         UUID NOT NULL,

    PRIMARY KEY (organization_id, user_id),
    FOREIGN KEY (organization_id) REFERENCES organization (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS quiz_question
(
    id       UUID DEFAULT uuid_generate_v4(),
    title    VARCHAR(256) NOT NULL,
    option_1 VARCHAR(256) NOT NULL,
    option_2 VARCHAR(256) NOT NULL,
    option_3 VARCHAR(256) NOT NULL,
    option_4 VARCHAR(256) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_quiz_answer
(
    user_id          UUID NOT NULL,
    quiz_question_id UUID NOT NULL,
    answer           INT  NOT NULL,

    PRIMARY KEY (user_id, quiz_question_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (quiz_question_id) REFERENCES quiz_question (id)
);

CREATE TABLE IF NOT EXISTS counselling_request
(
    id          UUID DEFAULT uuid_generate_v4(),
    employee_id UUID         NOT NULL,
    subject     VARCHAR(256) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (employee_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS counselling_session
(
    id                     UUID DEFAULT uuid_generate_v4(),
    psychologist_id        UUID         NOT NULL,
    counselling_request_id UUID         NOT NULL,
    chat_room_id           VARCHAR(256) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (psychologist_id) REFERENCES "user" (id),
    FOREIGN KEY (counselling_request_id) REFERENCES counselling_request (id)
);

INSERT INTO role(name)
VALUES ('ROLE_USER'),
       ('ROLE_MANAGER'),
       ('ROLE_EMPLOYEE'),
       ('ROLE_PSYCHOLOGIST');

--- Inserting dummy data ---

INSERT INTO organization(name)
VALUES ('Venture X');

INSERT INTO "user"(email, name)
VALUES ('kallenshibu@gmail.com', 'Allen Shibu'),
       ('abhinavmohanmarikkal@gmail.com', 'Abhinav Manager'),
       ('abhinavmohanan17@gmail.com', 'Abhinav Employee'),
       ('amilpa2020@gmail.com', 'Amil PA'),
       ('abhinavmohanan1732003@gmail.com', 'Abhinav Psycho'),
       ('amilpa2017@gmail.com', 'Amil Psycho'),
       ('anishp8914@gmail.com', 'Anish Pillai'),
       ('allenshibu@outlook.in', 'Allen Psycho'),
    ('psjavad2543@gmail.com', 'Amil Manager');
;


INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'kallenshibu@gmail.com'));
INSERT INTO organization_manager(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'abhinavmohanmarikkal@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'abhinavmohanan17@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'amilpa2020@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'abhinavmohanan1732003@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'amilpa2017@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'));
INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'allenshibu@outlook.in'));

INSERT INTO organization_employee(organization_id, user_id)
VALUES ((SELECT id FROM organization WHERE name = 'Venture X'),
        (SELECT id FROM "user" WHERE email = 'psjavad2543@gmail.com'));




INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'abhinavmohanmarikkal@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_MANAGER'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'abhinavmohanan17@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'abhinavmohanan1732003@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_PSYCHOLOGIST'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'kallenshibu@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'));

INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'amilpa2020@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'amilpa2017@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_PSYCHOLOGIST'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'allenshibu@outlook.in'),
        (SELECT id FROM role WHERE name = 'ROLE_PSYCHOLOGIST'));
INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'psjavad2543@gmail.com'),
        (SELECT id FROM role WHERE name = 'ROLE_MANAGER'));


--- Dummy quiz ---
INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('On a scale of 1 to 10, how often do you feel overwhelmed by your workload?',
        'Not at all', 'Occasionally', 'Quite often', 'Very Frequently');

INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('How well are you sleeping lately?',
        'Very Well', 'Fairly Well', 'Not wo well', 'Not well at all');

INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('How often do you find it difficult to disconnect from work during your personal time?',
        'Rarely', 'Sometimes', 'Often', 'Almost always');


INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('How would you rate your overall mood and emotional well-being recently?',
        'Very Positive', 'Generally positive', 'Neutral', 'Negative');


INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('Are you satisfied with your work-life balance?',
        'Very Satisfied', 'Somewhat satisfied', 'Somewhat unsatisfied', 'Very unsatisfied');
INSERT INTO quiz_question(title, option_1, option_2, option_3, option_4)
VALUES ('How often do you find it challenging to focus and concentrate on your tasks?',
        'Rarely', 'Sometimes', 'Often', 'Almost always');


