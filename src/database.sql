
create table User (
    id serial primary key,
    username varchar(20),
    password varchar(20),
);
create table Roles(
    id serial primary key,
    name varchar(30),
);

create table User_Role(
    id serial primary key,
    user_id integer,
    roles_id integer,
    foreign key (user_id) references User(id),
    foreign key (roles_id) references Roles(id),
);