-- Baseline schema for a fresh database.
--
-- This is a dump of the fully-migrated schema, not a historical starting point.
-- The previous schema.sql was a partial snapshot: it already contained columns
-- that early migrations also add (Course."categoryId"), so migration 1 failed on
-- a clean database, every later migration was skipped, and the build then died
-- on a column those later migrations create (Course."shortDesc").
--
-- Regenerate after adding migrations:
--   1. bring a database fully up to date:  pnpm --filter @nextminds/db migrate
--   2. dump it schema-only, no owner, no privileges, no comments,
--      excluding "SequelizeMeta"
--   3. strip pg_dump's psql-only meta-commands - \restrict and \unrestrict are
--      emitted by pg_dump 16.14+ and are not valid SQL over a driver connection
--
-- `sync` applies this file and then records every existing migration as applied,
-- so `migrate` immediately afterwards reports nothing pending.
--
-- PostgreSQL database dump
--


-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EmailJobStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."EmailJobStatus" AS ENUM (
    'PENDING',
    'SENT',
    'FAILED'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'STUDENT',
    'INSTRUCTOR',
    'EDITOR'
);


--
-- Name: SubmissionStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SubmissionStatus" AS ENUM (
    'PENDING',
    'CONTACTED',
    'CONFIRMED',
    'CANCELLED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "accessTokenExpiresAt" timestamp(3) without time zone,
    "refreshTokenExpiresAt" timestamp(3) without time zone,
    scope text,
    "idToken" text,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Assignment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Assignment" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "batchId" text NOT NULL,
    title text NOT NULL,
    "briefMd" text DEFAULT ''::text NOT NULL,
    "attachmentKey" text,
    "attachmentName" text,
    "dueAt" timestamp with time zone,
    "maxScore" integer DEFAULT 100 NOT NULL,
    published boolean DEFAULT true NOT NULL,
    "createdById" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Batch; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Batch" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "courseId" text NOT NULL,
    "instructorId" text,
    name text NOT NULL,
    code text NOT NULL,
    "startDate" date,
    "endDate" date,
    schedule text,
    mode text DEFAULT 'Physical'::text NOT NULL,
    capacity integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'UPCOMING'::text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: BatchStudent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BatchStudent" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "batchId" text NOT NULL,
    "userId" text NOT NULL,
    status text DEFAULT 'ACTIVE'::text NOT NULL,
    "enrolledAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ContactSubmission" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    "courseInterest" text,
    message text NOT NULL,
    status public."SubmissionStatus" DEFAULT 'PENDING'::public."SubmissionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Course; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Course" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "contentMd" text NOT NULL,
    tools text[],
    duration text NOT NULL,
    level text NOT NULL,
    price integer DEFAULT 0 NOT NULL,
    "imageUrl" text,
    published boolean DEFAULT true NOT NULL,
    "createdById" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "categoryId" text NOT NULL,
    "shortDesc" text,
    "whoIsItFor" text[] DEFAULT ARRAY[]::text[] NOT NULL,
    skills text[] DEFAULT ARRAY[]::text[] NOT NULL,
    curriculum jsonb DEFAULT '[]'::jsonb NOT NULL,
    faqs jsonb DEFAULT '[]'::jsonb NOT NULL,
    badge text,
    color text,
    students integer DEFAULT 0 NOT NULL,
    "mentorId" text,
    "metaTitle" character varying(200),
    "metaDescription" text,
    "ogTitle" character varying(200),
    "ogDescription" text,
    "ogImageAlt" character varying(300),
    "focusKeyword" character varying(160),
    h1 character varying(200),
    "h1Accent" character varying(200),
    "nextBatch" character varying(80),
    "syllabusUrl" character varying(500)
);


--
-- Name: EmailJob; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EmailJob" (
    id text NOT NULL,
    subject text NOT NULL,
    html text NOT NULL,
    "replyTo" text,
    status public."EmailJobStatus" DEFAULT 'PENDING'::public."EmailJobStatus" NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    "lastError" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "sentAt" timestamp(3) without time zone
);


