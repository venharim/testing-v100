// original lines 1352-1431
const openingKills = [
`{victim} answers the phone at exactly 11:47 PM. "Hello?" Click. They hang up and walk to the kitchen for a late-night snack when WHAM! A meat cleaver splits their skull like a watermelon.`,
`{victim} is taking a steamy shower when the lights flicker. "Hello? Is someone there?" The shower curtain gets yanked back and a masked figure plunges a kitchen knife into their chest seven times.`,
`{victim} hears scratching at the window. "Probably just a tree branch," they mutter, opening the blinds. CRASH! The killer bursts through the glass, tackling them to the ground and strangling them with piano wire.`,
`{victim} is alone in the garage working on their car when the garage door suddenly slams shut. The killer emerges from behind a tool cabinet and impales them on a garden rake.`,
`{victim} is studying late at night when they hear the doorbell ring. "Pizza's here!" they call out, opening the door without checking. Instead of pizza, they get a chainsaw to the face.`,
`{victim} is doing laundry in the basement when the washing machine starts making weird noises. They lean in to check and the killer grabs them from behind, shoving their head into the spin cycle.`,
`{victim} decides to take out the trash during a thunderstorm. Lightning flashes as they reach the dumpster, revealing the killer standing behind it. A machete swing later, and {victim} becomes part of the garbage.`,
`{victim} is home alone watching TV when the power goes out. They grab a flashlight and head to the breaker box, only to find the killer waiting with a pair of bolt cutters. SNAP! goes more than just the power.`,
`{victim} is making a midnight snack when they hear their dog barking outside. "What's wrong, boy?" They open the back door to find their dog... and the killer holding a bloody shovel.`,
`{victim} is video chatting with friends when the wifi cuts out. "Ugh, typical!" They head upstairs to reset the router and walk straight into a tripwire that sends them tumbling down the stairs... into a pit of kitchen knives.`
];

const killScenarios = [
`{victim} goes to the basement to check the breaker box when the lights go out. "Great, just great," they mutter, fumbling with their phone flashlight. The killer appears behind them with a nail gun - THUNK THUNK THUNK!`,
`{victim} is making popcorn in the kitchen when they hear the microwave beeping weirdly. They open it to find a bloody note that says "YOU'RE NEXT." Suddenly, the killer grabs them from behind and shoves their head into the garbage disposal.`,
`{victim} decides to "split up to cover more ground" (classic mistake). They're searching the attic when a floorboard creaks. "Hello?" The killer drops down from the rafters and strangles them with Christmas lights.`,
`{victim} is in the bathroom applying lipgloss when they notice in the mirror that the shower curtain is moving. "Very funny, guys!" The killer bursts out and drowns them in the toilet.`,
`{victim} goes outside to get something from their car. The killer pops out of the backseat like a jack-in-the-box and beheads them with a machete. Their head rolls under the car and their body slumps against the horn - HOOOOONK!`
];

const attackScenarios = [
`{victim} is in the kitchen making a sandwich when WHAM! The killer appears and slashes them across the arm with a butcher knife. {victim} grabs a frying pan and BONK! knocks the killer backwards, then runs screaming into the living room.`,
`{victim} opens a closet door and the killer tumbles out like an overstuffed coat rack. They wrestle briefly before {victim} knees them in the groin and bolts. "Sorry! Not sorry!"`,
`The killer grabs {victim} from behind in the hallway, but {victim} throws their elbow back, connects with the killer's nose (CRUNCH!), and breaks free. Blood spatters everywhere.`,
`{victim} is cornered in the basement. The killer swings a crowbar, missing their head by inches and embedding it in the wall. "Thanks for the workout!" {victim} quips, diving behind some boxes.`,
`The killer attacks {victim} with garden shears by the back door, but {victim} grabs a nearby gnome and hurls it at the killer's face. "Take that, you psycho!" They escape through the dog door.`,
`{victim} is doing laundry when the killer jumps out of the washing machine. {victim} throws detergent in their eyes and runs. "Clean up your act!" they yell over their shoulder.`,
`The killer corners {victim} in the garage, revving a chainsaw. {victim} starts the lawnmower and has an epic power tool duel before escaping on the riding mower.`,
`{victim} is trapped in the bathroom when the killer kicks down the door. {victim} sprays them with toilet cleaner and climbs out the window. "That's for ruining my skincare routine!"`,
`The killer attacks {victim} with a baseball bat in the living room. {victim} uses a couch cushion as a shield and counter-attacks with a lamp. "Home decorating can be dangerous!"`,
`{victim} is studying when the killer tries to strangle them with an ethernet cable. {victim} hits them with a thick textbook and runs. "Knowledge is power!" they shout.`,
`The killer ambushes {victim} in the pantry with a meat tenderizer. {victim} throws flour in their face and escapes. "Looks like you're the one getting tenderized!"`,
`{victim} is in the attic when the killer attacks with a pitchfork. {victim} swings from a rope like Tarzan and kicks them through the floorboards. "Timber!"`,
`The killer tries to push {victim} down the stairs, but {victim} grabs the banister and kicks them down instead. "Gravity's a bitch!" they call down.`,
`{victim} is trapped in the hot tub when the killer appears with an electric cattle prod. {victim} splashes them and short-circuits the weapon, then escapes. "Shocking behavior!"`
];

const finalKillScenarios = [
`{victim} heroically tries to protect the others but {killer} catches them off guard and delivers a fatal blow!`,
`{victim} gets cornered during the chaos and {killer} shows no mercy - another life claimed in the final battle!`,
`{victim} makes a brave last stand but {killer} overpowers them in the brutal melee!`,
`{victim} almost escapes but {killer} grabs them at the last second - their sacrifice won't be forgotten!`,
`{victim} fights valiantly but {killer} strikes them down in the climactic struggle!`,
`{victim} tries to help a fallen friend and {killer} takes advantage of their compassion - a tragic end!`,
`{victim} refuses to abandon the others and pays the ultimate price when {killer} attacks!`
];
