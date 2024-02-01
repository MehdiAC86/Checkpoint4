create table `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO role (name) values ('ADMIN');


create table `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(55) NOT NULL,
  `lastname` VARCHAR(55) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `id_role` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_role`) REFERENCES role(id)
);