--
-- Name: Enrollment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Enrollment" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text,
    "courseId" text NOT NULL,
    "educationLevel" text,
    "learningFormat" text NOT NULL,
    "hasLaptop" text NOT NULL,
    "userId" text,
    status public."SubmissionStatus" DEFAULT 'PENDING'::public."SubmissionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: EnterpriseInquiry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EnterpriseInquiry" (
    id text NOT NULL,
    name text NOT NULL,
    "orgName" text NOT NULL,
    email text NOT NULL,
    phone text,
    "orgType" text,
    "teamSize" text,
    "trainingInterests" text,
    status public."SubmissionStatus" DEFAULT 'PENDING'::public."SubmissionStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Expense; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Expense" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    title text NOT NULL,
    category text DEFAULT 'Other'::text NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    vendor text,
    "spentAt" date NOT NULL,
    note text,
    "receiptKey" text,
    "receiptName" text,
    "createdById" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Invoice" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "invoiceNo" text NOT NULL,
    "userId" text NOT NULL,
    "batchId" text,
    description text NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    total integer DEFAULT 0 NOT NULL,
    "paidAmount" integer DEFAULT 0 NOT NULL,
    status text DEFAULT 'UNPAID'::text NOT NULL,
    method text,
    "issuedAt" date,
    "dueAt" date,
    "paidAt" date,
    note text,
    "createdById" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Lesson" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "batchId" text NOT NULL,
    title text NOT NULL,
    description text,
    "orderIndex" integer DEFAULT 0 NOT NULL,
    "videoKey" text,
    "videoMime" text,
    "videoSizeBytes" bigint,
    "durationSeconds" integer,
    published boolean DEFAULT false NOT NULL,
    "createdById" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: LessonProgress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LessonProgress" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "lessonId" text NOT NULL,
    "userId" text NOT NULL,
    "completedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: Material; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Material" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "batchId" text NOT NULL,
    "lessonId" text,
    title text NOT NULL,
    "storageKey" text NOT NULL,
    "fileName" text NOT NULL,
    "mimeType" text,
    "sizeBytes" bigint,
    downloadable boolean DEFAULT true NOT NULL,
    "createdById" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Mentor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Mentor" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    bio text NOT NULL,
    photo text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Message" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "batchId" text NOT NULL,
    "authorId" text NOT NULL,
    body text NOT NULL,
    "parentId" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Policy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Policy" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    name text NOT NULL,
    label text NOT NULL,
    description text,
    permissions jsonb DEFAULT '{}'::jsonb NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Post" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text,
    "contentMd" text DEFAULT ''::text NOT NULL,
    category text,
    emoji text,
    "coverKey" text,
    "readTime" text,
    "authorName" text,
    "authorId" text,
    featured boolean DEFAULT false NOT NULL,
    published boolean DEFAULT false NOT NULL,
    "publishedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "metaTitle" text,
    "metaDescription" text,
    "focusKeyword" text,
    "canonicalUrl" text
);


--
-- Name: RolePolicy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."RolePolicy" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    role text NOT NULL,
    "policyId" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "impersonatedBy" text
);


--
-- Name: SiteSetting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteSetting" (
    id text DEFAULT 'default'::text NOT NULL,
    "customScript" text,
    "customCss" text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Submission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Submission" (
    id text DEFAULT (gen_random_uuid())::text NOT NULL,
    "assignmentId" text NOT NULL,
    "userId" text NOT NULL,
    "storageKey" text,
    "fileName" text,
    note text,
    "submittedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    score integer,
    feedback text,
    "gradedById" text,
    "gradedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    image text,
    role public."Role" DEFAULT 'STUDENT'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "mustChangePassword" boolean DEFAULT false NOT NULL,
    banned boolean DEFAULT false,
    "banReason" text,
    "banExpires" timestamp with time zone,
    "secondaryEmail" character varying(255),
    "secondaryEmailVerified" boolean DEFAULT false NOT NULL,
    "secondaryEmailToken" character varying(255),
    "secondaryEmailTokenExpires" timestamp with time zone
);


--
-- Name: Verification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Verification" (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Assignment Assignment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY (id);


--
-- Name: BatchStudent BatchStudent_batchId_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BatchStudent"
    ADD CONSTRAINT "BatchStudent_batchId_userId_key" UNIQUE ("batchId", "userId");


--
-- Name: BatchStudent BatchStudent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BatchStudent"
    ADD CONSTRAINT "BatchStudent_pkey" PRIMARY KEY (id);


--
-- Name: Batch Batch_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Batch"
    ADD CONSTRAINT "Batch_code_key" UNIQUE (code);


--
-- Name: Batch Batch_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Batch"
    ADD CONSTRAINT "Batch_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_name_key" UNIQUE (name);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_slug_key" UNIQUE (slug);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: EmailJob EmailJob_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmailJob"
    ADD CONSTRAINT "EmailJob_pkey" PRIMARY KEY (id);


--
-- Name: Enrollment Enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY (id);


--
-- Name: EnterpriseInquiry EnterpriseInquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EnterpriseInquiry"
    ADD CONSTRAINT "EnterpriseInquiry_pkey" PRIMARY KEY (id);


--
-- Name: Expense Expense_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_invoiceNo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_invoiceNo_key" UNIQUE ("invoiceNo");


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: LessonProgress LessonProgress_lessonId_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LessonProgress"
    ADD CONSTRAINT "LessonProgress_lessonId_userId_key" UNIQUE ("lessonId", "userId");


--
-- Name: LessonProgress LessonProgress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LessonProgress"
    ADD CONSTRAINT "LessonProgress_pkey" PRIMARY KEY (id);


--
-- Name: Lesson Lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lesson"
    ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY (id);


--
-- Name: Material Material_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT "Material_pkey" PRIMARY KEY (id);


--
-- Name: Mentor Mentor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mentor"
    ADD CONSTRAINT "Mentor_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Policy Policy_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Policy"
    ADD CONSTRAINT "Policy_name_key" UNIQUE (name);


