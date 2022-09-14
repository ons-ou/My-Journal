MyJournal
-----

## Introduction

MyJournal is a website that allows you to write and check your journal entries. Kepp track of your moods, goals and other thoughts through the days.

![Screenshot](static/assets/Screenshot1.png)
![Screenshot](static/assets/Screenshot2.png)
![Screenshot](static/assets/Screenshot3.png)

## Tech Stack (Dependencies)

### 1. Backend Dependencies
#### PIP Dependencies

Install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) are libraries to handle the lightweight sqlite database. Since we want you to focus on auth, we handle the heavy lift for you in `./src/database/models.py`. We recommend skimming this code first so you know how to interface with the Drink model.

### 2. Frontend Dependencies
The website's frontend needs **HTML**, **CSS**, and **Javascript**.
This website uses **JQuery**.

## Main Files: Project Structure

  ```sh
  ├── README.md
  ├── app.py *** the main driver of the app. "python app.py" to run after installing dependencies
  ├── config.py *** to set up the database URLs, etc
  ├── requirements.txt *** The dependencies we need to install with "pip3 install -r requirements.txt"
  ├── static
  │   ├── css *** the stylesheet of a template shares the same name
  │   ├── assets
  │   └── js *** the script of a template shares the same name
  ├── auth *** manages the authentification of users
  │   ├── server.py *** the authentification endpoints and Auth0 configuration
  │   ├── token.py *** necessary functions to take the user id and email from a given token
  ├── models *** database models
  └── templates
  ```
  
## Setup Auth0

1. Create a new Auth0 Account
2. Create a new, single page web application
3. Create a .env file and add all Auth0 settings 


