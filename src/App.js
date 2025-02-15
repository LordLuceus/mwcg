import React, { useEffect, useState } from "react";
import { generateBackstory } from "./Backgrounds";
import { generateName } from "./NameGenerator";
import { getBestFactionFit } from "./SkillFacts";
import { map, rand } from "./Utils";

import ReactTooltip from "react-tooltip";

import { IoMdLock, IoMdUnlock } from "react-icons/io";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function getIndefiniteArticle(word) {
  word = word.toLowerCase();
  if (
    word[0] == "a" ||
    word[0] == "e" ||
    word[0] == "i" ||
    word[0] == "o" ||
    word[0] == "u"
  ) {
    return "an";
  }
  return "a";
}

const currentYear = 427;

let genders = ["Female", "Male"];
let playerClasses = [
  "Acrobat",
  "Agent",
  "Archer",
  "Assassin",
  "Barbarian",
  "Bard",
  "Battlemage",
  "Crusader",
  "Healer",
  "Knight",
  "Mage",
  "Monk",
  "Nightblade",
  "Pilgrim",
  "Rogue",
  "Scout",
  "Sorcerer",
  "Spellsword",
  "Thief",
  "Warrior",
  "Witchhunter",
];
let npcClasses = [
  "Alchemist",
  "Apothecary",
  "Bookseller",
  "Buoyant Armiger",
  "Caravaner",
  "Champion",
  "Clothier",
  "Commoner",
  "Dreamer",
  "Drillmaster",
  "Enchanter",
  "Enforcer",
  "Farmer",
  "Gondolier",
  "Guard",
  "Guild Guide",
  "Herder",
  "Hunter",
  "Mabrigash",
  "Merchant",
  "Miner",
  "Necromancer",
  "Noble",
  "Ordinator",
  "Ordinator Guard",
  "Pauper",
  "Pawnbroker",
  "Priest",
  "Publican",
  "Savant",
  "Sharpshooter",
  "Shipmaster",
  "Smith",
  "Smuggler",
  "Trader",
  "Warlock",
  "Wise Woman",
  "Witch",
];
let races = [
  "Argonian",
  "Breton",
  "Dark Elf",
  "High Elf",
  "Imperial",
  "Khajiit",
  "Nord",
  "Orc",
  "Redguard",
  "Wood Elf",
];
let lifestyles = ["Royalty", "A Noble", "Well Off", "Poor", "Destitute"];
let birthsigns = [
  "Warrior",
  "Mage",
  "Thief",
  "Serpent",
  "Lady",
  "Steed",
  "Lord",
  "Apprentice",
  "Atronach",
  "Ritual",
  "Lover",
  "Shadow",
  "Tower",
];

let greatHouses = ["House Hlaalu", "House Redoran", "House Telvanni"];
let imperialFactions = [
  "Fighters Guild",
  "Mages Guild",
  "Imperial Legion",
  "Thieves Guild",
];
let religiousFactions = ["Imperial Cult", "Tribunal Temple"];
let morrowindFactions = ["Morag Tong"];
let vampireClans = ["Aundae Clan", "Berne Clan", "Quarra Clan"];

let drives = {
  Vigilant: "I desire to clear out every Daedric ruin in Vvardenfell.",
  Scholar: "I wish to collect one copy of every book I come across.",
  Collector: "I want to collect one of each material of my chosen weapon.",
  Exorcist:
    "I desire to rid the land of the supernatural by hunting down all ghosts, vampires, and lycanthropes.",
  "They light the way to freedom":
    "Seek out and complete the Twin Lamps quests.",
  Daedrologist:
    "Complete at least one daedric quest and gain the prince's artefact.",
  "Sixth House Cultist":
    "I wish to explore every sixth house shrine I find and leave ash statues everywhere I visit.",
  "Dwemer Scholar":
    "I am obsessed with the Dwemer, explore every Dwemer ruin and primarily use Dwemer equipment.",
};
let ideals = {
  Honest:
    "I never steal, and I never haggle a merchant below their initial price.",
  Virtuous: "I always agree to help people when they ask.",
  Charitable: "I always give gold to paupers in the streets.",
  "Robin Hood": "I steal only from the richest nobles.",
  Abolitionist:
    "All slaves I come across must be freed, and their owners killed.",
  Dishonest: "I never buy anything; if I want something I steal it.",
  Religious:
    "I am a devout follower of a religion, I always leave offerings at temple shrines.",
  Pacifist: "I never start a fight, and only attack if my life is threatened.",
};
let flaws = {
  Hydrophobic:
    "I cannot swim or otherwise enter water, water walking is a must.",
  Kleptomaniac: "I must steal at least one thing per day.",
  Stubborn: "If caught committing a crime, I will always resist arrest.",
  Sentimental:
    "I never sell my old weapons and armour, but instead display them in my home base.",
  Bloodlust: "I must kill at least one living thing per day.",
  Alcoholic:
    "Once per day I must consume at least one of: Ancient Dagoth Brandy, Cyrodiilic Brandy, Flin, Greef, Mazte, Nord Mead, Shein, Sujamma, or Vintage Brandy.",
  Sugartooth:
    "Once per day I must consume at least one skooma or moon sugar, and I must be in possession of a skooma pipe at all times.",
  Prejudiced: "I can only trade with NPCs of my own race.",
  Outlaw: "Begin the game with a 500 gold bounty.",
};

