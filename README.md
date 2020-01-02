# Jeopardy Angular

In college one of my favourite professors (Jonathan Penava) gave us this assignment to complete for Java Enterprise.  Task was to create a jeopardy web application that displays 5 categories and 5 questions and keeps track of user's name and score across various routes in the web app.  Furthermore, the application would keep track of the user's score, disabled buttons etc with session management and featured a random daily double component.  

I am recreating that application with angular 7+.  :)  Work in progress - more features to be added/bugs to fixed

Features: 
* Questions and categories randomly picked from: https://opentdb.com/api_config.php
* Application maintains a session via sessionStorage (user's name, score, question they have answered are kept in session - refreshing doesn't cause data loss)
* Features music and sound effects
* User has 30 seconds to answer a question before the question modal closes on timeout.



## TODO
* Add animations to make game more attractive
* Fix Daily double functionality
* Fix minor bugs issues (repeat category, score screen unsubscribe crash)

<img src="jeopardyGif3.gif?raw=true" width="600px">
