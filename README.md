# Admin Portal



<p align="center">
  <img width="199" height="162" src="./assets/logo.png">
</p>



## Table of Contents

- [AdminPortal](#AdminPortal)
  - [Table of Contents](#table-of-contents)
  - [Important Links](#important-links)
  - [About](#about)
  - [Screenshots](#screenshots)
  - [Installation Prerequisites](#installation-prerequisites)
  - [How to use this for your own society](#how-to-use-for-own-society)
  - [Technology Stack](#technology-stack)
  - [Contributors](#contributors)

## Important Links

[Website Link](https://dbms-project-admin-portal.herokuapp.com/)  

[Windows Installer](https://drive.google.com/file/d/11iNJe0W_Gzqcv5yx8HFjk3kuq04pEcl8/view?usp=sharing)

[Windows Zip Folder](https://drive.google.com/file/d/1x9LI589TEnHGdghd3RXGRVj7DB9a3kHC/view?usp=sharing)

[Linux Zip Folder](https://drive.google.com/file/d/1-Aht0stuyN6mMZr5OO-ZwIEyyJG6A7Yq/view?usp=sharing)

## About

The purpose of this project is to make management of data easy for a a society/club that organizes a lot of events, workshops and competitions for students and professionals. It can be used by the club to manage the details of their events, workshops, competitions, lectures and sponsors in a fast and efficient manner. We have created a user-friendly interface using which one can add new data to the database, remove data from the database and fetch data from the database


## Screenshots

![Login](./assets/2.png)


![Dashboard](./assets/3.png)


![Lectures page](./assets/1.png)

![Data addition Page](./assets/4.png)

## Installation Prerequisites

- Nodejs

> To Download Nodejs Package [Go to the Nodejs Download Website](https://nodejs.org/en/download/).

- Mongodb

> To install Mongodb [Go to this Website](https://docs.mongodb.com/manual/administration/install-community/)

## How to Run this for your own society

For Website
1. Clone this Repo to your Local Machine.
2. Host the backend folder on you host service provider like heroku , aws etc.
3. Copy the website link.
4. Paste the url in ```environment.prod.ts``` file in ```src/environments```. 
5. Open cmd/Terminal and type ```npm i``` then ```ng build --prod```.
6. Type ```cd backend```
7. Type ```npm i```
8. Go to mongodb atlas [website](https://www.mongodb.com/cloud/atlas) and create your own clusetr
9. Copy the mongodb cluster link.
10. Paste it in the config.json file in backend folder.
11. Now Just deploy the backend folder and you can use it.



For Desktop application
1. Go To ```Desktop Version``` folder.
2. Open CMD/terminal in Desktop Version folder and type ```npm i```.
3. Paste your website url in 9th line in main.js.
4. Type ```electron-packager . dekstopapplication --all --asar --icon=admin-logo.ico``` in cmd it will create different folders for different folders.

Optional - For making windows installer 
1. Follow above steps.
2. Type ```npm run dist```.


## Technology Stack

_The following technologies has been used to make this application -_

Main Tech stack used for the project
- _NodeJs_
- _angular_
- _Express_
- _MongoDB_

Database used
- _MongoDB Atlas_

Major libraries used
- _express js_
- _moongoose_
- _jsonwebtoken_
- _cloudinary_
- _electron js_
- _electron-builder_



## Contributors

[Nitish Kumar](https://github.com/Nitish9711)

[Naveen Kumar](https://github.com/NaveenKumar519)



