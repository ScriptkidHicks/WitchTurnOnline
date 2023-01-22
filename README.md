# WitchTurnOnline
   *The Witch Turn app is a tool for tabletop players and their gms to manage initiative in games, provide the Gm a way to manage clocks, and the players a way to view some / all of those clocks. The dev(s) of this app found that there were a lot of tools online for managing tabletop simulators, or shared dice rolling, but none for visualizing shared clocks, or viewing initiative.*
   
You can find Witch Turn [here](https://witch-turn-l95l.onrender.com)


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
- [ ] There should be a way to track whether an entity has used its reaction.
- [ ] There should be a way to roll dice for an entity on the entity. This should include things like ways for the GM to track invisible saves and rolls.
- [ ] There should be an ability to track basic information about the entity on the entity (AC, Health, ETC). For this one players should only be able to alter their own.

## Next Sprint

  The next sprint runs from 1/19/23 through 1/29/23.
  This sprint will cover:
  - Polishing the UI to an attractive, useful state.
    - This will include creating more pixel art pictures that we have the rights to, and can be freely used in the app.
  - Eliminating any remaining bugs in the product.
  - Cleaning the code for readability, as well as smoothness.
  
  At the end of this sprint the Alpha of this product will be released, and will represent the bare minimum version of this product for usability.
  
  ### Known Bugs
  - [ ] The right button incorrectly indexes, sometimes showing either the whole list, or none.
  - [ ] The mobile UI is not correctly positioned for use on a mobile device
  - [ ] The layout of the main intro page needs to be reworked to have a vertical first layout.
  - [ ] The buttons do not currently have animations when clicked. This is more noticable for buttons that do not navigate or close modals.
