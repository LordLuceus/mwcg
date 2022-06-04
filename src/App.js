import React, { useState, useEffect, Component } from 'react';
import { generateName } from './NameGenerator';
import { getBestFactionFit } from './SkillFacts'
import { generateBackstory } from './Backgrounds'
import { rand, map } from './Utils'
import ReactTooltip from 'react-tooltip';
import { IoMdLock, IoMdUnlock } from 'react-icons/io';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function getIndefiniteArticle(word) {
  word = word.toLowerCase();
  if (word[0] == 'a' ||
    word[0] == 'e' ||
    word[0] == 'i' ||
    word[0] == 'o' ||
    word[0] == 'u') {
    return "an";
  }
  return "a";
}

const currentYear = 427;

let genders = ["Female", "Male"];
let playerClasses = ["Acrobat", "Agent", "Archer", "Assassin", "Barbarian", "Bard", "Battlemage", "Crusader", "Healer", "Knight", "Mage", "Monk", "Nightblade", "Pilgrim", "Rogue", "Scout", "Sorcerer", "Spellsword", "Thief", "Warrior", "Witchhunter"];
let npcClasses = ["Alchemist", "Apothecary", "Bookseller", "Buoyant Armiger", "Caravaner", "Champion", "Clothier", "Commoner", "Dreamer", "Drillmaster", "Enchanter", "Enforcer", "Farmer", "Gondolier", "Guard", "Guild Guide", "Herder", "Hunter", "Mabrigash", "Merchant", "Miner", "Necromancer", "Noble", "Ordinator", "Ordinator Guard", "Pauper", "Pawnbroker", "Priest", "Publican", "Savant", "Sharpshooter", "Shipmaster", "Smith", "Smuggler", "Trader", "Warlock", "Wise Woman", "Witch"];
let races = ["Argonian", "Breton", "Dark Elf", "High Elf", "Imperial", "Khajiit", "Nord", "Orc", "Redguard", "Wood Elf"]
let lifestyles = ["Royalty", "A Noble", "Well Off", "Poor", "Destitute"]
let birthsigns = ["Warrior", "Mage", "Thief", "Serpent", "Lady", "Steed", "Lord", "Apprentice", "Atronach", "Ritual", "Lover", "Shadow", "Tower"]

let greatHouses = ["House Hlaalu", "House Redoran", "House Telvanni"];
let imperialFactions = ["Fighters Guild", "Mages Guild", "Imperial Legion", "Thieves Guild"];
let religiousFactions = ["Imperial Cult", "Tribunal Temple"]
let morrowindFactions = ["Morag Tong"];
let vampireClans = ["Aundae Clan", "Berne Clan", "Quarra Clan"]

let drives = {
  "Vigilant": "You desire to clear out every Daedric ruin in Vvardenfell.",
  "Scholar": "You wish to collect one copy of every book you come across.",
  "Collector": "You want to collect one of each material of your chosen weapon.",
  "Exorcist": "You desire to rid the land of the supernatural by hunting down all ghosts, vampires, and lycanthropes.",
  "They light the way to freedom": "Seek out and complete the Twin Lamps quests.",
  "Hobbyist": "You dabble in a side skill, train one of your miscellanious skills to 100.",
  "Imperialist": "Complete the Imperial Cult or Legion questlines, even if they are not in your factions list.",
  "Daedrologist": "Complete at least one daedric quest and gain the prince's artefact.",
  "Sixth House Cultist": "You wish to explore every sixth house shrine you find and leave ash statues everywhere you visit.",
  "Dwemer Scholar": "You are obsessed with the Dwemer, explore every Dwemer ruin and only use Dwemer equipment",
};
let ideals = {
  "Honest": "You never steal, and you never haggle a merchant below their initial price.",
  "Virtuous": "You always agree to help people when they ask.",
  "Charitable": "You always give gold to paupers in the streets.",
  "Robin Hood": "You steal only from the richest nobles.",
  "Abolitionist": "All slaves you come across must be freed, and their owners killed.",
  "Dishonest": "You never buy anything, if you want something you steal it.",
  "Religious": "You are a devout follower of a religion, you always leave offerings at temple shrines.",
  "Pacifist": "You never start a fight, and only attack if your life is threatened."
};
let flaws = {
  "Hydrophobic": "You cannot swim or otherwise enter water, water walking is a must.",
  "Kleptomaniac": "You must steal at least one thing per day.",
  "Stubborn": "If caught committing a crime, you will always resist arrest.",
  "Sentimental": "You never sell your old weapons and armour, but instead display them in your home base.",
  "Bloodlust": "You must kill at least one living thing per day.",
  "Alcoholic": "Once per day you must consume at least one of: Ancient Dagoth Brandy, Cyrodiilic Brandy, Flin, Greef, Mazte, Nord Mead, Shein, Sujamma, or Vintage Brandy.",
  "Sugartooth": "Once per day you must consume at least one skooma or moon sugar, and you must be in possession of a skooma pipe at all times.",
  "Prejudiced": "You can only trade with NPCs of your own race.",
  "Outlaw": "Begin the game with a 500 gold bounty. (SetPCCrimeLevel 500)",
};

