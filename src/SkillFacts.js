const classDetails = {
    "Acrobat": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", " Endurance"],
        "Major Skills": ["Acrobatics", "Athletics", "Marksman", "Sneak", "Unarmoured"],
    },
    "Agent": {
        "Specialisation": "Stealth",
        "Attributes": ["Personality", " Agility"],
        "Major Skills": ["Speechcraft", "Sneak", "Acrobatics", "Light Armor", "Short Blade"],
    },
    "Archer": {
        "Specialisation": "Combat",
        "Attributes": ["Agility", " Strength"],
        "Major Skills": ["Marksman", "Long Blade", "Block", "Athletics", "Light Armor"],
    },
    "Assassin": {
        "Specialisation": "Stealth",
        "Attributes": ["Speed", " Intelligence"],
        "Major Skills": ["Sneak", "Marksman", "Light Armor", "Short Blade", "Acrobatics"],
    },
    "Barbarian": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", " Speed"],
        "Major Skills": ["Axe", "Medium Armor", "Blunt Weapon", "Athletics", "Block"],
    },
    "Bard": {
        "Specialisation": "Stealth",
        "Attributes": ["Personality", " Intelligence"],
        "Major Skills": ["Speechcraft", "Alchemy", "Acrobatics", "Long Blade", "Block"],
    },
    "Battlemage": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Strength"],
        "Major Skills": ["Alteration", "Destruction", "Conjuration", "Axe", "Heavy Armor"],
    },
    "Crusader": {
        "Specialisation": "Combat",
        "Attributes": ["Agility", " Strength"],
        "Major Skills": ["Blunt Weapon", "Long Blade", "Destruction", "Heavy Armor", "Block"],
    },
    "Healer": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", " Personality"],
        "Major Skills": ["Restoration", "Mysticism", "Alteration", "Hand-to-Hand", "Speechcraft"],
    },
    "Knight": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", " Personality"],
        "Major Skills": ["Long Blade", "Axe", "Speechcraft", "Heavy Armor", "Block"],
    },
    "Mage": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Willpower"],
        "Major Skills": ["Mysticism", "Destruction", "Alteration", "Illusion", "Restoration"],
    },
    "Monk": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", " Willpower"],
        "Major Skills": ["Hand-to-Hand", "Unarmored", "Athletics", "Acrobatics", "Sneak"],
    },
    "Nightblade": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", " Speed"],
        "Major Skills": ["Mysticism", "Illusion", "Alteration", "Sneak", "Short Blade"],
    },
    "Pilgrim": {
        "Specialisation": "Stealth",
        "Attributes": ["Personality", " Endurance"],
        "Major Skills": ["Speechcraft", "Mercantile", "Marksman", "Restoration", "Medium Armor"],
    },
    "Rogue": {
        "Specialisation": "Combat",
        "Attributes": ["Speed", " Personality"],
        "Major Skills": ["Short Blade", "Mercantile", "Axe", "Light Armor", "Hand-to-Hand"],
    },
    "Scout": {
        "Specialisation": "Combat",
        "Attributes": ["Speed, Endurance"],
        "Major Skills": ["Sneak", "Long Blade", "Medium Armor", "Athletics", "Block"],
    },
    "Sorcerer": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Endurance"],
        "Major Skills": ["Enchant", "Conjuration", "Mysticism", "Destruction", "Alteration"],
    },
    "Spellsword": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", " Endurance"],
        "Major Skills": ["Block", "Restoration", "Long Blade", "Destruction", "Alteration"],
    },
    "Thief": {
        "Specialisation": "Stealth",
        "Attributes": ["Speed", " Agility"],
        "Major Skills": ["Security", "Sneak", "Acrobatics", "Light Armor", "Short Blade"],
    },
    "Warrior": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", " Endurance"],
        "Major Skills": ["Long Blade", "Medium Armor", "Heavy Armor", "Athletics", "Block"],
    },
    "Witchhunter": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Agility"],
        "Major Skills": ["Conjuration", "Enchant", "Alchemy", "Light Armor", "Marksman"],
    },
    //NPC Classes
    "Alchemist": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Luck"],
        "Major Skills": ["Alchemy", "Alteration", "Conjuration", "Enchant", "Mysticism"],
    },
    "Apothecary": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Agility"],
        "Major Skills": ["Alchemy", "Security", "Mercantile", "Blunt Weapon", "Destruction"],
    },
    "Bookseller": {
        "Specialisation": "Stealth",
        "Attributes": ["Intelligence", " Personality"],
        "Major Skills": ["Mercantile", "Sneak", "Security", "Mysticism", "Speechcraft"],
    },
    "Buoyant Armiger": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", " Willpower"],
        "Major Skills": ["Marksman", "Light Armor", "Destruction", "Short Blade", "Sneak"],
    },
    "Caravaner": {
        "Specialisation": "Combat",
        "Attributes": ["Intelligence", " Endurance"],
        "Major Skills": ["Mercantile", "Sneak", "Security", "Acrobatics", "Speechcraft"],
    },
    "Champion": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", " Speed"],
        "Major Skills": ["Axe", "Block", "Medium Armor", "Light Armor", "Marksman"],
    },
    "Clothier": {
        "Specialisation": "Stealth",
        "Attributes": ["Intelligence", " Agility"],
        "Major Skills": ["Mercantile", "Sneak", "Security", "Acrobatics", "Speechcraft"],
    },
    "Commoner": {
        "Specialisation": "Stealth",
        "Attributes": ["Personality", " Endurance"],
        "Major Skills": ["Hand-to-Hand", "Unarmored", "Athletics", "Speechcraft", "Mercantile"],
    },
    "Dreamer": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", " Speed"],
        "Major Skills": ["Marksman", "Light Armor", "Blunt Weapon", "Short Blade", "Sneak"],
    },
    "Drillmaster": {
        "Specialisation": "Combat",
        "Attributes": ["Agility", " Intelligence"],
        "Major Skills": ["Block", "Acrobatics", "Unarmored", "Athletics", "Hand-to-Hand"],
    },
    "Enchanter": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", " Willpower"],
        "Major Skills": ["Enchant", "Blunt Weapon", "Alchemy", "Destruction", "Unarmored"],
    },
    "Enforcer": {
        "Specialisation": "Magic",
        "Attributes": ["Agility", "Speed"],
        "Major Skills": ["Short Blade", "Light Armor", "Marksman", "Sneak", "Destruction"],
    },
    "Farmer": {
        "Specialisation": "Combat",
        "Attributes": ["Personality", "Endurance"],
        "Major Skills": ["Speechcraft", "Blunt Weapon", "Hand-to-Hand", "Athletics", "Unarmored"],
    },
    "Gondolier": {
        "Specialisation": "Stealth",
        "Attributes": ["Strength", "Personality"],
        "Major Skills": ["Mercantile", "Speechcraft", "Sneak", "Hand-to-Hand", "Unarmored"],
    },
    "Guard": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", "Endurance"],
        "Major Skills": ["Long Blade", "Blunt Weapon", "Block", "Heavy Armor", "Medium Armor"],
    },
    "Guild Guide": {
        "Specialisation": "Magic",
        "Attributes": ["Intelligence", "Willpower"],
        "Major Skills": ["Mysticism", "Restoration", "Mercantile", "Speechcraft", "Sneak"],
    },
    "Herder": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", "Endurance"],
        "Major Skills": ["Light Armor", "Marksman", "Spear", "Restoration", "Athletics"],
    },
    "Hunter": {
        "Specialisation": "Stealth",
        "Attributes": ["Agility", "Speed"],
        "Major Skills": ["Light Armor", "Marksman", "Short Blade", "Sneak", "Athletics"],
    },
    "Mabrigash": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", "Endurance"],
        "Major Skills": ["Restoration", "Destruction", "Alteration", "Block", "Axe"],
    },
    "Master-at-Arms": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", "Endurance"],
        "Major Skills": ["Spear", "Short Blade", "Long Blade", "Axe", "Blunt Weapon"],
    },
    "Merchant": {
        "Specialisation": "Combat",
        "Attributes": ["Intelligence", "Personality"],
        "Major Skills": ["Speechcraft", "Mercantile", "Restoration", "Armorer", "Security"],
    },
    "Miner": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", "Endurance"],
        "Major Skills": ["Block", "Blunt Weapon", "Axe", "Unarmored", "Light Armor"],
    },
    "Noble": {
        "Specialisation": "Combat",
        "Attributes": ["Personality", "Luck"],
        "Major Skills": ["Speechcraft", "Mercantile", "Short Blade", "Security", "Athletics"],
    },
    "Ordinator": {
        "Specialisation": "Combat",
        "Attributes": ["Willpower", "Strength"],
        "Major Skills": ["Blunt Weapon", "Long Blade", "Destruction", "Heavy Armor", "Block"],
    },
    "Ordinator Guard": {
        "Specialisation": "Combat",
        "Attributes": ["Willpower", "Strength"],
        "Major Skills": ["Blunt Weapon", "Long Blade", "Destruction", "Heavy Armor", "Block"],
    },
    "Pauper": {
        "Specialisation": "Stealth",
        "Attributes": ["Luck", "Willpower"],
        "Major Skills": ["Sneak", "Athletics", "Unarmored", "Speechcraft", "Mercantile"],
    },
    "Pawnbroker": {
        "Specialisation": "Stealth",
        "Attributes": ["Intelligence", "Luck"],
        "Major Skills": ["Mercantile", "Sneak", "Security", "Athletics", "Speechcraft"],
    },
    "Priest": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", "Personality"],
        "Major Skills": ["Restoration", "Mysticism", "Alteration", "Blunt Weapon", "Unarmored"],
    },
    "Publican": {
        "Specialisation": "Magic",
        "Attributes": ["Personality", "Intelligence"],
        "Major Skills": ["Speechcraft", "Mercantile", "Sneak", "Light Armor", "Security"],
    },
    "Savant": {
        "Specialisation": "Stealth",
        "Attributes": ["Intelligence", "Personality"],
        "Major Skills": ["Speechcraft", "Mercantile", "Alchemy", "Unarmored", "Athletics"],
    },
    "Scout": {
        "Specialisation": "Combat",
        "Attributes": ["Agility", "Intelligence"],
        "Major Skills": ["Marksman", "Medium Armor", "Destruction", "Enchant", "Sneak"],
    },
    "Shipmaster": {
        "Specialisation": "Combat",
        "Attributes": ["Intelligence", "Personality"],
        "Major Skills": ["Mercantile", "Speechcraft", "Short Blade", "Athletics", "Sneak"],
    },
    "Slave": {
        "Specialisation": "Stealth",
        "Attributes": ["Endurance", "Luck"],
        "Major Skills": ["Sneak", "Acrobatics", "Athletics", "Heavy Armor", "Hand-to-Hand"],
    },
    "Smith": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", "Endurance"],
        "Major Skills": ["Block", "Blunt Weapon", "Unarmored", "Hand-to-Hand", "Armorer"],
    },
    "Smuggler": {
        "Specialisation": "Combat",
        "Attributes": ["Speed", "Personality"],
        "Major Skills": ["Blunt Weapon", "Sneak", "Mercantile", "Short Blade", "Speechcraft"],
    },
    "Trader": {
        "Specialisation": "Combat",
        "Attributes": ["Strength", "Personality"],
        "Major Skills": ["Mercantile", "Sneak", "Speechcraft", "Mysticism", "Security"],
    },
    "Warlock": {
        "Specialisation": "Magic",
        "Attributes": ["Luck", "Willpower"],
        "Major Skills": ["Destruction", "Illusion", "Short Blade", "Light Armor", "Restoration"],
    },
    "Wise Woman": {
        "Specialisation": "Magic",
        "Attributes": ["Willpower", "Personality"],
        "Major Skills": ["Restoration", "Mysticism", "Alteration", "Hand-to-Hand", "Speechcraft"],
    },
    "Witch": {
        "Specialisation": "Magic",
        "Attributes": ["Luck", "Willpower"],
        "Major Skills": ["Mysticism", "Illusion", "Conjuration", "Unarmored", "Short Blade"],
    },
}

