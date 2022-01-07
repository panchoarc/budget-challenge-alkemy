
CREATE SCHEMA IF NOT EXISTS `budget` DEFAULT CHARACTER SET utf8 ;
USE `budget` ;

-- -----------------------------------------------------
-- Table `budget`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budget`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budget`.`operations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budget`.`operations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `concept` VARCHAR(255) NOT NULL,
  `amount` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_operations_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_operations_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `budget`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
