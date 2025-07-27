// original lines 466-485
const names = [
'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
'Abigail', 'Michael', 'Emily', 'Elijah', 'Elizabeth', 'Daniel', 'Mila', 'Matthew', 'Ella', 'Jackson',
'Madison', 'David', 'Scarlett', 'Sebastian', 'Victoria', 'Joseph', 'Aria', 'Samuel', 'Grace', 'John',
'Chloe', 'Owen', 'Camila', 'Wyatt', 'Penelope', 'Jack', 'Riley', 'Luke', 'Layla', 'Jayden',
'Luna', 'Dylan', 'Zoe', 'Gabriel', 'Nora', 'Aiden', 'Lily', 'Anthony', 'Hannah', 'Isaac',
'Addison', 'Grayson', 'Ellie', 'Andrew', 'Zoey', 'Christopher', 'Stella', 'Joshua', 'Natalie', 'Jaxon',
'Leah', 'Julian', 'Hazel', 'Nathan', 'Violet', 'Aaron', 'Aurora', 'Lincoln', 'Savannah', 'Christian',
'Audrey', 'Hunter', 'Brooklyn', 'Cameron', 'Bella', 'Connor', 'Claire', 'Eli', 'Skylar', 'Ezra',
'Lucy', 'Thomas', 'Paisley', 'Charles', 'Everly', 'Caleb', 'Anna', 'Isaiah', 'Caroline', 'Ryan',
'Nova', 'Adrian', 'Genesis', 'Nolan', 'Kennedy', 'Jeremiah', 'Samantha', 'Easton', 'Aaliyah', 'Ezekiel',
'Cora', 'Colton', 'Ruby', 'Brayden', 'Eva', 'Jordan', 'Serenity', 'Angel', 'Autumn', 'Roman',
'Alice', 'Austin', 'Hailey', 'Dominic', 'Gianna', 'Adam', 'Sadie', 'Xavier', 'Quinn', 'Jose',
'Nevaeh', 'Jace', 'Piper', 'Levi', 'Kinsley', 'Jonathan', 'Clara', 'Christopher', 'Rylee', 'Hudson',
'Athena', 'Robert', 'Melanie', 'Ian', 'Naomi', 'Carson', 'Eliza', 'Axel', 'Isla', 'Miles',
'Josephine', 'Jason', 'Lyla', 'Declan', 'Katherine', 'Brandon', 'Brielle', 'Weston', 'Arya', 'Justin',
'Ivy', 'Parker', 'Jade', 'Luis', 'Rose', 'Diego', 'Maria', 'Greyson', 'Liliana', 'Kevin',
'Margaret', 'Zachary', 'Adeline', 'Tyler', 'Raelynn', 'Bentley', 'Melody', 'Brody', 'Julia', 'Max',
'Maya', 'Juan', 'Valentina', 'Kaiden', 'Reagan', 'Asher', 'Lilly', 'Carlos', 'Ashley', 'Micah',
'Athena', 'Vincent', 'Ariana', 'George', 'Elena', 'Maverick', 'Sophie', 'Giovanni', 'Brianna', 'Maxwell',
'Juliette', 'Kingston', 'Alexandra', 'Jayce', 'Harmony', 'Kayden', 'Blakely', 'Ayden', 'Isabel', 'Rowan',
'Faith', 'Braxton', 'Andrea', 'Ryker', 'Londyn', 'Ivan', 'Makayla', 'Beau', 'Emery', 'Camden',
'Adalynn', 'Sawyer', 'Jocelyn', 'Harrison', 'Nicole', 'Gavin', 'Vivienne', 'Leonardo', 'Lena', 'Emmett',
'Gabriella', 'Kailey', 'Tucker', 'Alina', 'August', 'Mckenzie', 'Finn', 'Rebecca', 'Rhett', 'Brooklynn',
'Zion', 'Dakota', 'Bennett', 'Anastasia', 'Kaleb', 'Alaina', 'Joel', 'Phoebe', 'Grant', 'Rachel',
'Ryder', 'Angela', 'Emiliano', 'Tessa', 'Alan', 'Leila', 'Victor', 'Daisy', 'Abel', 'Elise',
'Matteo', 'Lucia', 'Nicolas', 'Genevieve', 'Archer', 'Alayna', 'Jasper', 'Camille', 'Maddox', 'Thea',
'Knox', 'Freya', 'Malachi', 'Amaya', 'Zayden', 'Ruth', 'Erick', 'Selena', 'Jude', 'Adelyn',
'Pedro', 'Charlee', 'Spencer', 'Journee', 'Tristan', 'Harmony', 'Messiah', 'Annabelle', 'Manuel', 'Arabella',
'Karter', 'Fiona', 'Cody', 'Nina', 'Paxton', 'Brynlee', 'Lane', 'Kate', 'Phoenix', 'Laila',
'Remington', 'Jayla', 'Brantley', 'Kayla', 'Bryson', 'Alani', 'Sergio', 'Adrianna', 'Colt', 'Ember',
'Troy', 'Dakota', 'Ricardo', 'Talia', 'Zane', 'Miranda', 'Francisco', 'Catalina', 'Kyrie', 'Heidi',
'Shane', 'Daniella', 'Seth', 'Veronica', 'Marshall', 'Marley', 'Wade', 'Giselle', 'Jett', 'Malia',
'Andy', 'Annie', 'Desmond', 'Gwendolyn', 'Ali', 'Joy', 'Edwin', 'Helen', 'Tobias', 'Lucille',
'Armando', 'Yaretzi', 'Gage', 'Angelina', 'Edgar', 'Amira', 'Cohen', 'Evangeline', 'Niko', 'Francesca',
'Fabian', 'April', 'Ari', 'Julianna', 'Corbin', 'Esmeralda', 'Koa', 'Laura', 'Saul', 'Mira',
'Zander', 'Daphne', 'Omari', 'Lana', 'Reid', 'Ophelia', 'Kian', 'Cecilia', 'Derek', 'Adelaide',
'Cash', 'Nylah', 'Kellan', 'Elliott', 'Moses', 'Winter', 'Reed', 'Celeste', 'Finley', 'Lara', 'Figgy', 'Feng', 'Forrest'
];

let gameState = {
characters: [],
killers: [],
gameMode: 'spectator',
currentAct: 1,
movieTitle: '',
movieYear: new Date().getFullYear(),
events: [],
isKillerMode: false,
killerPlayer: null,
autoPlay: false,
movieComplete: false,
storyQueue: [],
currentStoryIndex: 0,
relationships: new Map()
};

let franchiseHistory = {
movies: [],
allCharacters: new Map()
};
