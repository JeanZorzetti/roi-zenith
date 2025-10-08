-- Migration: Add Pipelines System
-- This migration adds Pipeline and PipelineStage tables and updates the Deal table

-- Create pipelines table
CREATE TABLE IF NOT EXISTS `pipelines` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `color` VARCHAR(191) NOT NULL DEFAULT '#3b82f6',
  `is_default` BOOLEAN NOT NULL DEFAULT false,
  `position` INTEGER NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create pipeline_stages table
CREATE TABLE IF NOT EXISTS `pipeline_stages` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `color` VARCHAR(191) NOT NULL DEFAULT '#6366f1',
  `position` INTEGER NOT NULL DEFAULT 0,
  `pipeline_id` VARCHAR(191) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `pipeline_stages_pipeline_id_idx` (`pipeline_id`),
  CONSTRAINT `pipeline_stages_pipeline_id_fkey`
    FOREIGN KEY (`pipeline_id`) REFERENCES `pipelines`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add new columns to deals table (but don't make them required yet)
ALTER TABLE `deals`
  ADD COLUMN `pipeline_id` VARCHAR(191) NULL,
  ADD COLUMN `stage_id` VARCHAR(191) NULL;

-- Create a default pipeline
INSERT INTO `pipelines` (`id`, `title`, `description`, `color`, `is_default`, `position`, `created_at`, `updated_at`)
VALUES (
  'pipeline-default',
  'Pipeline Padrão',
  'Pipeline de vendas principal',
  '#3b82f6',
  true,
  0,
  NOW(3),
  NOW(3)
);

-- Create default stages matching the old enum values
INSERT INTO `pipeline_stages` (`id`, `title`, `color`, `position`, `pipeline_id`, `created_at`, `updated_at`) VALUES
  ('stage-new', 'Novo Lead', '#6366f1', 0, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-contacted', 'Contato Realizado', '#8b5cf6', 1, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-qualified', 'Qualificado', '#ec4899', 2, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-proposal', 'Proposta Enviada', '#f59e0b', 3, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-negotiation', 'Em Negociação', '#eab308', 4, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-closed-won', 'Ganho', '#10b981', 5, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-closed-lost', 'Perdido', '#ef4444', 6, 'pipeline-default', NOW(3), NOW(3)),
  ('stage-on-hold', 'Em Espera', '#6b7280', 7, 'pipeline-default', NOW(3), NOW(3));

-- Migrate existing deals to the default pipeline and map old stages to new stages
UPDATE `deals` SET
  `pipeline_id` = 'pipeline-default',
  `stage_id` = CASE
    WHEN `stage` = 'NEW' THEN 'stage-new'
    WHEN `stage` = 'CONTACTED' THEN 'stage-contacted'
    WHEN `stage` = 'QUALIFIED' THEN 'stage-qualified'
    WHEN `stage` = 'PROPOSAL_SENT' THEN 'stage-proposal'
    WHEN `stage` = 'NEGOTIATION' THEN 'stage-negotiation'
    WHEN `stage` = 'CLOSED_WON' THEN 'stage-closed-won'
    WHEN `stage` = 'CLOSED_LOST' THEN 'stage-closed-lost'
    WHEN `stage` = 'ON_HOLD' THEN 'stage-on-hold'
    ELSE 'stage-new'
  END
WHERE `pipeline_id` IS NULL;

-- Now make the columns required and add foreign keys
ALTER TABLE `deals`
  MODIFY COLUMN `pipeline_id` VARCHAR(191) NOT NULL,
  MODIFY COLUMN `stage_id` VARCHAR(191) NOT NULL,
  ADD INDEX `deals_pipeline_id_idx` (`pipeline_id`),
  ADD INDEX `deals_stage_id_idx` (`stage_id`),
  ADD CONSTRAINT `deals_pipeline_id_fkey`
    FOREIGN KEY (`pipeline_id`) REFERENCES `pipelines`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `deals_stage_id_fkey`
    FOREIGN KEY (`stage_id`) REFERENCES `pipeline_stages`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Finally, drop the old stage enum column (optional - only if you want to clean up)
-- ALTER TABLE `deals` DROP COLUMN `stage`;

-- Note: The old `stage` column is left in place for backward compatibility
-- You can manually drop it after confirming everything works in production