--
-- Name: Policy Policy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Policy"
    ADD CONSTRAINT "Policy_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_slug_key" UNIQUE (slug);


--
-- Name: RolePolicy RolePolicy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePolicy"
    ADD CONSTRAINT "RolePolicy_pkey" PRIMARY KEY (id);


--
-- Name: RolePolicy RolePolicy_role_policyId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePolicy"
    ADD CONSTRAINT "RolePolicy_role_policyId_key" UNIQUE (role, "policyId");


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: SiteSetting SiteSetting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteSetting"
    ADD CONSTRAINT "SiteSetting_pkey" PRIMARY KEY (id);


--
-- Name: Submission Submission_assignmentId_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_assignmentId_userId_key" UNIQUE ("assignmentId", "userId");


--
-- Name: Submission Submission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Verification Verification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Verification"
    ADD CONSTRAINT "Verification_pkey" PRIMARY KEY (id);


--
-- Name: Account_providerId_accountId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON public."Account" USING btree ("providerId", "accountId");


--
-- Name: Assignment_batchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Assignment_batchId_idx" ON public."Assignment" USING btree ("batchId");


--
-- Name: BatchStudent_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BatchStudent_userId_idx" ON public."BatchStudent" USING btree ("userId");


--
-- Name: Batch_courseId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Batch_courseId_idx" ON public."Batch" USING btree ("courseId");


--
-- Name: Batch_instructorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Batch_instructorId_idx" ON public."Batch" USING btree ("instructorId");


--
-- Name: Batch_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Batch_status_idx" ON public."Batch" USING btree (status);


--
-- Name: Course_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Course_categoryId_idx" ON public."Course" USING btree ("categoryId");


--
-- Name: Course_published_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Course_published_idx" ON public."Course" USING btree (published);


--
-- Name: Course_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Course_slug_key" ON public."Course" USING btree (slug);


--
-- Name: Expense_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Expense_category_idx" ON public."Expense" USING btree (category);


--
-- Name: Expense_spentAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Expense_spentAt_idx" ON public."Expense" USING btree ("spentAt");


--
-- Name: Invoice_issuedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Invoice_issuedAt_idx" ON public."Invoice" USING btree ("issuedAt");


--
-- Name: Invoice_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Invoice_status_idx" ON public."Invoice" USING btree (status);


--
-- Name: Invoice_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Invoice_userId_idx" ON public."Invoice" USING btree ("userId");


--
-- Name: Lesson_batchId_orderIndex_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Lesson_batchId_orderIndex_idx" ON public."Lesson" USING btree ("batchId", "orderIndex");


--
-- Name: Material_batchId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Material_batchId_idx" ON public."Material" USING btree ("batchId");


--
-- Name: Message_batchId_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Message_batchId_createdAt_idx" ON public."Message" USING btree ("batchId", "createdAt");


--
-- Name: Post_published_publishedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Post_published_publishedAt_idx" ON public."Post" USING btree (published, "publishedAt");


--
-- Name: RolePolicy_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "RolePolicy_role_idx" ON public."RolePolicy" USING btree (role);


--
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- Name: Submission_assignmentId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Submission_assignmentId_idx" ON public."Submission" USING btree ("assignmentId");


--
-- Name: Submission_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Submission_userId_idx" ON public."Submission" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: lesson_progress_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lesson_progress_user_id ON public."LessonProgress" USING btree ("userId");


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Assignment Assignment_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Assignment Assignment_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Assignment"
    ADD CONSTRAINT "Assignment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BatchStudent BatchStudent_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BatchStudent"
    ADD CONSTRAINT "BatchStudent_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BatchStudent BatchStudent_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BatchStudent"
    ADD CONSTRAINT "BatchStudent_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Batch Batch_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Batch"
    ADD CONSTRAINT "Batch_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Batch Batch_instructorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Batch"
    ADD CONSTRAINT "Batch_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Course Course_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course Course_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Course Course_mentorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES public."Mentor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Enrollment Enrollment_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Enrollment Enrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Expense Expense_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LessonProgress LessonProgress_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LessonProgress"
    ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public."Lesson"(id) ON DELETE CASCADE;


--
-- Name: LessonProgress LessonProgress_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LessonProgress"
    ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE;


--
-- Name: Lesson Lesson_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lesson"
    ADD CONSTRAINT "Lesson_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Lesson Lesson_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Lesson"
    ADD CONSTRAINT "Lesson_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Material Material_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT "Material_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Material Material_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT "Material_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Material Material_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT "Material_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public."Lesson"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Message Message_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Message Message_batchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES public."Batch"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Message Message_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Message"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: RolePolicy RolePolicy_policyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."RolePolicy"
    ADD CONSTRAINT "RolePolicy_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES public."Policy"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_assignmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES public."Assignment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submission Submission_gradedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_gradedById_fkey" FOREIGN KEY ("gradedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Submission Submission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Submission"
    ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


