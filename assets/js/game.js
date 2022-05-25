console.log("Hello");

// function to set name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }


    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            alert("You don't have enough money!");
        }

    }
};
// Logging variables
console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

var enemyInfo = [{
        name: "Roborto",
        attack: randomNumber(10, 14),
        shield: {
            type: "wood",
            strength: 10
        }
    },
    {
        name: "Amy Andriod",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

var fightOrSkip = function () {

    // ask player if they'd like to fight or skip 
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if(promptFight === "" || promptFight === null) {
        alert("You need to provide a valid answer. Please try again.");
        return fightOrSkip();
    }

    if (promptFight.toLowerCase() === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip?");
        // if yes(true), leave fight
        if (confirmSkip) {
            alert(playerInfo.name + " has chosen to skip this fight. Goodbye!");
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);

            return true;
        }
    }
    return false;
}

var fight = function (enemy) {
    console.log(enemy);

    // repeat and execute as long as the enemy-robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {

        // ask player if they'd like to fight or skip using fightOrSkip function
        if(fightOrSkip()) {
            
            // if true, leave fight by breaking loop
            break;
        }

        // Remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + " atacked " + enemy.name + ". " + enemy.name + " now has " +
            enemy.health + " health remaining.");

        // Check enemy's health
        if (enemy.health <= 0) {
            alert(enemy.name + " has died!");
            break;
        } else {
            alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Remove Player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(enemy.name + " attacked " +
            playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        // Check player's health
        if (playerInfo.health <= 0) {
            alert(playerInfo.name + " has died!");
            break;
        } else {
            alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};
var startGame = function () {
    // reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        // check that player has not died in game
        if (playerInfo.health > 0) {
            // let player know what round they are in
            alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // set enemy name
            var pickedEnemyObj = enemyInfo[i];

            // reset pickedEnemyObj.health before starting a new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);


            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            alert("You have lost your robot in battle! Game Over!");
        }
    }

    // play again
    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function () {
    // ask the player what they would like to do
    var shopOptionPrompt = parseInt(prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice."));
    switch (shopOptionPrompt) {
        
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            alert("Leaving the store.");

            // do nothing, so the function will end
            break;
        default:
            alert("You did not pick a valid option. Try again.");

            // call shop() again to force the player to pick a valid option
            shop();
            break;
    }
};

// function to generate a random numeric value
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

var test = function () {
    var response = prompt("Question?");
    if (response === "" || response === null) {
        alert("You need to provide a valid answer! Please try again.");
        test();
    }
}
startGame();