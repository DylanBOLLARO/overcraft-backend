# API Documentation

## Overview

This document provides information about the RESTful API endpoints. The API
focuses on user management, build creation, and step management.

## Base URL

- Base URL: `http://localhost:3001`

## Endpoints

### 1. User Management

#### 1.1 Create User

- **Endpoint:** `/user`
- **Method:** `POST`
- **Description:** Create a new user.
- **Parameters:**
    - `username` (string): User's username.
    - `email` (string): User's email address.
    - `password` (string): User's password.
    - `firstName` (string): User's first name.
    - `lastName` (string): User's last name.

#### 1.2 Find All Users

- **Endpoint:** `/user`
- **Method:** `GET`
- **Description:** Retrieve all users.
- **Parameters:**
    - `role` (string): User role (e.g., "GUEST").

#### 1.3 Find One User

- **Endpoint:** `/user/{id}`
- **Method:** `GET`
- **Description:** Retrieve details of a specific user.
- **Parameters:**
    - `id` (integer): User ID.

#### 1.4 Update User

- **Endpoint:** `/user/{id}`
- **Method:** `PATCH`
- **Description:** Update user information.
- **Parameters:**
    - `username` (string): User's username.
    - `email` (string): User's email address.
    - `role` (string): User's role.
    - `firstName` (string): User's first name.
    - `lastName` (string): User's last name.

#### 1.5 Delete User

- **Endpoint:** `/user/{id}`
- **Method:** `DELETE`
- **Description:** Delete a user.
- **Parameters:**
    - `id` (integer): User ID.

### 2. Build Management

#### 2.1 Create Build

- **Endpoint:** `/build`
- **Method:** `POST`
- **Description:** Create a new build.
- **Parameters:**
    - `title` (string): Build title.
    - `description` (string): Build description.
    - `race` (string): Race associated with the build.
    - `v_race` (string): Virtual race associated with the build.
    - `user_id` (integer): User ID associated with the build.

#### 2.2 Find All Builds

- **Endpoint:** `/build`
- **Method:** `GET`
- **Description:** Retrieve all builds.
- **Parameters:**
    - `race` (string): Build race filter.

#### 2.3 Find One Build

- **Endpoint:** `/build/{id}`
- **Method:** `GET`
- **Description:** Retrieve details of a specific build.
- **Parameters:**
    - `id` (integer): Build ID.

#### 2.4 Update Build

- **Endpoint:** `/build/{id}`
- **Method:** `PATCH`
- **Description:** Update build information.
- **Parameters:**
    - `title` (string): Build title.
    - `description` (string): Build description.
    - `race` (string): Race associated with the build.
    - `v_race` (string): Virtual race associated with the build.
    - `user_id` (integer): User ID associated with the build.

#### 2.5 Delete Build

- **Endpoint:** `/build/{id}`
- **Method:** `DELETE`
- **Description:** Delete a build.
- **Parameters:**
    - `id` (integer): Build ID.

### 3. Step Management

#### 3.1 Create Step

- **Endpoint:** `/step`
- **Method:** `POST`
- **Description:** Create a new step.
- **Parameters:**
    - `description` (string): Step description.
    - `build_id` (integer): Build ID associated with the step.
    - `position` (integer): Step position.
    - `timer` (integer): Step timer.
    - `population` (integer): Step population.

#### 3.2 Find All Steps

- **Endpoint:** `/step`
- **Method:** `GET`
- **Description:** Retrieve all steps.

#### 3.3 Find One Step

- **Endpoint:** `/step/{id}`
- **Method:** `GET`
- **Description:** Retrieve details of a specific step.
- **Parameters:**
    - `id` (integer): Step ID.

#### 3.4 Move Position of Step

- **Endpoint:** `/step/move-position`
- **Method:** `PATCH`
- **Description:** Move the position of a step.
- **Parameters:**
    - `build_id` (integer): Build ID associated with the step.
    - `id` (integer): Step ID.
    - `move` (string): Direction to move the step (`UP`, `DOWN`, etc.).

#### 3.5 Update Step

- **Endpoint:** `/step/{id}`
- **Method:** `PATCH`
- **Description:** Update step information.
- **Parameters:**
    - `description` (string): Step description.
    - `build_id` (integer): Build ID associated with the step.
    - `position` (integer): Step position.
    - `timer` (integer): Step timer.
    - `population` (integer): Step population.

#### 3.6 Delete Step

- **Endpoint:** `/step/{id}`
- **Method:** `DELETE`
- **Description:** Delete a step.
- **Parameters:**
    - `id` (integer): Step ID.

# Prisma Schema Documentation

This repository contains the Prisma schema for a PostgreSQL database used in a
project. The schema defines the structure of tables, their relationships, and
the data types. Below is an overview of the tables and their relationships:

## Tables

### 1. `Build`

- **Columns:**
    - `id` (Int): Primary key, auto-incremented.
    - `title` (String): Title of the build, with a maximum length of 150
      characters.
    - `description` (String): Optional description of the build, limited to
      150 characters.
    - `race` (Race): Represents the primary race associated with the build.
    - `v_race` (Race): Represents a secondary or versatile race associated
      with the build.
    - `user_id` (Int): Foreign key referencing the `id` in the `User` table.
    - `user` (User): Relationship with the `User` table, referencing
      `user_id`.
    - `build_step` (Build_step[]): One-to-many relationship with the
      `Build_step` table.

### 2. `Build_step`

- **Columns:**
    - `id` (Int): Primary key, auto-incremented.
    - `description` (String): Description of the build step, limited to 150
      characters.
    - `population` (Int): Represents the population associated with the build
      step.
    - `timer` (Int): Represents the timer associated with the build step.
    - `position` (Int): Unique position of the build step.
    - `build_id` (Int): Foreign key referencing the `id` in the `Build` table.
    - `build` (Build): Relationship with the `Build` table, referencing
      `build_id`.

### 3. `User`

- **Columns:**
    - `id` (Int): Primary key, auto-incremented.
    - `firstName` (String): First name of the user, with a maximum length of
      255 characters.
    - `lastName` (String): Last name of the user, with a maximum length of 255
      characters.
    - `username` (String): Unique username with a maximum length of 55
      characters.
    - `email` (String): Unique email address with a maximum length of 255
      characters.
    - `password` (String): User's password with a maximum length of 255
      characters.
    - `createdAt` (DateTime): Timestamp indicating the user's creation date.
    - `updatedAt` (DateTime): Timestamp indicating the user's last update
      date.
    - `role` (Role): Enum representing the user's role (GUEST, USER, ADMIN).
    - `build` (Build[]): One-to-many relationship with the `Build` table.

## Enums

### 1. `Role`

- Enum representing the role of a user:
    - `GUEST`: Guest user.
    - `USER`: Regular user.
    - `ADMIN`: Administrator.

### 2. `Race`

- Enum representing different races:
    - `ZERG`: Zerg race.
    - `TERRAN`: Terran race.
    - `PROTOSS`: Protoss race.
