//https://fonts.google.com/specimen/VT323
function gid(el) {
  return document.getElementById(el);
};
//Testing Function
function myFunction() {
  console.log('it works')
}

//Music File Variables
let mainMenuTheme = new Audio('zAnother Hopeful Tomorrow.mp3');
let levelOneTheme = new Audio('zA Sweet Smile.mp3');
let levelTwoTheme = new Audio('zTender Strength.mp3');
let levelThreeTheme = new Audio ('zCold Night.mp3');
let bossTheme = new Audio('zMartyr BGM.mp3');
let bossTheme2 = new Audio('zTalulha BGM.mp3');
let endScreenTheme = new Audio('zSay My Name.mp3');

//Settings Variables
//Fullscreen Notice
let fullscreenStatus = 0;
//Settings Menu
let settingMenuStatus = 0;
//Music Setting
let musicSetting = 0;
musicSetting = parseInt(musicSetting);
//Boss Theme Setting
let theme = 0;
theme = parseInt(theme);

//Hides the Fullscreen Notice
function gotIt() {
  //Change the fullScreen status to 1 (hidden)
  fullscreenStatus = 1;
  //Show the Main Menu
  gid('buttonsBox').style.visibility = "visible";
  //Hide the Fullscreen Notice
  gid('notice').style.visibility = "hidden";
}

//Shows the Secret Credits Screen
function creditScreen() {
  //If the fullscreen notice is still open, don't open the credits
  if (fullscreenStatus == 0) {
    return
  } else {
    //If the settings menu is open when the credits are opened
    if (settingMenuStatus == 1) {
      //Hide the settings menu
      gid('settingsMenu').style.visibility = "hidden";
      //Set the settingMenuStatus back to 0 (hidden)
      settingMenuStatus = 0;
    }
    //Make the credits visible
    gid('credits').style.visibility = "visible";
    //Hide the main menu
    gid('buttonsBox').style.visibility = "hidden";
  };
};

function exitCredits() {
  //Make the main menu visible
  gid('buttonsBox').style.visibility = "visible";
  //Hide the credits
  gid('credits').style.visibility = "hidden";
}

//Starts the game
function startGame() {
  //Save the player music setting to local storage
  localStorage.setItem('musicChoice',musicSetting);
  //Save the player sound effect setting to local storage
  localStorage.setItem('themeChoice',theme);
  //Bring the player to the loading screen
  window.location.href = "loading.html"
};

//Brings you to the settings menu
function settingsMenu() {
  //Change the settingMenuStatus to 1, which means visible
  settingMenuStatus = 1;
  //Show the Settings Menu
  gid('settingsMenu').style.visibility = "visible";
  //Hide the Main Menu
  gid('buttonsBox').style.visibility = "hidden";
};

//Plays main menu music when the page loads, unless music is set to off
function mainMenuMusic() {
  if (musicSetting == 0) {
    //If musicSetting = 0, play the main menu music
    mainMenuTheme.play();
    //Start an event listener which detects when the audio file has finished playing
    mainMenuTheme.addEventListener('ended', function() {
      //When the audio file has finished playing, play it again
      mainMenuTheme.play();
    })
  }
  if (musicSetting == 1) {
    //If musicSetting = 1, stop the music and restart it
    mainMenuTheme.pause();
    mainMenuTheme.currentTime = 0;
  }
}

//Turns music on/off in the game
function musicChange() {
  if (musicSetting == 0) {
    //Change musicSetting to 1, which means OFF
    musicSetting = 1;
    //Change the button text to OFF
    gid('music').innerHTML = "OFF";
    //Run the function that controls the main menu music
    mainMenuMusic();
  }
  else {
    //Change musicSetting to 0, which means ON
    musicSetting = 0;
    //Change the button text to ON
    gid('music').innerHTML = "ON";
    //Run the function that controls the main menu music
    mainMenuMusic();
  }
};

