-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" SERIAL NOT NULL,
    "user_id" VARCHAR(14) NOT NULL,
    "package_id" VARCHAR(255),
    "groom_name" VARCHAR(255) NOT NULL,
    "bride_name" VARCHAR(255) NOT NULL,
    "event_date" DATE NOT NULL,
    "event_address" VARCHAR(255) NOT NULL,
    "contact_no" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "package-packageitems" (
    "pack_id" SERIAL NOT NULL,
    "package_id" VARCHAR(11),
    "packageitems_id" INTEGER,

    CONSTRAINT "package-packageitems_pkey" PRIMARY KEY ("pack_id")
);

-- CreateTable
CREATE TABLE "packageitems" (
    "packageitem_id" SERIAL NOT NULL,
    "packageitem_name" VARCHAR(255),
    "packageitem_description" VARCHAR(255),
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "packageitems_pkey" PRIMARY KEY ("packageitem_id")
);

-- CreateTable
CREATE TABLE "packages" (
    "package_id" VARCHAR(255) NOT NULL,
    "package_type" VARCHAR(255) NOT NULL,
    "package_name" VARCHAR(255) NOT NULL,
    "package_description" VARCHAR(255),
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "packages_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "payment_status" VARCHAR(255),
    "payment_type" VARCHAR(255),
    "payment_balance" VARCHAR(255),
    "payment_amount" INTEGER,
    "payment_receipt" VARCHAR(255),
    "payment_description" VARCHAR(255),
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "taskassignments" (
    "taskassignment_id" SERIAL NOT NULL,
    "task_id" INTEGER,
    "user_id" VARCHAR(14),
    "taskassignment_role" VARCHAR(255),
    "taskassignment_description" VARCHAR(255),
    "taskassignment_status" VARCHAR(255),
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "taskassignments_pkey" PRIMARY KEY ("taskassignment_id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "booking_id" INTEGER,
    "task_status" VARCHAR(255),
    "task_type" VARCHAR(255),
    "created_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(14) NOT NULL,
    "user_fullname" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by" VARCHAR(14),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "FK" ON "bookings"("package_id");

-- CreateIndex
CREATE INDEX "USERBOOKING_FK" ON "bookings"("user_id");

-- CreateIndex
CREATE INDEX "PACKAGEITEM_FK" ON "package-packageitems"("packageitems_id");

-- CreateIndex
CREATE INDEX "PACKAGE_FK" ON "package-packageitems"("package_id");

-- CreateIndex
CREATE INDEX "BOOKING_FK" ON "payments"("booking_id");

-- CreateIndex
CREATE INDEX "TASK_FK" ON "taskassignments"("task_id");

-- CreateIndex
CREATE INDEX "USERTASK_FK" ON "taskassignments"("user_id");

-- CreateIndex
CREATE INDEX "BOOKINGT_FK" ON "tasks"("booking_id");

-- CreateIndex
CREATE INDEX "USERUSER_FK" ON "users"("created_by");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "package-packageitems" ADD CONSTRAINT "package-packageitems_packageitems_id_fkey" FOREIGN KEY ("packageitems_id") REFERENCES "packageitems"("packageitem_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "package-packageitems" ADD CONSTRAINT "package-packageitems_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("package_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "taskassignments" ADD CONSTRAINT "taskassignments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "taskassignments" ADD CONSTRAINT "taskassignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE SET NULL;