let classSpecificTraits = {
  Witchhunter: {
    Exorcist:
      "I desire to rid the land of the supernatural by hunting down all ghosts, vampires, and lycanthropes.",
  },
  Dreamer: {
    Dreamer:
      "I am a dreamer, strip naked and wield a chitin club. Purge the outlander n'wah from the land!",
  },
  Trader: {
    "Pack Merchant":
      "Acquire goods in town and sell them for a profit in the next.",
  },
  Merchant: {
    "Pack Merchant":
      "Acquire goods in town and sell them for a profit in the next.",
  },
  Caravaner: {
    "Pack Merchant":
      "Acquire goods in town and sell them for a profit in the next.",
  },
  Bookseller: {
    "Pack Merchant":
      "Acquire goods in town and sell them for a profit in the next.",
  },
  "Buoyant Armiger": {
    "Buoyant Armiger":
      "I am a Buoyant Armiger. I must acquire a full set of glass armour then charge straight into Ghostgate and kill everything within.",
  },
  Ordinator: {
    Ordinator:
      "I am an Ordinator. I must acquire a set of Indoril Armor, Expensive Pants, and an Ebony Mace and purge the lawless scum from the land.",
  },
  "Ordinator Guard": {
    Ordinator:
      "I am an Ordinator. I must acquire a set of Indoril Armor, Expensive Pants, and an Ebony Mace and purge the lawless scum from the land.",
  },
};

let backgroundSpecificTraits = {
  "A Noble": {
    Snooty:
      "I won't talk to anyone wearing common clothing or basic armour (iron, leather).",
    "High Standards": "I refuse to rest anywhere that isn't a comfy bed",
  },
  Royalty: {
    Snooty:
      "I won't talk to anyone wearing common clothing or basic armour (iron, leather).",
    "High Standards": "I refuse to rest anywhere that isn't a comfy bed",
  },
};

let maxLifespan = {
  Argonian: 80,
  Breton: 120,
  "Dark Elf": 400,
  "High Elf": 400,
  Imperial: 80,
  Khajiit: 80,
  Nord: 80,
  Orc: 80,
  Redguard: 80,
  "Wood Elf": 400,
};

const hometowns = {
  Argonian: [
    "Archon",
    "Blackrose",
    "Gideon",
    "Helstrom",
    "Lilmoth",
    "Soulrest",
    "Stormhold",
    "Thorn",
  ],
  Breton: [
    "Daggerfall",
    "Camlorn",
    "Shornhelm",
    "Wayrest",
    "Northpoint",
    "Evermore",
    "Jehanna",
    "Farrun",
  ],
  "Dark Elf": [
    "Blacklight",
    "Narsis",
    "Tear",
    "Mournhold",
    "Necrom",
    "Cheydinhal",
  ],
  "High Elf": [
    "Lillandril",
    "Cloudrest",
    "Shimmerene",
    "Firsthold",
    "Skywatch",
    "Alinor",
    "Sunhold",
    "Dusk",
  ],
  Imperial: [
    "Anvil",
    "Chorrol",
    "Bruma",
    "Cheydinhal",
    "The Imperial City",
    "Leyawiin",
    "Bravil",
    "Skingrad",
    "Kvatch",
  ],
  Khajiit: [
    "Riverhold",
    "Dune",
    "Rimmen",
    "Orcrest",
    "Corinthe",
    "Torval",
    "Senchal",
  ],
  Nord: [
    "Solitude",
    "Morthal",
    "Winterhold",
    "Dawnstar",
    "Markarth",
    "Riften",
    "Whiterun",
    "Windhelm",
    "Bruma",
  ],
  Orc: ["an Orcish stronghold", "Orsinium"],
  Redguard: [
    "Hegathe",
    "Sentinel",
    "Skaven",
    "Dragonstar",
    "Elinhir",
    "Taneth",
    "Rihad",
    "Gilane",
    "Hew's Bane",
    "Stros M'Kai",
  ],
  "Wood Elf": [
    "Arenthia",
    "Falinesti",
    "Silvenar",
    "Woodhearth",
    "Greenheart",
    "Elden Root",
    "Southpoint",
    "Haven",
  ],
};