//Changes boss theme in game
function bossThemeChange() {
  if (theme == 0) {
    //If boss theme is set to theme #1, change it to theme #2
    theme = 1;
    //Change the button text to "Theme #2"
    gid('bossTheme').innerHTML = "THEME #2";
  }
  else {
    //If boss theme is set to theme #2, change it to theme #1
    theme = 0;
    //Change the button text to "Theme #1"
    gid('bossTheme').innerHTML = "THEME #1";
  }

  //Play a 5-second preview of the selected theme to the player
  if (musicSetting == 0) {
    mainMenuTheme.pause();
    bossTheme.currentTime = 0;
    bossTheme.pause();
    bossTheme2.currentTime = 0;
    bossTheme2.pause();
    if (theme == 0) {
      bossTheme.play();
      setTimeout(function(){
        bossTheme.currentTime = 0;
        bossTheme.pause();
        mainMenuTheme.play();
      },7500)
    }
    else if (theme == 1) {
      bossTheme2.play();
      setTimeout(function(){
        bossTheme2.currentTime = 0;
        bossTheme2.pause();
        mainMenuTheme.play();
      },7500)
    }
  }
}

//Leave the Settings Menu
function exitSettings() {
  //Make the main menu visible
  gid('buttonsBox').style.visibility = "visible";
  //Hide the settings menu
  gid('settingsMenu').style.visibility = "hidden";
}

//Loading screen function
function loading() {
  //Every 0.75 seconds, change the loading screen text to make it look like its a gif
  setTimeout(function(){
    //After 0.75 seconds, change the loading screen text
    gid('loadingText').innerHTML = "Getting Off the Train..";
    setTimeout(function(){
      //After another 0.75 seconds, change the loading screen text
      gid('loadingText').innerHTML = "Getting Off the Train...";
      setTimeout(function(){
        //After another 0.75 seconds, change the loading screen text
        gid('loadingText').innerHTML = "Getting Off the Train.";
        setTimeout(function(){
          //After another 0.75 seconds, change the loading screen text
          gid('loadingText').innerHTML = "Getting Off the Train..";
          setTimeout(function(){
            //After another 0.75 seconds, change the loading screen text
            gid('loadingText').innerHTML = "Getting Off the Train...";
            setTimeout(function(){
              //After having changed the text 5 times, load the game page after another 0.75 seconds
              window.location.href = "test.html";
            },750)
          },750);
        },750);
      },750);
    },750);
  },750);
};

//Variables for storing data from local storage
let musicStuff;
let themeStuff;

//Function for retrieving audio settings from local storage
function retrieveAudio() {
  musicStuff = localStorage.getItem('musicChoice');
  themeStuff = localStorage.getItem('themeChoice');
};

//Function for hiding the controls when moved to level 1
function hideControl() {
  gid('controls').style.visibility = "hidden";
  playerPassed = 0;
};

//Function for playing music in the game levels
function playLevelMusic() {
  if (musicStuff == 0) {
    if (stage == 0) {
      levelOneTheme.play(); //Play the music for level one
      levelOneTheme.addEventListener('ended', function() { //When the music ends
        levelOneTheme.play(); //Play it again
      })
    }
    else if (stage == 1) {
      levelTwoTheme.play(); //Play the music for level two
      levelTwoTheme.addEventListener('ended',function() {
        levelTwoTheme.play();
      })
    }
    else if (stage == 2) {
      levelThreeTheme.play();
      levelThreeTheme.addEventListener('ended',function() {
        levelThreeTheme.play();
      })
    }
    else if (stage == 3) {
      if (themeStuff == 0) {
        bossTheme.play();
        bossTheme.addEventListener('ended',function() {
          bossTheme.play();
        })
      }
      else if (themeStuff == 1) {
        bossTheme2.play();
        bossTheme2.addEventListener('ended',function() {
          bossTheme2.play();
        })
      }
    }
    else if (stage == 4) {
      endScreenTheme.play();
      endScreenTheme.addEventListener('ended',function() {
        endScreenTheme.play();
      })
    }
  }
};

//Function for stopping music in the game levels
function endLevelMusic() {
  if (musicStuff == 0) {
    levelOneTheme.currentTime = 0;
    levelOneTheme.pause();
    levelTwoTheme.currentTime = 0;
    levelTwoTheme.pause();
    levelThreeTheme.currentTime = 0;
    levelThreeTheme.pause();
    bossTheme.currentTime = 0;
    bossTheme.pause();
    bossTheme2.currentTime = 0;
    bossTheme2.pause();
    endScreenTheme.currentTime = 0;
    endScreenTheme.pause();
  }
};