const factionDetails = {
    "Imperial Faction": {
        "Fighters Guild": {
            "Attributes": ["Strength", "Endurance"],
            "Skills": ["Axe", "Long Blade", "Blunt Weapon", "Heavy Armor", "Armorer", "Block"]
        },
        "Mages Guild": {
            "Attributes": ["Intelligence", "Willpower"],
            "Skills": ["Alchemy", "Mysticism", "Illusion", "Alteration", "Destruction", "Enchant"]
        },
        "Imperial Legion": {
            "Attributes": ["Endurance", "Personality"],
            "Skills": ["Athletics", "Spear", "Long Blade", "Blunt Weapon", "Heavy Armor", "Block"]
        },
        "Thieves Guild": {
            "Attributes": ["Agility", "Personality"],
            "Skills": ["Marksman", "Short Blade", "Light Armor", "Acrobatics", "Sneak", "Security"]
        },
    },
    "Great House": {
        "House Hlaalu": {
            "Attributes": ["Speed", "Agility"],
            "Skills": ["Speechcraft", "Mercantile", "Marksman", "Short Blade", "Light Armor", "Security"]
        },
        "House Redoran": {
            "Attributes": ["Endurance", "Strength"],
            "Skills": ["Athletics", "Spear", "Long Blade", "Heavy Armor", "Medium Armor", "Armorer"]
        },
        "House Tevanni": {
            "Attributes": ["Willpower", "Intelligence"],
            "Skills": ["Mysticism", "Conjuration", "Illusion", "Alteration", "Destruction", "Enchant"]
        },
    },
    "Religious Faction": {
        "Tribunal Temple": {
            "Attributes": ["Intelligence", "Personality"],
            "Skills": ["Alchemy", "Blunt Weapon", "Conjuration", "Mysticism", "Restoration", "Unarmored"]
        },
        "Imperial Cult": {
            "Attributes": ["Personality", "Willpower"],
            "Skills": ["Speechcraft", "Unarmored", "Restoration", "Mysticism", "Conjuration", "Enchant", "Blunt Weapon"]
        },
    },
    "Native Faction": {
        "Morag Tong": {
            "Attributes": ["Speed", "Agility"],
            "Skills": ["Acrobatics", "Illusion", "Marksman", "Light Armor", "Short Blade", "Sneak"]
        },
    },
    "Vampire Clan": {
        "Aundae Clan": {
            "Attributes": ["Willpower", "Intelligence"],
            "Skills": ["Acrobatics", "Unarmored", "Mysticism", "Conjuration", "Illusion", "Athletics"]
        },
        "Berne Clan": {
            "Attributes": ["Willpower", "Speed"],
            "Skills": ["Marksman", "Short Blade", "Acrobatics", "Sneak", "Unarmored", "Athletics"]
        },
        "Quarra Clan": {
            "Attributes": ["Willpower", "Intelligence"],
            "Skills": ["Hand-to-hand", "Acrobatics", "Unarmored", "Destruction", "Athletics", "Long Blade"]
        },
    }
}

export function getBestFactionFit(factionType, characterClass, allowMultiple = false) {
    return pickBestFactions(factionDetails[factionType], characterClass, allowMultiple);
}

function pickBestFactions(factions, characterClass, allowMultiple) {
    const threshold = 2;
    let details = classDetails[characterClass];

    let best = []
    for (var i = 0; i < Object.keys(factions).length; i++) {
        let faction = factions[Object.keys(factions)[i]];

        var similarity = 0;
        similarity += getSimilarity(faction["Attributes"], details["Attributes"]);
        similarity += getSimilarity(faction["Skills"], details["Major Skills"]);
        //similarity += getSimilarity(faction["Skills"], details["Minor Skills"]);

        if (similarity >= threshold) {
            if (allowMultiple) {
                best.push(Object.keys(factions)[i]);
            } else {
                best = [Object.keys(factions)[i]]
            }
        }
    }
    return best;
}

function getSimilarity(a, b) {
    var similarity = 0;
    for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i])) similarity++;
    }
    return similarity;
}