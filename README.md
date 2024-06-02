# Quick Link File Sharing App

## Introduction

Welcome to the File Sharing Website project! This web application allows you to easily share files with others using a simple drag-and-drop or browse interface. You can generate shareable links or directly send files via email. This repository contains the source code for the website.

Visit live website: [QuickLink](https://quicklink-dqxj.onrender.com/)

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Express.js, MongoDB, mongoose, multer, nodemailer, SMTP for emails, ejs Template

## How it works

1. This is the home page, you can upload your file here.
   ![Home Page](https://raw.githubusercontent.com/Hitendra18/quick-link/main/screenshots/Home.png)

2. Here you can copy the generated link and share with anyone or you can simply provide emails to share the generated link.
   ![Share](https://raw.githubusercontent.com/Hitendra18/quick-link/main/screenshots/Share.png)

3. This is how the email will look like.
   ![Email](https://raw.githubusercontent.com/Hitendra18/quick-link/main/screenshots/Email.png)

4. This is the download page, clicking on the download button will start the download.
   ![Download](https://raw.githubusercontent.com/Hitendra18/quick-link/main/screenshots/Download.png)

## Features

- Drag-and-drop or browse file upload
- Generate shareable links
- Send files via email
- Easy-to-use interface
- Responsive web design
- Secure file storage using MongoDB
- Built with HTML, CSS, JavaScript (Node.js), and MongoDB

## Try it by yourself

1. Clone this repository
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env`.
4. Create an account on [brevo](https://www.brevo.com/) for SMTP server.
5. Fill in the required environment variables in `.env`:
   - `MONGODB_URI`: Your MongoDB connection URI
   - `MAILER_EMAIL`: Your email address for sending emails
   - `MAILER_PASSWORD`: SMTP service password
   - `APP_BASE_URL`: `http://localhost:3000/`
6. Start the server: `npm run dev`
7. Open a web browser and visit: `http://localhost:3000`.
8. Now you should be able to use it 😊.

Thank you...
