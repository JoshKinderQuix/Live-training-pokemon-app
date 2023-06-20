//! ToDo ----------------
/*
-Currently set to 12s timer for testing. Set countdown = 120000 (120k) instead of 12000 (12k) in timerStart() function for 2 min
-Refine CSS/ add high score count if not too much
-clean up code
-Further refinements such as improved alert box, scorekeeping, etc. can be implemented at students' own discretion. 
*/

//We're going to put everything in an IIFE (Immediately Invoked Function Expression) so that there's no global variables
//Wrap in try/catch as good practice
try {
  (function () {
    // invoke all the variables we need at the top. More can be added as you go. Let's start with the actual Pokemon list, in an array
    // this is the oldest of the old ways to create an array, so we're just gonna copypaste that in chat 
    // when creating variables, explain document.getElementById, and we'll explain queryselectors later so they have frame of reference for both

    //Global Variables
    const theOGPokemon = [
      "bulbasaur",
      "ivysaur",
      "venusaur",
      "charmander",
      "charmeleon",
      "charizard",
      "squirtle",
      "wartortle",
      "blastoise",
      "caterpie",
      "metapod",
      "butterfree",
      "weedle",
      "kakuna",
      "beedrill",
      "pidgey",
      "pidgeotto",
      "pidgeot",
      "rattata",
      "raticate",
      "spearow",
      "fearow",
      "ekans",
      "arbok",
      "pikachu",
      "raichu",
      "sandshrew",
      "sandslash",
      "nidoran♀",
      "nidorina",
      "nidoqueen",
      "nidoran♂",
      "nidorino",
      "nidoking",
      "clefairy",
      "clefable",
      "vulpix",
      "ninetales",
      "jigglypuff",
      "wigglytuff",
      "zubat",
      "golbat",
      "oddish",
      "gloom",
      "vileplume",
      "paras",
      "parasect",
      "venonat",
      "venomoth",
      "diglett",
      "dugtrio",
      "meowth",
      "persian",
      "psyduck",
      "golduck",
      "mankey",
      "primeape",
      "growlithe",
      "arcanine",
      "poliwag",
      "poliwhirl",
      "poliwrath",
      "abra",
      "kadabra",
      "alakazam",
      "machop",
      "machoke",
      "machamp",
      "bellsprout",
      "weepinbell",
      "victreebel",
      "tentacool",
      "tentacruel",
      "geodude",
      "graveler",
      "golem",
      "ponyta",
      "rapidash",
      "slowpoke",
      "slowbro",
      "magnemite",
      "magneton",
      "farfetch'd",
      "doduo",
      "dodrio",
      "seel",
      "dewgong",
      "grimer",
      "muk",
      "shellder",
      "cloyster",
      "gastly",
      "haunter",
      "gengar",
      "onix",
      "drowzee",
      "hypno",
      "krabby",
      "kingler",
      "voltorb",
      "electrode",
      "exeggcute",
      "exeggutor",
      "cubone",
      "marowak",
      "hitmonlee",
      "hitmonchan",
      "lickitung",
      "koffing",
      "weezing",
      "rhyhorn",
      "rhydon",
      "chansey",
      "tangela",
      "kangaskhan",
      "horsea",
      "seadra",
      "goldeen",
      "seaking",
      "staryu",
      "starmie",
      "mr. mime",
      "scyther",
      "jynx",
      "electabuzz",
      "magmar",
      "pinsir",
      "tauros",
      "magikarp",
      "gyarados",
      "lapras",
      "ditto",
      "eevee",
      "vaporeon",
      "jolteon",
      "flareon",
      "porygon",
      "omanyte",
      "omastar",
      "kabuto",
      "kabutops",
      "aerodactyl",
      "snorlax",
      "articuno",
      "zapdos",
      "moltres",
      "dratini",
      "dragonair",
      "dragonite",
      "mewtwo",
      "mew",
    ];
    let entryList = [];
    let missingList = theOGPokemon;
    //empty variables that we can assign, based on the needs of a specific function
    let nameInput, viewList, entry;
    let count = 0;
    let seconds = 0;
    let minutes = 0;
    let countStarted = false;
    const startBtn = document.getElementById("begin-button");
    const formNameSubmit = document.getElementById("form-name-submit");
    const clock = document.getElementById("clock");
    let countdown = 120000;

    /*
    Let's start writing our first function, the countdown timer.
    Requirements:
      -Must begin countdown, when the Go! button is pressed
      -Must countdown from 2 minutes
      -Must stop running, and reset the timer after time is up
      -Countdown must display remaining Mins/Secs in the DOM, in real time
      -Must enable our text box, and submit buttons while timer is running, and disable them when it is not
      -Send an alert, with how many we got, and which pokemon we missed
    */

    function timerStart() {
      //ensure countdown is reset when start button is clicked. Based in milliseconds (ms).
      console.log("click");
      countdown = 120000;
      nameInput = document.querySelector("#form-name-input");

      //disable start button while timer runs, otherwise, user could start setInterval more than once, running the code more than once per second
      //enable form-name-submit (disabled by default in HTML)

      if (countdown > 0) {
        startBtn.disabled = true;
        formNameSubmit.disabled = false;
        nameInput.disabled = false;
      }

      //Using setInterval method to run the function contained in "timer" once every second.
      //Ie: setInterval(function() { run this code }, once every X milliseconds)

      const timer = setInterval(function () {
        /*
        CONVERTING MS TO MIN/SEC:
        The Math.floor() function returns the largest integer less than or equal to a given number. This is good for avoiding decimals when you don't want them.
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
        
        We know that there are 1000ms in 1 second, and 60 seconds in 1 minute
        Therefore, to find how many minutes there are left in our countdown variable, we will need to convert 
        120000 into a readable format. Here, we use a common formula to accomplish just that.
        You can test this in console, by inputting ((120000 % (1000 * 60 * 60)) / (1000 * 60))
        */

        let minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        //set the innerHTML of clock to a string

        clock.innerHTML = minutes + " min " + seconds + " sec ";

        //remove 1000 milliseconds from the countdown variable

        countdown -= 1000;

        //stops the code from running when the timer hits zero

        if (countdown < 0) {
          clearInterval(timer);

          //ser the innerHTML of clock to "Time's up!"

          clock.innerHTML = "Time's Up!";

          /*
          This is referencing another function we haven't created yet!
          We know that we want to have an alert that tells us which Pokemon we didn't get, so we'll pass missingList as an argument
          and build that function next.
          It's best practice to separate functionality whenever possible. Remember! KISS (Keep It Simple, Studpid!)
           */

          myAlert(missingList);

          //Reset buttons to default

          formNameSubmit.disabled = true;
          startBtn.disabled = false;
          nameInput.disabled = true;
        }

        //NOT IMPLIMENTED
        //reset stops timer code from running, and re-enables the start button
        /*
      resetBtn.addEventListener("click", function () {
        clearInterval(timer);
        startBtn.disabled = false;
        clock.innerHTML = 'Press "Start" to begin countdown.';
      });*/
      }, 1000);
    }

    /*
           send a browser alert 
           \r means carriage return, or return to the beginning of the line
           \n means newline
           array.join(separator) combines all items in an array into one string, using the separator between items
          */

    function myAlert(missList) {
      alert(
        "You remembered " +
          count +
          " Pokemon.\r\n You forgot:\r\n" +
          missList.join("\r\n")
      );
      for (let i = 0; i < missList.length; i++) {
        console.log(missList[i]);
      }
    }

    /*
  We need to create a function that handles our inputs while the timer is running
  As always, before you start writing code, think about your requirements
  
  1. It should check the entry in the "form-name-input" box, to see if what we've typed matches any of the entries in our "theOGPokemon" array
  2. If it does, it should then push the entry to the "view-list" unordered list
  
  */

    function addRow() {
      //We will use queryselectors here, to attach DOM items by ID to variables. This avoids alot of extra typing, and improves readability
      //For example, document.querySelector("#form-name-input") is the same as document.getElementById("form-name-input")
      //"#myId" represents element ID, ".myClass" represents element class just like in CSS. These are called CSS selector strings.
      //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

      nameInput = document.querySelector("#form-name-input");
      viewList = document.querySelector("#view-list");
      entry = nameInput.value.toLowerCase();

      // this is checking to see if the current entry exists in theOGPokemon array
      //this will check the value of what's inside our "#form-name-input" box, and attempt to find a matching item in array "theOGPokemon"
      //if it finds a matching item, with an index of 0 or greater, it will then check to make sure it doesn't exist in the empty array we created earlier, array "entryList"
      //items that exist in an array already will have an indexOf 0 or greater, items that don't exist will have an indexOf === -1
      //if both conditions are true, it will then excecute the code within the brackets { }, following our conditional statement

      if (theOGPokemon.indexOf(entry) > -1 && entryList.indexOf(entry) === -1) {
        entryList.push(entry);
        viewList.innerHTML +=
          '<li id="' +
          entry +
          '"><span class="li-name">' +
          entry +
          '</span><span class="li-anchor"> Remove</span></li>';
        nameInput.value = "";
        updateCount("add");
        const removeBtns = document.querySelectorAll(".li-anchor");
        removeBtns.forEach((btn) => {
          let currentNode = btn.closest("li");
          btn.addEventListener("click", () => removeRow(currentNode));
        });

        //If either of the statements in our conditional statement evaluate to false, the code simply does nothing
      } else {
        return;
      }
    }

    /*
      The code for REMOVE BUTTON, in the addRow() function references this function.
      If you decided to exclude this functionality, this function is not needed.
      */

    function removeRow(node) {
      node.remove();
      let deletedPokemon = node.id;
      let pokeIndex = entryList.indexOf(deletedPokemon);
      entryList.splice(pokeIndex, 1);
      updateCount("remove");
    }

    //Creates a count variable, and replaced the innerHTML of any items in the .Count Class with the value

    function updateCount(value) {
      if (value === "add") {
        count += 1;
        //change from queryselector
        document.querySelector(".count").innerHTML = "Count: " + count;
      } else {
        count -= 1;
        document.querySelector(".count").innerHTML = "Count: " + count;
      }
    }

    //EVENT LISTENERS:

    startBtn.addEventListener("click", timerStart);
    formNameSubmit.addEventListener("click", addRow);
    document
      .querySelector(".form-name-input")
      .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          formNameSubmit.click();
        }
      });
  })();
} catch (ex) {
  console.error("Error: " + ex);
}
