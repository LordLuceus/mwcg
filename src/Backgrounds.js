import { map, rand } from './Utils';

const backgrounds = [
    "Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero", "Guild Artisan",
    "Hermit", "Sage", "Noble", "Outlander", "Sailor", "Soldier", "Urchin"
]

function getClassBackgrounds(characterClass) {
    switch (characterClass) {
        //Player classes
        case "Agent":
            return ["Charlatan", "Sailor"];
        case "Archer":
        case "Battlemage":
            return ["Folk Hero", "Soldier", "Sailor"]
        case "Knight":
            return ["Folk Hero", "Soldier", "Noble"]
        case "Assassin":
            return ["Charlatan", "Criminal"]
        case "Barbarian":
            return ["Hermit", "Folk Hero", "Outlander"]
        case "Bard":
            return ["Charlatan", "Entertainer", "Sailor"];
        case "Crusader":
        case "Healer":
        case "Pilgrim":
            return ["Acolyte", "Sage"];
        case "Rogue":
        case "Thief":
            return ["Criminal"];
        case "Monk":
            return ["Acolyte", "Sage", "Urchin", "Hermit"]
        case "Scout":
            return ["Hermit", "Outlander", "Sailor"];
        case "Sorcerer":
        case "Mage":
            return ["Hermit", "Sage"]
        case "Spellsword":
            return ["Folk Hero", "Soldier", "Noble", "Hermit", "Sage", "Sailor"]
        case "Nightblade":
            return ["Criminal", "Charlatan", "Sage"];
        case "Warrior":
            return ["Folk Hero", "Soldier", "Outlander"]
        case "Witchhunter":
            return ["Folk Hero", "Outlander", "Hermit"]
        //NPC Classes
        case "Alchemist":
        case "Apothecary":
        case "Enchanter":
            return ["Sage"];
        case "Bookseller":
        case "Caravaner":
        case "Clothier":
        case "Commoner":
        case "Farmer":
        case "Herder":
        case "Merchant":
        case "Miner":
        case "Pauper":
        case "Pawnbroker":
        case "Publican":
        case "Trader":
            return ["Urchin"];
        case "Buoyant Armiger":
        case "Drillmaster":
        case "Guild Guide":
        case "Smith":
            return ["Guild Artisan"];
        case "Champion":
        case "Enforcer":
        case "Guard":
        case "Ordinator":
        case "Ordinator Guard":
        case "Sharpshooter":
            return ["Folk Hero", "Soldier"];
        case "Dreamer":
            return ["Sage", "Acolyte"];
        case "Gondolier":
            return ["Sailor", "Urchin", "Guild Artisan"];
        case "Hunter":
        case "Mabrigash":
        case "Wise Woman":
            return ["Outlander"];
        case "Smuggler":
            return ["Criminal"];
        case "Necromancer":
        case "Priest":
        case "Warlock":
        case "Witch":
            return ["Acolyte", "Sage"];
        case "Noble":
            return ["Noble"];
        case "Savant":
            return ["Sailor", "Folk Hero", "Guild Artisan"];
        case "Shipmaster":
            return ["Sailor"];
        default:
            return backgrounds;
    }
}