function generateAge(race) {
  let x = Math.random();
  return Math.floor(
    map(0, 1, maxLifespan[race] * 0.25, maxLifespan[race] * 0.9, x * x)
  );
}

function describeParents(parents) {
  if (!parents.knewParents) {
    return "I never knew who my parents were.";
  }
  let text = ` My father was ${parents.father}, ${getIndefiniteArticle(
    parents.fatherClass
  )} ${parents.fatherClass}; and my mother was ${
    parents.mother
  }, ${getIndefiniteArticle(parents.motherClass)} ${parents.motherClass}.`;
  return text;
}

function buildDescription(data) {
  return (
    <div>
      <p>
        I am {data.name}, a {data.gender.toLowerCase()} {data.race}{" "}
        {data.characterClass.toLowerCase()}. I was born in {data.hometown} under
        the sign of The {data.birthsign} in the year 3E
        {currentYear - data.age}, making me {data.age} years old at the start of
        the game. I was {data.lifestyle.toLowerCase()} before being arrested and
        sent to Vvardenfell.
      </p>
      <p>{describeParents(data.parents)}</p>
      <p>
        {data.familyAndFriends} {data.lifeEvents}
      </p>
    </div>
  );
}

function generateFactions(characterClass, isVampire, buildSensibleCharacters) {
  let factions = {};

  if (buildSensibleCharacters) {
    factions["Imperial Faction"] = getBestFactionFit(
      "Imperial Faction",
      characterClass,
      true
    );
    factions["Great House"] = getBestFactionFit("Great House", characterClass);
    factions["Native Faction"] = getBestFactionFit(
      "Native Faction",
      characterClass
    );

    //TODO isReligious
    factions["Religious Faction"] = getBestFactionFit(
      "Religious Faction",
      characterClass
    );
    if (isVampire)
      factions["Vampire Clan"] = getBestFactionFit(
        "Vampire Clan",
        characterClass
      );

    return factions;
  }

  if (Math.random() > 0.2)
    factions["Imperial Faction"] = [rand(imperialFactions)];
  if (Math.random() > 0.7)
    factions["Native Faction"] = [rand(morrowindFactions)];
  if (Math.random() > 0.2)
    factions["Religious Faction"] = [rand(religiousFactions)];
  if (Math.random() > 0.2) factions["Great House"] = [rand(greatHouses)];
  if (isVampire) factions["Vampire Clan"] = [rand(vampireClans)];
  return factions;
}

//Not the cleanest way since will have to add all mutally exclusive combos but for now it's manageable
function removeMutallyExclusiveTraits(drives, ideals, flaws, characterClass) {
  if (characterClass == "Thief" || characterClass == "Rogue") {
    delete ideals["Honest"];
  }

  if (ideals["Honest"] && flaws["Kleptomaniac"]) {
    Math.random() > 0.5
      ? delete ideals["Honest"]
      : delete flaws["Kleptomaniac"];
  }

  if (ideals["Honest"] && ideals["Dishonest"]) {
    Math.random() > 0.5 ? delete ideals["Honest"] : delete ideals["Dishonest"];
  }

  if (ideals["Pacifist"] && flaws["Bloodlust"]) {
    Math.random() > 0.5 ? delete ideals["Pacifist"] : delete flaws["Bloodlust"];
  }

  if (ideals["Pacifist"] && flaws["Psychopath"]) {
    Math.random() > 0.5
      ? delete ideals["Pacifist"]
      : delete flaws["Psychopath"];
  }

  return [drives, ideals, flaws];
}

