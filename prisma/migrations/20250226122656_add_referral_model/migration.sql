-- CreateTable
CREATE TABLE `Referral` (
    `_id` VARCHAR(191) NOT NULL,
    `referrer` VARCHAR(191) NOT NULL,
    `referee` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Referral_email_key`(`email`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