//TODO: Backgrounds add new factions or traits
const origins = {
    "Acolyte": [
        "You ran away from home at an early age and found refuge in a temple.",
        "Your family gave you to a temple, since they were unable or unwilling to care for you.",
        "You grew up in a household with strong religious convictions. Entering the service of one or more gods seemed natural.",
        "An impassioned sermon struck a chord deep in your soul and moved you to serve the faith.",
        "You followed a childhood friend, a respected acquaintance, or someone you loved into religious service.",
        "After encountering a true servant of the gods, you were so inspired that you immediately entered the service of a religious group."
    ],
    "Charlatan": [
        "You were left to your own devices, and your knack for manipulating others helped you survive.",
        "You learned early on that people are gullible and easy to exploit.",
        "You often got in trouble, but you managed to talk your way out of it every time.",
        "You took up with a confidence artist, from whom you learned your craft.",
        "After a charlatan fleeced your family, you decided to learn the trade so you would never be fooled by such deception again.",
        "You were poor or you feared becoming poor, so you learned the tricks you needed to keep yourself out of poverty.",
    ],
    "Criminal": [
        "You resented authority in your younger days and saw a life of crime as the best way to fight against tyranny and oppression.",
        "Necessity forced you to take up the life of crime, since it was the only way you could survive.",
        "You fell in with a gang of reprobates and ne'er-do-wells, and you learned your specialty from them.",
        "A parent or relative taught you your criminal specialty to prepare you for the family business.",
        "You left home and found a place in a thieves' guild or some other criminal organization.",
        "You were always bored, so you turned to crime to pass the time and discovered you were quite good at it.",
    ],
    "Entertainer": [
        "Members of your family made ends meet by performing, so it was fitting for you to follow their example.",
        "You always had a keen insight into other people, enough so that you could make them laugh or cry with your stories or songs.",
        "You ran away from home to follow a minstrel troupe.",
        "You saw a bard perform once, and you knew from that moment on what you were born to do.",
        "You earned coin by performing on street corners and eventually made a name for yourself.",
        "A traveling entertainer took you in and taught you the trade.",
    ],
    "Folk Hero": [
        "You learned what was right and wrong from your family.",
        "You were always enamored by tales of heroes and wished you could be something more than ordinary.",
        "You hated your mundane life, so when it was time for someone to step up and do the right thing, you took your chance.",
        "A parent or one of your relatives was an adventurer, and you were inspired by that person's courage.",
        "A mad old hermit spoke a prophecy when you were born, saying that you would accomplish great things.",
        "You have always stood up for those who are weaker than you are.",
    ],
    "Guild Artisan": [
        "You were apprenticed to a master who taught you the guild's business.",
        "You helped a guild artisan keep a secret or complete a task, and in return you were taken on as an apprentice.",
        "One of your family members who belonged to the guild made a place for you.",
        "You were always good with your hands, so I took the opportunity to learn a trade.",
        "You wanted to get away from your home situation and start a new life.",
        "You learned the essentials of your craft from a mentor but had to join the guild to finish your training.",
    ],
    "Hermit": [
        "Your enemies ruined your reputation, and you fled to the wilds to avoid further disparagement.",
        "You are comfortable with being isolated, as you seek inner peace.",
        "You never liked the people you called your friends, so it was easy for you to strike out on your own.",
        "You felt compelled to forsake your past, but did so with great reluctance, and sometimes you regret making that decision.",
        "You lost everything - your home, your family, your friends. Going it alone was all you could do.",
        "Society's decadence disgusted you, so you decided to leave it behind.",
    ],
    "Noble": [
        "You come from an old and storied family, and it fell to you to preserve the family name.",
        "Your family has been disgraced, and you intend to clear their name.",
        "Your family recently came by its title, and that elevation thrust your into a new and strange world.",
        "Your family has a title, but none of your ancestors have distinguished themselves since we gained it.",
        "Your family is filled with remarkable people. you hope to live up to their example.",
        "You hope to increase your family's power and influence.",
    ],
    "Outlander": [
        "You spent a lot of time in the wilderness as a youngster, and you came to love that way of life.",
        "From a young age, you couldn't abide the stink of the cities and preferred to spend your time in nature.",
        "You came to understand the darkness that lurks in the wilds, and you vowed to combat it.",
        "Your people lived on the edges of civilization, and you learned the methods of survival from your family.",
        "After a tragedy you retreated to the wilderness, leaving your old life behind.",
        "Your family moved away from civilization, and you learned to adapt to your new environment.",
    ],
    "Sage": [
        "You were naturally curious, so you packed up and went to a university to learn more about the world.",
        "Your mentor's teachings opened your mind to new possibilities in that field of study.",
        "You were always an avid reader, and you learned much about your favorite topic on your own.",
        "You discovered an old library and pored over the texts you found there. That experience awakened a hunger for more knowledge.",
        "You impressed a wizard who told you you were squandering your talents and should seek out an education to take advantage of your gifts.",
        "One of your parents or a relative gave you a basic education that whetted your appetite, and you left home to build on what you had learned.",
    ],
    "Sailor": [
        "You were press-ganged by pirates and forced to serve on their ship until you finally escaped.",
        "You wanted to see the world, so you signed on as a deck-hand for a merchant ship.",
        "One of your relatives was a sailor who took you to sea.",
        "You needed to escape your community quickly, so you stowed away on a ship. When the crew found you, you were forced to work for your passage.",
        "Reavers attacked your community, so you found refuge on a ship until you could seek vengeance.",
        "You had few prospects where you were living, so you left to find your fortune elsewhere."
    ],
    "Soldier": [
        "You joined the militia to help protect your community from monsters.",
        "A relative of mine was a soldier, and you wanted to carry on the family tradition.",
        "The local lord forced you to enlist in the army.",
        "War ravaged your homeland while you were growing up. Fighting was the only life you ever knew.",
        "You wanted fame and fortune, so you joined a mercenary company, selling your sword to the highest bidder.",
        "Invaders attacked your homeland. yout was your duty to take up arms in defense of your people."
    ],
    "Urchin": [
        "Wanderlust caused you to leave your family to see the world. you look after yourself.",
        "You ran away from a bad situation at home and made your own way in the world.",
        "Monsters wiped out your village, and you were the sole survivor. you had to find a way to survive.",
        "A notorious thief looked after you and other orphans, and we spied and stole to earn our keep.",
        "One day you woke up on the streets, alone and hungry, with no memory of your early childhood.",
        "Your parents died, leaving no one to look after you. you raised yourself.",
    ],
}

export function generateBackstory(characterClass, age, lifestyle) {

    let possibilities = origins[getBackground(characterClass)];

    if (lifestyle == "A Noble" || lifestyle == "Royalty") {
        possibilities.concat(["Noble"]);
    } else if (lifestyle == "Destitue" || lifestyle == "Poor") {
        possibilities.concat(["Urchin"]);
    }

    return rand(possibilities);
}

function roll1d(die) {
    return Math.ceil(Math.random() * die);
}

function getBackground(characterClass) {
    return rand(getClassBackgrounds(characterClass));
}

function getNumberOfLifeEvents(age) {
    if (age <= 20) {
        return 1;
    }
    if (age <= 30) {
        return roll1d(4);
    }
    if (age <= 40) {
        return roll1d(6);
    }
    if (age <= 50) {
        return roll1d(8);
    }
    if (age <= 60) {
        return roll1d(10);
    }
    return roll1d(12);
}