let classSpecificTraits = {
  "Witchhunter": { "Exorcist": "You desire to rid the land of the supernatural by hunting down all ghosts, vampires, and lycanthropes." },
  "Dreamer": { "Dreamer": "You are a dreamer, strip naked and wield a chitin club. Purge the outlander n'wah from the land." },
  "Trader": { "Pack Merchant": "Acquire goods in town and sell them for a profit in the next." },
  "Merchant": { "Pack Merchant": "Acquire goods in town and sell them for a profit in the next." },
  "Caravaner": { "Pack Merchant": "Acquire goods in town and sell them for a profit in the next." },
  "Bookseller": { "Pack Merchant": "Acquire goods in town and sell them for a profit in the next." },
  "Buoyant Armiger": { "Buoyant Armiger": "You're a Buoyant Armiger, acquire a full set of glass armour then charge straight into Ghostgate, kill everything within." },
  "Ordinator": { "Ordinator": "You're an Ordinator, acquire a set of Indoril Armor, Expensive Pants, and an Ebony Mace and purge the lawless scum from the land." },
  "Ordinator Guard": { "Ordinator": "You're an Ordinator, acquire a set of Indoril Armor, Expensive Pants, and an Ebony Mace and purge the lawless scum from the land." },
}

let backgroundSpecificTraits = {
  "A Noble": {
    "Snooty": "You won't talk to anyone wearing common clothing or basic armour (iron, leather).",
    "High Standards": "You refuse to rest anywhere that isn't a comfy bed",
  },
  "Royalty": {
    "Snooty": "You won't talk to anyone wearing common clothing or basic armour (iron, leather).",
    "High Standards": "You refuse to rest anywhere that isn't a comfy bed",
  }
}

let maxLifespan = { "Argonian": 80, "Breton": 120, "Dark Elf": 400, "High Elf": 400, "Imperial": 80, "Khajiit": 80, "Nord": 80, "Orc": 80, "Redguard": 80, "Wood Elf": 400 };

const hometowns = {
  "Argonian": ["Archon", "Blackrose", "Gideon", "Helstrom", "Lilmoth", "Soulrest", "Stormhold", "Thorn"],
  "Breton": ["Daggerfall", "Camlorn", "Shornhelm", "Wayrest", "Northpoint", "Evermore", "Jehanna", "Farrun"],
  "Dark Elf": ["Blacklight", "Narsis", "Tear", "Mournhold", "Necrom", "Cheydinhal"],
  "High Elf": ["Lillandril", "Cloudrest", "Shimmerene", "Firsthold", "Skywatch", "Alinor", "Sunhold", "Dusk"],
  "Imperial": ["Anvil", "Chorrol", "Bruma", "Cheydinhal", "The Imperial City", "Leyawiin", "Bravil", "Skingrad", "Kvatch"],
  "Khajiit": ["Riverhold", "Dune", "Rimmen", "Orcrest", "Corinthe", "Torval", "Senchal"],
  "Nord": ["Solitude", "Morthal", "Winterhold", "Dawnstar", "Markarth", "Riften", "Whiterun", "Windhelm", "Bruma"],
  "Orc": ["an Orcish stronghold", "Orsinium"],
  "Redguard": ["Hegathe", "Sentinel", "Skaven", "Dragonstar", "Elinhir", "Taneth", "Rihad", "Gilane", "Hew's Bane", "Stros M'Kai"],
  "Wood Elf": ["Arenthia", "Falinesti", "Silvenar", "Woodhearth", "Greenheart", "Elden Root", "Southpoint", "Haven"],
}

function generateAge(race) {
  let x = Math.random();
  return Math.floor(map(0, 1, maxLifespan[race] * 0.25, maxLifespan[race] * 0.9, x * x))
}

