# SERVICE DEPRECATED
Hey folks, Witch Turn is now a discontinued prjoect. It was deleted on 10/7/23. I'm currently in the process of developing an organizational website for fun. If you're looking for a newer, broader version of these tools, then check out my Clocks repository.

# WitchTurnOnline
   *The Witch Turn app is a tool for tabletop players and their gms to manage initiative in games, provide the Gm a way to manage clocks, and the players a way to view some / all of those clocks. The dev(s) of this app found that there were a lot of tools online for managing tabletop simulators, or shared dice rolling, but none for visualizing shared clocks, or viewing initiative.*
  

### A note on cloning this repo
You will need to create your own .env files. I have not included them in this git repo.


## Rooms
  Using the websockets io tool, combined with react, this app has been set up to provide users with shared rooms, much in the style of the jackbox games. Eventually we would like to add the functionality which allows the user to save the contents of rooms out, so that they can quick load them again if they need to pause a session.
  
## How to use

  When you log into Witch Turn (currently just by accessing the site), you can either generate a new room, or join a room. If you generate a room you will be the DM. This means that you will be the only person who can advance or reduce turns. alternatively, you can use the code your dm sends you to join a room. If you join a room, you will do so as a player, and only have the ability to add participants to the initiative roll.


## Known Technical Issues

- Currently all communications through sockets are eminated to all participants in the room. There doesn't yet seem to be a way to send to all other members of a room.
- There is a notable lag time on certain communications. The DM status was created to solve this. We need to resolve this lag issue, and also resolve who gets to advance or reduce turns.

## Goals

- [x] There should be a way for the DM to hide participants from the users, so that the DM could add entities that are acting off screen.
- [x] There needs to be a way too create a copy pastable link that people can follow that the dm can post. It will save people the trouble of typing in the join.
- [ ] The website needs UI improvement. This applies to both the color / stylings, and the quality of the site on mobile. This needs to be done without duplication of code.
- [ ] There needs to be a way to track where you are in the order. I would like to tie player name to this as well. 
- [ ] There should be a way to track clocks in the same simultaneous fashion as we track initiative.
- [ ] There should be a way to roll dice in the app, and this information should be communicated to other users (The results are important).
- [ ] There should be a way to chat within the app. This is of low priority. This goal should be reviewed by users.
- [x] There should be a way to track whether an entity has used its reaction.
  - Currently the Dm is the only person who can modify this
- [ ] There should be a way to roll dice for an entity on the entity. This should include things like ways for the GM to track invisible saves and rolls.
- [ ] There should be an ability to track basic information about the entity on the entity (AC, Health, ETC). For this one players should only be able to alter their own.

## Sprint 3

  Sprint 3 runs from 4/15/23 to 5/30/23
  This sprint will cover:
  - Users will now be able to log in
  - Users will be able to save sessions
  - Users will be able to recover password
