-- Migration: Add SubColumns feature
-- Description: Adds support for expandable columns with sub-columns

-- 1. Add isExpanded field to columns table
ALTER TABLE `columns`
ADD COLUMN `is_expanded` BOOLEAN NOT NULL DEFAULT true AFTER `position`;

-- 2. Create sub_columns table
CREATE TABLE `sub_columns` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `position` INT NOT NULL DEFAULT 0,
  `column_id` VARCHAR(191) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  PRIMARY KEY (`id`),
  INDEX `sub_columns_column_id_idx` (`column_id`),
  CONSTRAINT `sub_columns_column_id_fkey`
    FOREIGN KEY (`column_id`) REFERENCES `columns`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. Add optional sub_column_id to tasks table
ALTER TABLE `tasks`
ADD COLUMN `sub_column_id` VARCHAR(191) NULL AFTER `column_id`,
ADD INDEX `tasks_sub_column_id_idx` (`sub_column_id`),
ADD CONSTRAINT `tasks_sub_column_id_fkey`
  FOREIGN KEY (`sub_column_id`) REFERENCES `sub_columns`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Migration complete
-- Next step: Run `npx prisma generate` to update Prisma Client
