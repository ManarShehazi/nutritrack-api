# 🥗 NutriTrack API

NutriTrack is a RESTful API designed to manage user dietary needs — including meals, ingredients, food logging, and shopping list generation.

> Developed as part of the *Cloud Computing & DevOps* course  
> 📍 Université Grenoble Alpes – Master M2 MOSIG  
> 👩‍💻 Team Project: Haleema Khan, Manar Shehazi, Olesia Schukina

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [System Requirements](#system-requirements)
- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Meals](#meals)
  - [Ingredients](#ingredients)
  - [Food Logs](#food-logs)
  - [Shopping Lists](#shopping-lists)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)
- [Contact Information](#contact-information)

---

## 📌 Introduction

NutriTrack is a backend API that enables:

- Management of personal user profiles
- Logging of daily meals and ingredients
- Meal planning and grocery list generation
- Tracking of nutritional goals (BMI, calories, etc.)

Built with **Node.js**, **Express**, and **MySQL**, the API adheres to **OpenAPI 3.0** standards and includes unit testing, CI/CD automation, and code quality reports.

---

## 🖥️ System Requirements

- **Node.js** v16.0+
- **NPM** v7.0+
- **MySQL** v8.0+
- **Java JDK 21** (for SonarQube)
- **Docker** (optional, for containerization)

---

## ⚙️ Project Setup

### 1. Clone the repository

```bash
git clone https://gricad-gitlab.univ-grenoble-alpes.fr/ngs/team_06/project.git
cd project/src

