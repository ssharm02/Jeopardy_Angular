# Jeopardy Angular

In college one of my favourite professors (Jonathan Penava) gave us this assignment to complete for Java Enterprise.  Task was to create a jeopardy web application that displays 5 categories and 5 questions and keeps track of user's name and score across various routes in the web app.  Furthermore, the application would keep track of the user's score, disabled buttons etc with session management and featured a random daily double component.  

I am recreating that application with angular 7+.  :)  Work in progress - more features to be added/bugs to fixed

Features: 
* Questions and categories randomly picked from: https://opentdb.com/api_config.php
* Buttons are disabled after the user clicks on them


## TODO
* Implement state management and persistance for username, user score, disabled buttons, categories and questions displayed
* Clean up code --- follow clean code practices
* Implement mongoDB or firebase to save user names and high scores 
* Make scoring page more attractive
* Add daily double

<img src="jeopardyGif.gif?raw=true" width="600px">
<img src="jeopardy1.PNG?raw=true" width="600px">
<img src="jeopardy2.PNG?raw=true" width="500px">