function generateTraits(
  characterClass,
  dict,
  addClassSpecific = false,
  addBackgroundSpecific = false,
  background = null
) {
  let traits = {};
  let count = Math.random() > 0.65 ? 2 : 1;

  for (var i = 0; i < count; i++) {
    let key =
      Object.keys(dict)[Math.floor(Math.random() * Object.keys(dict).length)];
    let trait = dict[key];
    traits[key] = trait;
  }

  if (addClassSpecific) {
    traits = Object.assign({}, classSpecificTraits[characterClass], traits);
  }

  if (
    addBackgroundSpecific &&
    backgroundSpecificTraits[background] &&
    Math.random() > 0.5
  ) {
    let k = rand(Object.keys(backgroundSpecificTraits[background]));
    let v = backgroundSpecificTraits[background][k];
    var obj = {};
    obj[k] = v;
    traits = Object.assign({}, obj, traits);
  }

  return traits;
}

export default function Creator() {
  const [data, setData] = useState();
  const [useNpcClasses, setNpcClassesChecked] = useState(false);
  const [buildSensibleCharacters, setSensibleCharsChecked] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("darkMode");
    const initialValue = saved === "dark";
    return initialValue;
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem("darkMode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const { height, width } = useWindowDimensions();
  const [tooltip, showTooltip] = useState(true);

  const [nameLocked, lockName] = useState(false);
  const [genderLocked, lockGender] = useState(false);
  const [raceLocked, lockRace] = useState(false);
  const [classLocked, lockClass] = useState(false);
  const [birthsignLocked, lockBirthsign] = useState(false);
  const [mqLocked, lockMQ] = useState(false);
  const [occultLocked, lockOccult] = useState(false);
  const [factionsLocked, lockFactions] = useState(false);
  const [drivesLocked, lockDrives] = useState(false);
  const [idealsLocked, lockIdeals] = useState(false);
  const [flawsLocked, lockFlaws] = useState(false);

  const handleOnChangeNpcClasses = () => {
    setNpcClassesChecked(!useNpcClasses);
  };
  const handleOnChangeSensibleChars = () => {
    setSensibleCharsChecked(!buildSensibleCharacters);
  };
  const handleOnChangeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  function generateParents(knewParents, race, name) {
    let guardianRace = rand(races);
    let guardianGender = rand(genders);
    let guardian = generateName(guardianRace, guardianGender);
    let guardianClass = rand(npcClasses.concat(playerClasses));

    if (!knewParents) {
      return {
        knewParents: false,
        guardian: guardian,
        guardianGender: guardianGender,
        guardianRace: guardianRace,
        guardianClass: guardianClass,
      };
    }

    let father = generateName(race, "Male");
    let mother = generateName(race, "Female");

    if (race === "Imperial" || race === "Dark Elf" || race === "Breton") {
      let surname = name.split(" ")[1];

      father = father.split(" ")[0] + " " + surname;
      mother = mother.split(" ")[0] + " " + surname;
    }
    if (race === "Orc") {
      let surname = name.split(" ")[1];
      let clanName = surname.split("-")[1];

      father = father.split(" ")[0] + " Gro-" + clanName;
      mother = mother.split(" ")[0] + " Gra-" + clanName;
    }

    let fatherClass = rand(npcClasses.concat(playerClasses));
    let motherClass = rand(npcClasses.concat(playerClasses));

    if (race != "Dark Elf") {
      while (
        fatherClass === "Dreamer" ||
        fatherClass === "Ordinator" ||
        fatherClass === "Ordinator Guard" ||
        fatherClass === "Wise Woman" ||
        fatherClass === "Mabrigash"
      ) {
        fatherClass = rand(npcClasses.concat(playerClasses));
      }
      while (
        motherClass === "Dreamer" ||
        motherClass === "Ordinator" ||
        motherClass === "Ordinator Guard" ||
        motherClass === "Wise Woman" ||
        motherClass === "Mabrigash"
      ) {
        motherClass = rand(npcClasses.concat(playerClasses));
      }
    }

    return {
      knewParents: true,
      father: father,
      fatherClass: fatherClass,
      mother: mother,
      motherClass: motherClass,
      guardian: guardian,
      guardianGender: guardianGender,
      guardianRace: guardianRace,
      guardianClass: guardianClass,
    };
  }

  function familyAndFriends(playerClass, parents, lifestyle) {
    if (!parents.knewParents) {
      switch (lifestyle) {
        case "Destitute":
        case "Poor":
          return Math.random() > 0.5
            ? `Having nowhere to go, I was raised in the streets, looked after by ${parents.guardian}, a ${parents.guardianGender} ${parents.guardianRace} ${playerClass} from whom I learnt everything I know.`
            : "I was raised in an orphanage in the city.";
        case "Well Off":
          return "I was raised in an orphanage in the city.";
      }
    }
  }

  function generateRandomCharacter() {
    const race = data && raceLocked ? data.race : rand(races);
    const gender = data && genderLocked ? data.gender : rand(genders);
    const characterClass =
      data && classLocked
        ? data.characterClass
        : useNpcClasses
        ? rand(playerClasses.concat(npcClasses))
        : rand(playerClasses);

    const name =
      data && nameLocked
        ? data.name
        : generateName(race, gender, characterClass);

    const age = generateAge(race);

    const lifestyle = rand(lifestyles);
    const birthsign =
      data && birthsignLocked ? data.birthsign : rand(birthsigns);

    const isNerevarine =
      data && mqLocked ? data.isNerevarine : Math.random() > 0.5;
    const isVampire =
      data && occultLocked ? data.isVampire : Math.random() > 0.95;
    const isWerewolf =
      data && occultLocked
        ? data.isWerewolf
        : !isVampire && Math.random() > 0.95;

    const factions =
      data && factionsLocked
        ? data.factions
        : generateFactions(characterClass, isVampire, buildSensibleCharacters);

    let characterDrives =
      data && drivesLocked
        ? data.drives
        : generateTraits(characterClass, drives, true);
    let characterIdeals =
      data && idealsLocked
        ? data.ideals
        : generateTraits(characterClass, ideals);
    let characterFlaws =
      data && flawsLocked
        ? data.flaws
        : generateTraits(characterClass, flaws, false, true, lifestyle);

    let native = Math.random() > 0.15;
    let hometown;
    if (native) {
      hometown = rand(hometowns[race]);
    } else {
      hometown = rand(hometowns[rand(Object.keys(hometowns))]);
    }

    let knewParents =
      lifestyle === "A Noble" ||
      lifestyle === "Royalty" ||
      Math.random() > 0.05;
    let parents = generateParents(knewParents, race, name);

    //No idea if js is pbv or pbr so this should do the trick
    let sanitised = removeMutallyExclusiveTraits(
      characterDrives,
      characterIdeals,
      characterFlaws,
      characterClass
    );
    characterDrives = sanitised[0];
    characterIdeals = sanitised[1];
    characterFlaws = sanitised[2];

    setData({
      name: name,
      gender: gender,
      characterClass: characterClass,
      race: race,
      lifestyle: lifestyle,
      birthsign: birthsign,

      age: age,
      factions: factions,

      isNerevarine: isNerevarine,
      isVampire: isVampire,
      isWerewolf: isWerewolf,

      drives: characterDrives,
      ideals: characterIdeals,
      flaws: characterFlaws,

      hometown: hometown,
      parents: parents,
      familyAndFriends: familyAndFriends(characterClass, parents, lifestyle),
      lifeEvents: generateBackstory(characterClass, age, lifestyle),
    });
  }

  return (
    <div
      style={{
        alignItems: "normal",
        textAlign: "center",
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        fontSize: "calc(10px + 2vmin)",
        justifyContent: "top",
        minHeight: "100vh",
        padding: "20px 8px",
        backgroundColor: darkMode ? "#121212" : "#FBEFD5",
      }}
    >
      <div
        style={{
          //TODO: Jank fix to center content on larger screens but left align on mobile (dependant on width of children)
          marginLeft: "max(calc(40% - 635px), 0px)",
          marginRight: "max(calc(40% - 635px), 0px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={generateRandomCharacter}
          style={{
            padding: "8px 20px",
            marginBottom: 20,
            backgroundColor: darkMode ? "#1F1B24" : "#F5DEB3",
            color: darkMode ? "white" : "black",
            outline: "rgba(0,0,0,0.5) solid 3px",
            marginLeft: "max(calc(60% - 635px), 0px)",
            marginRight: "max(calc(60% - 635px), 0px)",
            borderRadius: 100,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          GENERATE NEW CHARACTER
        </button>
        <div
          style={{
            padding: "8px 20px",
            marginBottom: 20,
            backgroundColor: darkMode ? "#1F1B24" : "#F5DEB3",
            color: darkMode ? "white" : "black",
            outline: "rgba(0,0,0,0.5) solid 3px",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 1.5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: width <= 800 ? "row" : "row",
              alignItems: "start",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <input
              type="checkbox"
              id="npcClasses"
              name="npcClasses"
              value="npcClasses"
              checked={useNpcClasses}
              onChange={handleOnChangeNpcClasses}
            />
            Use NPC Classes
            {tooltip && <ReactTooltip effect="solid" />}
            <div
              data-tip="Attempts to match up factions with your character's class"
              onMouseEnter={() => {
                showTooltip(true);
              }}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 50);
              }}
            >
              <input
                type="checkbox"
                id="sensibleChars"
                name="sensibleChars"
                value="sensibleChars"
                checked={buildSensibleCharacters}
                onChange={handleOnChangeSensibleChars}
              />
              Sensible Characters
            </div>
            <div>
              {" "}
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                value="darkMode"
                checked={darkMode}
                onChange={handleOnChangeDarkMode}
              />
              Dark Mode
            </div>
          </div>
        </div>
        <br />
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: width <= 800 ? "row" : "column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: width <= 800 ? "column" : "row",
                alignItems: "start",
                width: width <= 800 ? "170px" : "100%",
                alignItems: "stretch",
              }}
            >
              <StatCard
                title={"name"}
                value={data.name}
                onToggle={lockName}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"gender"}
                options={genders}
                value={data.gender}
                onToggle={lockGender}
                onChange={(selection) => {
                  data.gender = selection.value;
                }}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"race"}
                options={races}
                value={data.race}
                onToggle={lockRace}
                onChange={(selection) => {
                  data.race = selection.value;
                }}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"class"}
                options={playerClasses.concat(npcClasses)}
                value={data.characterClass}
                onToggle={lockClass}
                onChange={(selection) => {
                  data.class = selection.value;
                }}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"birthsign"}
                options={birthsigns}
                value={data.birthsign}
                onToggle={lockBirthsign}
                onChange={(selection) => {
                  data.birthsign = selection.value;
                }}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"nerevarine"}
                options={["Yes", "No"]}
                value={data.isNerevarine ? "Yes" : "No"}
                onToggle={lockMQ}
                onChange={(selection) => {
                  data.isNerevarine = selection.value;
                }}
                darkMode={darkMode}
              />
              <LockableDropdownStatCard
                title={"occult"}
                options={["None", "Vampire", "Werewolf"]}
                value={
                  data.isVampire
                    ? "Vampire"
                    : data.isWerewolf
                    ? "Werewolf"
                    : "None"
                }
                onToggle={lockOccult}
                onChange={(selection) => {
                  data.isVampire = selection.value == "Vampire";
                  data.isWerewolf = selection.value == "Werewolf";
                }}
                darkMode={darkMode}
              />
            </div>
            <div
              style={{
                // width: '60%',
                width: "100%",
                // minWidth: 700,
                // minWidth: 480,
              }}
            >
              <StatCard
                title={`Bio`}
                value={buildDescription(data)}
                centerText={false}
                darkMode={darkMode}
              />
              <LockableStatCard
                title={`Factions`}
                value={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: width <= 800 ? "column" : "row",
                      alignItems: "start",
                    }}
                  >
                    {Object.keys(data.factions).map(function (title, i) {
                      return (
                        data.factions[title].length > 0 &&
                        Object.keys(data.factions[title]).map(function (
                          faction,
                          j
                        ) {
                          return (
                            <StatCard
                              title={title}
                              value={data.factions[title][faction]}
                              nested={true}
                              darkMode={darkMode}
                            />
                          );
                        })
                      );
                    })}
                  </div>
                }
                onToggle={lockFactions}
                centerText={false}
                darkMode={darkMode}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: width <= 800 ? "column" : "row",
                  alignItems: "start",
                }}
                darkMode={darkMode}
              >
                <LockableStatCard
                  title={`Drives`}
                  value={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      {Object.keys(data.drives).map(function (key, i) {
                        return (
                          <StatCard
                            title={key}
                            value={data.drives[key]}
                            nested={true}
                            darkMode={darkMode}
                          />
                        );
                      })}
                    </div>
                  }
                  onToggle={lockDrives}
                  darkMode={darkMode}
                />
                <LockableStatCard
                  title={`Ideals`}
                  value={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      {Object.keys(data.ideals).map(function (key, i) {
                        return (
                          <StatCard
                            title={key}
                            value={data.ideals[key]}
                            nested={true}
                            darkMode={darkMode}
                          />
                        );
                      })}
                    </div>
                  }
                  onToggle={lockIdeals}
                  darkMode={darkMode}
                />
                <LockableStatCard
                  title={`Flaws`}
                  value={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      {Object.keys(data.flaws).map(function (key, i) {
                        return (
                          <StatCard
                            title={key}
                            value={data.flaws[key]}
                            nested={true}
                            darkMode={darkMode}
                          />
                        );
                      })}
                    </div>
                  }
                  onToggle={lockFlaws}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO These should all be components in some sort of hierarchy

