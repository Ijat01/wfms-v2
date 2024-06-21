-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(14) NULL,
    `package_id` VARCHAR(255) NULL,
    `groom_name` VARCHAR(255) NULL,
    `bride_name` VARCHAR(255) NULL,
    `event_date` DATE NULL,
    `event_type` VARCHAR(255) NULL,
    `event_address` VARCHAR(255) NULL,
    `contact_no` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `FK`(`package_id`),
    INDEX `USERBOOKING_FK`(`user_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package-packageitems` (
    `pack_id` INTEGER NOT NULL,
    `package_id` VARCHAR(11) NULL,
    `packageitems_id` INTEGER NULL,

    INDEX `PACKAGEITEM_FK`(`packageitems_id`),
    INDEX `PACKAGE_FK`(`package_id`),
    PRIMARY KEY (`pack_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packageitems` (
    `packageitem_id` INTEGER NOT NULL,
    `packageitem_name` VARCHAR(255) NULL,
    `packageitem_description` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`packageitem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packages` (
    `package_id` VARCHAR(255) NOT NULL,
    `package_type` VARCHAR(255) NULL,
    `package_name` VARCHAR(255) NULL,
    `package_description` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `payment_id` INTEGER NOT NULL,
    `booking_id` INTEGER NULL,
    `payment_status` VARCHAR(255) NULL,
    `payment_type` VARCHAR(255) NULL,
    `payment_balance` VARCHAR(255) NULL,
    `payment_amount` INTEGER NULL,
    `payment_receipt` VARCHAR(255) NULL,
    `payment_description` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `BOOKING_FK`(`booking_id`),
    PRIMARY KEY (`payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taskassignments` (
    `taskassignment_id` INTEGER NOT NULL,
    `task_id` INTEGER NULL,
    `user_id` VARCHAR(14) NULL,
    `taskassignment_role` VARCHAR(255) NULL,
    `taskassignment_description` VARCHAR(255) NULL,
    `taskassignment_status` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `TASK_FK`(`task_id`),
    INDEX `USERTASK_FK`(`user_id`),
    PRIMARY KEY (`taskassignment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `task_id` INTEGER NOT NULL,
    `booking_id` INTEGER NULL,
    `task_status` VARCHAR(255) NULL,
    `task_type` VARCHAR(255) NULL,
    `created_at` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `BOOKINGT_FK`(`booking_id`),
    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(14) NOT NULL,
    `user_fullname` VARCHAR(255) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `user_role` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `created_by` VARCHAR(14) NULL,

    INDEX `USERUSER_FK`(`created_by`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `FK` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `USERBOOKING_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `package-packageitems` ADD CONSTRAINT `PACKAGEITEM_FK` FOREIGN KEY (`packageitems_id`) REFERENCES `packageitems`(`packageitem_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `package-packageitems` ADD CONSTRAINT `PACKAGE_FK` FOREIGN KEY (`package_id`) REFERENCES `packages`(`package_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `BOOKING_FK` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`booking_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `taskassignments` ADD CONSTRAINT `TASK_FK` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `taskassignments` ADD CONSTRAINT `USERTASK_FK` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `BOOKINGT_FK` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`booking_id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `USERUSER_FK` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE SET NULL;
