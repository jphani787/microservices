CREATE DATABASE microservices_auths;
CREATE DATABASE microservices_users;
CREATE DATABASE microservices_notes;
CREATE DATABASE microservices_tags;

GRANT ALL PRIVILEGES ON DATABASE microservices_auths TO microuser;
GRANT ALL PRIVILEGES ON DATABASE microservices_users TO microuser;
GRANT ALL PRIVILEGES ON DATABASE microservices_notes TO microuser;
GRANT ALL PRIVILEGES ON DATABASE microservices_tags TO microuser;