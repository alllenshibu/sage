DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS complaint CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS organization_manager CASCADE;
DROP TABLE IF EXISTS organization_employee CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    id    UUID DEFAULT uuid_generate_v4(),

    email VARCHAR(128) NOT NULL,
    name  VARCHAR(256) NOT NULL,

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

INSERT INTO role(name)
VALUES ('ROLE_USER'),
       ('ROLE_MANAGER'),
       ('ROLE_EMPLOYEE');

INSERT INTO organization(name) VALUES ('Venture X');

INSERT INTO "user"(email, name)
VALUES ('anishp8914@gmail.com', 'Anish Pillai'),
       ('kallenshibu@gmail.com', 'Allen Shibu');

INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'), (SELECT id FROM role WHERE name = 'ROLE_USER')),
       ((SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'), (SELECT id FROM role WHERE name = 'ROLE_MANAGER'));

INSERT INTO organization_employee(organization_id, user_id)
    VALUES ((SELECT id FROM organization WHERE name = 'Venture X'), (SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'));
INSERT INTO organization_manager(organization_id, user_id)
    VALUES ((SELECT id FROM organization WHERE name = 'Venture X'), (SELECT id FROM "user" WHERE email = 'anishp8914@gmail.com'));


INSERT INTO user_role(user_id, role_id)
VALUES ((SELECT id FROM "user" WHERE email = 'kallenshibu@gmail.com'), (SELECT id FROM role WHERE name = 'ROLE_USER')),
       ((SELECT id FROM "user" WHERE email = 'kallenshibu@gmail.com'), (SELECT id FROM role WHERE name = 'ROLE_EMPLOYEE'));

INSERT INTO organization_employee(organization_id, user_id)
    VALUES ((SELECT id FROM organization WHERE name = 'Venture X'), (SELECT id FROM "user" WHERE email = 'kallenshibu@gmail.com'));
