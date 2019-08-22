# Brainz II - Revenge of the Horde

### A Digital Crafts Project Created by Eli Zhang, RJ Salamanca and Pierson Scarborough

**Click Here: [Brainz II - Website](https://quirky-bose-bab949.netlify.com/)**


## Brainz II In Action

![](./videos/cc.gif)

## Description

Brainz II is a sequel to the first game Brainz. The prequel was a fps aim trainer where people could practice their aim by shooting zombies. The sequel is a top-down shooter survival game based on waves. The objective of the game is to compete against other people and try to get the highest score possible!

You start the game with 3 lives and every time you get hit by a zombie your lives decrease by one. As the waves progress, the more zombies there are and you have to use your quick reflexes to avoid the zombies while killing them to survive onto the next wave!

## Walkthrough

* Landing page prompts user to star or read the directions which show the user how to move and how to shoot in the game.
* Player can signup to have their scores saved under their name, or play anonmously under the name ZMB (short for zombie).
* Click start to play the game, and good luck surviving!
* After you have lost all 3 lives you will be redirected to the scores page where you get to see the top 10 scores on the leaderboard so you can gauge how far you have to survive to be on that list.
* There is also a recent games scoreboard where you can see the most recent games that were played by somebody else and see how they placed.
* Scores have real-time updates so there is no need to refresh the game.

## Technologies Used

* HTML
* CSS
* JavaScript
* PostgreSQL
* Node.js
* Express
* React
* Websockets
* Phaser.io Library

## Challenges and Struggles

1. ***Web Sockets***:

Like with learning any new technology, there was definitely a learning curve and it took me a while to understand how web sockets worked and how to properly set up a socket to transfer data from the server to the client and vice versa. The disconnecting function that socket.io comes with was really confusing because it was kind of unpredictable at times and I did not know what was going on. I had to take a step back and really go through how the data flow was set up for the web sockets to properly understand the issue. 

## Stretch Goals

1. Add a feature where users can choose the type of players and type of weapon they would like to use.

2. Create more maps for more variety.

3. Optimize game for best possible fps.