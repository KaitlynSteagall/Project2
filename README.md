## PuffinPower | grumpy-puffin-4289.herokuapp.com

Group project: Create a website database of puffins that has 3 levels of access: public, researcher, and admin. Public can submit photos of puffins they see, researchers can view and approve public submitted photos, as well as add puffins and notes to the database. Admins can add or delete users. When checking out our site, use username: rpetit and password: test2. Search for puffin #1.
MySQL, Sequelize, Handlebars.js, Node.js, Express.js, JavaScript/jQuery, Bootstrap



# PuffinPower

## What Is This Thing?
PuffinPower is a database and communication app. It offers researchers tools to easily store, sort, and retrieve information on their subjects, and facilitates easy crowd-sourcing of further data by letting members of the public submit their own observations and images.

## Why is it Special?

## How Do I Use It?

## Who Made It?
Kaitlyn Steagall, Mars Getsoian, Renee Petit

## Features:
  1. User login
  2. Searchable photo & data of all puffins
  3. Easy-view profile of each puffin's data & photos
  4. Controllable levels access
  5. Photo submission from phone or camera
 
## Tasks/Issues:
  ## User login
     -Bootstrap form to login
     -Set up database table with username, password & level of access
     -Session management (how do you know if a user is logged in? And where are they routed? -- passport library? json web token (look it up))
     -Securely store passwords
     
  ## Searchable photo & data of all puffins
      -Set up database of puffin data & photos
      -Bootstrap/HTML - search form
      -Route for searching database based on search entry & for sending matching results back to user
      
  ## Easy-view profile of each puffin
      -Bootstrap/HTML/jQuery for viewing information of each puffin
 
  ## Controllable access
      -HTML/Bootstrap page for Admin tasks
      -Routes for admin to add users and their privilege levels
      -HTML/Bootstrap page for public submission review
      -Routes for adding approved public submissions to database
      
  ## Photo submission from phone or camera
      -HTML/Bootstrap page for public submissions
      -Routes & location for storing public submissions until they are reviewed
      -Middleware for phone/camera connection to upload photos/videos