function describeParents(parents) {
  if (!parents.knewParents) {
    return "You never knew who your parents were.";
  }
  let text = ` Your father was ${parents.father}, ${getIndefiniteArticle(parents.fatherClass)} ${parents.fatherClass}; and your mother was ${parents.mother}, ${getIndefiniteArticle(parents.motherClass)} ${parents.motherClass}.`;
  return text;
}

function buildDescription(data) {

  return <div>
    You are {data.name}, a {data.gender.toLowerCase()} {data.race} {data.characterClass.toLowerCase()}.
    You were born in {data.hometown} under the sign of The {data.birthsign} in the year 3E{currentYear - data.age}, making you {data.age} years old at the start of the game.
    You were {data.lifestyle.toLowerCase()} before being arrested and sent to Vvardenfell.
    <br /><br />
    {describeParents(data.parents)} {data.familyAndFriends} {data.lifeEvents}

  </div>
}

function generateFactions(characterClass, isVampire, buildSensibleCharacters) {
  let factions = {};

  if (buildSensibleCharacters) {

    factions["Imperial Faction"] = getBestFactionFit("Imperial Faction", characterClass, true);
    factions["Great House"] = getBestFactionFit("Great House", characterClass);
    factions["Native Faction"] = getBestFactionFit("Native Faction", characterClass);

    //TODO isReligious
    factions["Religious Faction"] = getBestFactionFit("Religious Faction", characterClass);
    if (isVampire) factions["Vampire Clan"] = getBestFactionFit("Vampire Clan", characterClass);

    return factions;
  }

  if (Math.random() > 0.2) factions["Imperial Faction"] = [rand(imperialFactions)];
  if (Math.random() > 0.7) factions["Native Faction"] = [rand(morrowindFactions)];
  if (Math.random() > 0.2) factions["Religious Faction"] = [rand(religiousFactions)];
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
    Math.random() > 0.5 ? delete ideals["Honest"] : delete flaws["Kleptomaniac"];
  }

  if (ideals["Honest"] && ideals["Dishonest"]) {
    Math.random() > 0.5 ? delete ideals["Honest"] : delete ideals["Dishonest"];
  }

  if (ideals["Pacifist"] && flaws["Bloodlust"]) {
    Math.random() > 0.5 ? delete ideals["Pacifist"] : delete flaws["Bloodlust"];
  }

  if (ideals["Pacifist"] && flaws["Psychopath"]) {
    Math.random() > 0.5 ? delete ideals["Pacifist"] : delete flaws["Psychopath"];
  }

  return [drives, ideals, flaws];
}

