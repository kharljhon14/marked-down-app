create EXTENSION if not EXISTS citext;
create EXTENSION if not EXISTS "uuid-ossp";

create table users (
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	username citext UNIQUE not NULL,
	PASSWORD TEXT,
	created_at TIMESTAMP DEFAULT now(),
	updated_ap TIMESTAMP DEFAULT now()
);

create table notes(
 	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
 	parent_id uuid REFERENCES notes (id),
 	user_id uuid not NULL REFERENCES users (id),
 	title TEXT,
 	content TEXT,
 	is_published BOOLEAN not NULL DEFAULT false,
 	created_at TIMESTAMP DEFAULT now(),
 	updated_at TIMESTAMP DEFAULT now()
);