function StatCard({
  title,
  value,
  centerText = true,
  nested = false,
  darkMode = false,
}) {
  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: "calc(100% - 50px)",
        backgroundColor: nested
          ? darkMode
            ? "#332940"
            : "#EFE1BC"
          : darkMode
          ? "#1F1B24"
          : "#F5DEB3",
        color: darkMode ? "white" : "black",
        outline: "rgba(0,0,0,0.5) solid 3px",
        borderRadius: 10,
        textAlign: centerText ? "center" : "left",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function LockableStatCard({
  title,
  value,
  centerText = true,
  nested = false,
  onToggle = () => {},
  darkMode = false,
}) {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: "calc(100% - 50px)",
        backgroundColor: nested
          ? darkMode
            ? "#332940"
            : "#EFE1BC"
          : darkMode
          ? "#1F1B24"
          : "#F5DEB3",
        color: darkMode ? "white" : "black",
        outline: "rgba(0,0,0,0.5) solid 3px",
        borderRadius: 10,
        textAlign: centerText ? "center" : "left",
        position: "relative",
      }}
    >
      <button
        aria-label={isLocked ? `${title} locked` : `${title} unlocked`}
        onClick={() => {
          setIsLocked(!isLocked);
        }}
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          outline: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 1.5,
          position: "absolute",
          top: "0px",
          right: "-5px",
        }}
      >
        {onToggle(isLocked)}
        {isLocked ? (
          <IoMdLock color={darkMode ? "white" : "black"} />
        ) : (
          <IoMdUnlock color={darkMode ? "white" : "black"} />
        )}
      </button>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function LockableDropdownStatCard({
  title,
  value,
  centerText = true,
  nested = false,
  options = [],
  onToggle = () => {},
  onChange = () => {},
  darkMode = false,
}) {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: "calc(100% - 50px)",
        backgroundColor: nested
          ? darkMode
            ? "#332940"
            : "#EFE1BC"
          : darkMode
          ? "#1F1B24"
          : "#F5DEB3",
        color: darkMode ? "white" : "black",
        outline: "rgba(0,0,0,0.5) solid 3px",
        borderRadius: 10,
        textAlign: centerText ? "center" : "left",
        position: "relative",
      }}
    >
      <button
        aria-label={isLocked ? `${title} locked` : `${title} unlocked`}
        onClick={() => {
          setIsLocked(!isLocked);
        }}
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          outline: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 1.5,
          position: "absolute",
          top: "0px",
          right: "-5px",
        }}
      >
        {onToggle(isLocked)}
        {isLocked ? (
          <IoMdLock color={darkMode ? "white" : "black"} />
        ) : (
          <IoMdUnlock color={darkMode ? "white" : "black"} />
        )}
      </button>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>
        {
          <Dropdown
            options={options}
            onChange={(selection) => {
              onChange(selection);
              setIsLocked(true);
            }}
            value={value}
          />
        }
      </div>
    </div>
  );
}