function generateTraits(characterClass, dict, addClassSpecific = false, addBackgroundSpecific = false, background = null) {
  let traits = {};
  let count = Math.random() > 0.65 ? 2 : 1;

  for (var i = 0; i < count; i++) {
    let key = Object.keys(dict)[Math.floor(Math.random() * Object.keys(dict).length)];
    let trait = dict[key];
    traits[key] = trait;
  }

  if (addClassSpecific) {
    traits = Object.assign({}, classSpecificTraits[characterClass], traits);
  }

  if (addBackgroundSpecific && backgroundSpecificTraits[background] && Math.random() > 0.5) {
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

  const handleOnChangeNpcClasses = () => {
    setNpcClassesChecked(!useNpcClasses);
  };
  const handleOnChangeSensibleChars = () => {
    setSensibleCharsChecked(!buildSensibleCharacters);
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
      while (fatherClass === "Dreamer" || fatherClass === "Ordinator" || fatherClass === "Ordinator Guard" || fatherClass === "Wise Woman" || fatherClass === "Mabrigash") {
        fatherClass = rand(npcClasses.concat(playerClasses));
      }
      while (motherClass === "Dreamer" || motherClass === "Ordinator" || motherClass === "Ordinator Guard" || motherClass === "Wise Woman" || motherClass === "Mabrigash") {
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
          return Math.random() > 0.5 ? `Having nowhere to go, you were raised in the streets, looked after by ${parents.guardian}, a ${parents.guardianGender} ${parents.guardianRace} ${playerClass} from whom you learnt everything you know.`
            : "You were raised in an orphanage in the city.";
        case "Well Off": return "You were raised in an orphanage in the city.";
      };
    }
  }

  function generateRandomCharacter() {

    const race = (data && raceLocked) ? data.race : rand(races);
    const gender = (data && genderLocked) ? data.gender : rand(genders);
    const characterClass = (data && classLocked) ? data.characterClass : useNpcClasses ? rand(playerClasses.concat(npcClasses)) : rand(playerClasses);

    const name = (data && nameLocked) ? data.name : generateName(race, gender, characterClass);

    const age = generateAge(race);

    const lifestyle = rand(lifestyles);
    const birthsign = (data && birthsignLocked) ? data.birthsign : rand(birthsigns);

    const isNerevarine = (data && mqLocked) ? data.isNerevarine : Math.random() > 0.5;
    const isVampire = (data && occultLocked) ? data.isVampire : Math.random() > 0.95;
    const isWerewolf = (data && occultLocked) ? data.isWerewolf : !isVampire && Math.random() > 0.95;

    const factions = (data && factionsLocked) ? data.factions : generateFactions(characterClass, isVampire, buildSensibleCharacters);

    let characterDrives = generateTraits(characterClass, drives, true);
    let characterIdeals = generateTraits(characterClass, ideals);
    let characterFlaws = generateTraits(characterClass, flaws, false, true, lifestyle);

    let native = Math.random() > 0.15;
    let hometown;
    if (native) {
      hometown = rand(hometowns[race]);
    } else {
      hometown = rand(hometowns[rand(Object.keys(hometowns))]);
    }

    let knewParents = lifestyle === "A Noble" || lifestyle === "Royalty" || Math.random() > 0.05;
    let parents = generateParents(knewParents, race, name);

    //No idea if js is pbv or pbr so this should do the trick
    let sanitised = removeMutallyExclusiveTraits(characterDrives, characterIdeals, characterFlaws, characterClass);
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
      lifeEvents: generateBackstory(characterClass, age, lifestyle)
    });
  }

  return (
    <div class="App">
      <button onClick={generateRandomCharacter}
        style={{
          padding: '8px 20px',
          marginBottom: 20,
          backgroundColor: '#F5DEB3',
          outline: 'rgba(0,0,0,0.5) solid 3px',
          borderRadius: 100,
          fontSize: 18,
          color: 'black',
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        GENERATE NEW CHARACTER
      </button>
      <div style={{
        padding: '8px 20px',
        marginBottom: 20,
        backgroundColor: '#F5DEB3',
        outline: 'rgba(0,0,0,0.5) solid 3px',
        fontSize: 18,
        color: 'black',
        fontWeight: 700,
        letterSpacing: 1.5,
        marginLeft: 'max(calc(40% - 635px), 0px)',
        marginRight: 'max(calc(40% - 635px), 0px)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: width <= 800 ? 'row' : 'row',
          alignItems: 'start',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <input type="checkbox" id="npcClasses" name="npcClasses" value="npcClasses" checked={useNpcClasses} onChange={handleOnChangeNpcClasses} />Use NPC Classes
          {tooltip && <ReactTooltip effect="solid" />}
          <div data-tip="Attempts to match up factions with your character's class"
            onMouseEnter={() => {
              showTooltip(true)
            }
            }
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);
            }}>
            <input type="checkbox" id="sensibleChars" name="sensibleChars" value="sensibleChars" checked={buildSensibleCharacters} onChange={handleOnChangeSensibleChars} />Sensible Characters
          </div>
        </div>
      </div>
      <div
        style={{
          //TODO: Jank fix to center content on larger screens but left align on mobile (dependant on width of children)
          marginLeft: 'max(calc(40% - 635px), 0px)',
          marginRight: 'max(calc(40% - 635px), 0px)',
        }}
      >
        <br />
        {
          data &&
          <div
            style={{
              display: 'flex',
              flexDirection: width <= 800 ? 'row' : 'column',
              alignItems: 'start',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: width <= 800 ? 'column' : 'row',
                alignItems: 'start',
                width: width <= 800 ? '170px' : '100%',
                alignItems: 'stretch'
              }}
            >
              <StatCard title={'name'} value={data.name} onToggle={lockName} />
              <LockableDropdownStatCard title={'gender'} options={genders} value={data.gender} onToggle={lockGender} onChange={(selection) => { data.gender = selection.value }} />
              <LockableDropdownStatCard title={'race'} options={races} value={data.race} onToggle={lockRace} onChange={(selection) => { data.race = selection.value }} />
              <LockableDropdownStatCard title={'class'} options={playerClasses.concat(npcClasses)} value={data.characterClass} onToggle={lockClass} onChange={(selection) => { data.class = selection.value }} />
              <LockableDropdownStatCard title={'birthsign'} options={birthsigns} value={data.birthsign} onToggle={lockBirthsign} onChange={(selection) => { data.birthsign = selection.value }} />
              <LockableDropdownStatCard title={'nerevarine'} options={["Yes", "No"]} value={data.isNerevarine ? "Yes" : "No"} onToggle={lockMQ} onChange={(selection) => { data.isNerevarine = selection.value }} />
              <LockableDropdownStatCard title={'occult'} options={["None", "Vampire", "Werewolf"]} value={data.isVampire
                ? "Vampire"
                : data.isWerewolf
                  ? "Werewolf"
                  : "None"
              } onToggle={lockOccult}
                onChange={(selection) => { data.isVampire = selection.value == "Vampire"; data.isWerewolf = selection.value == "Werewolf" }} />
            </div>
            <div
              style={{
                // width: '60%',
                width: '100%',
                // minWidth: 700,
                // minWidth: 480,
              }}
            >
              <StatCard title={`Bio`} value={buildDescription(data)} centerText={false} />
              <LockableStatCard title={`Factions`} value={<div
                style={{
                  display: 'flex',
                  flexDirection: width <= 800 ? 'column' : 'row',
                  alignItems: 'start',
                }}>
                {
                  Object.keys(data.factions).map(function (title, i) {
                    return data.factions[title].length > 0 && Object.keys(data.factions[title]).map(function (faction, j) {
                      return <StatCard title={title} value={data.factions[title][faction]} nested={true} />
                    })
                  })
                }
              </div>}

                onToggle={lockFactions}
                centerText={false} />
              <div style={{
                display: 'flex',
                flexDirection: width <= 800 ? 'column' : 'row',
                alignItems: 'start',

              }}>
                <StatCard title={`Drives`} value={<div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start'
                }}>
                  {
                    Object.keys(data.drives).map(function (key, i) {
                      return <StatCard title={key} value={data.drives[key]} nested={true} />
                    })
                  }
                </div>} />
                <StatCard title={`Ideals`} value={<div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start'
                }}>
                  {
                    Object.keys(data.ideals).map(function (key, i) {
                      return <StatCard title={key} value={data.ideals[key]} nested={true} />
                    })
                  }
                </div>} />
                <StatCard title={`Flaws`} value={<div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start'
                }}>
                  {
                    Object.keys(data.flaws).map(function (key, i) {
                      return <StatCard title={key} value={data.flaws[key]} nested={true} />
                    })
                  }
                </div>} />
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  );
}

