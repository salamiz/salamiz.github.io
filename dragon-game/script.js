let xp = 0; 
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
]


// Monsters
const monsters = [
    {
        name : "slime",
        level : 2,
        health : 15,
    },
    {
        name : "fanged beast",
        level : 8,
        health : 60,
    },
    {
        name : "dragon",
        level : 20,
        health : 300,
    }
]
        

// locations
const locations = [
    {
        name: "Town Square",
        buttonText: ["Go to store", "Go to cave", "Fight dragon"],
        buttonFunction: [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "Store",
        buttonText: ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        buttonFunction: [buyHealth, buyWeapon, goTown],
        text: "You are in the store. What do you want to do?"
    },
    {
        name: "Cave",
        buttonText: ["Fight Slime", "Fight fanged beast", "Go to town square"],
        buttonFunction: [fightSlime, fightBeast, goTown],
        text: "You are in the cave. You see some monsters."
    },
    {
        name: "Fight",
        buttonText: ["Attack", "Dodge", "Run"],
        buttonFunction: [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "Victory",
        buttonText: ["Go to town square", "Go to town square", "Go to town square"],
        buttonFunction: [goTown, goTown, easterEgg],
        text: 'The monster screams "Argh!!" as it dies. You gain experience points and earn gold.'
    },
    {
        name: "Defeat",
        buttonText: ["REPLAY?", "REPLAY?", "Go to town square"],
        buttonFunction: [restart, restart, goTown],
        text: "You were defeated."
    },
    {
        name: "Win",
        buttonText: ["REPLAY?", "REPLAY?", "REPLAY?"],
        buttonFunction: [restart, restart, restart],
        text: "You defeated the dragon! You won the game!!"
    },
    {
        name: "Easter Egg",
        buttonText: ["2", "8", "Go to town square"],
        buttonFunction: [pickTwo, pickEight, goTown],
        text: "You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }

]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location.buttonText[0];
    button2.innerText = location.buttonText[1];
    button3.innerText = location.buttonText[2];
    button1.onclick = location.buttonFunction[0];
    button2.onclick = location.buttonFunction[1];
    button3.onclick = location.buttonFunction[2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
   update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health !!";
    }
}

function buyWeapon() {
    if (currentWeapon < (weapons.length - 1)) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You bought a " + newWeapon + " !!";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon !!";
        }
    } else {
        text.innerText = "You already have the best weapon !!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift() // the currentWeapon variable is only accesible within this if block statement as it is declared using "let".
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon !!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}


function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += " You miss."
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster () {
    gold += Math.floor (monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0; 
    health = 100;
    gold = 50;
    currentWeapon = 0;
    fighting;
    monsterHealth;
    inventory = ["stick"];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();
}

function easterEgg () {
    update(locations[7]);
}

function pickTwo() {
    pick (2);
}

function pickEight() {
    pick (8);
}

function pick (number) {
    let randomNumbers = [];
    while (randomNumbers.length < 10) {
        randomNumbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + number + ". Here are the random numbers:\n"
    for (let i = 0; i < 10; i++) {
        text.innerText += randomNumbers[i] + "\n";
    }
    if (randomNumbers.indexOf(number) !== -1) {
        text.innerText += "You win go 20 Gold!!";
        gold += 20;
        goldText.innerText = gold;
    }
    else{
        text.innerText += "You lose 10 health!!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}