//TODO These should all be components in some sort of hierarchy

function StatCard({ title, value, centerText = true, nested = false }) {
  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: 'calc(100% - 50px)',
        backgroundColor: nested ? '#EFE1BC' : '#F5DEB3',
        outline: 'rgba(0,0,0,0.5) solid 3px',
        borderRadius: 10,
        textAlign: centerText ? 'center' : 'left',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    </div>)
}

function LockableStatCard({ title, value, centerText = true, nested = false, onToggle = () => { } }) {

  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: 'calc(100% - 50px)',
        backgroundColor: nested ? '#EFE1BC' : '#F5DEB3',
        outline: 'rgba(0,0,0,0.5) solid 3px',
        borderRadius: 10,
        textAlign: centerText ? 'center' : 'left',
        position: 'relative',
      }}
    >
      <button
        onClick={() => { setIsLocked(!isLocked); }}
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          outline: 'rgba(0,0,0,0)',
          borderWidth: 0,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 1.5,
          position: 'absolute',
          top: '0px',
          right: '-5px',
        }}
      >
        {onToggle(isLocked)}
        {isLocked ? <IoMdLock /> : <IoMdUnlock />}
      </button>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{value}</div>
    </div >)
}

function LockableDropdownStatCard({ title, value, centerText = true, nested = false, options = [], onToggle = () => { }, onChange = () => { } }) {

  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      style={{
        margin: 10,
        padding: 15,
        width: 'calc(100% - 50px)',
        backgroundColor: nested ? '#EFE1BC' : '#F5DEB3',
        outline: 'rgba(0,0,0,0.5) solid 3px',
        borderRadius: 10,
        textAlign: centerText ? 'center' : 'left',
        position: 'relative',
      }}
    >
      <button
        onClick={() => { setIsLocked(!isLocked); }}
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          outline: 'rgba(0,0,0,0)',
          borderWidth: 0,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 1.5,
          position: 'absolute',
          top: '0px',
          right: '-5px',
        }}
      >
        {onToggle(isLocked)}
        {isLocked ? <IoMdLock /> : <IoMdUnlock />}
      </button>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{<Dropdown options={options} onChange={(selection) => { onChange(selection); setIsLocked(true) }} value={value} />}</div>
    </div >)
}
