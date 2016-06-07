/**
 * App ID for the skill
 */
var APP_ID = ******; 

/**
 * Array containing trivia.
 */
var FACTS = [
"The plastic thing on the end of your shoelace is called an Aglet",
"The bumps on a basketball are called Pebbles",
"There are 144 bumps per square inch on a basketball",
"The only  battleship in the US Navy with a one syllable name is the USS Maine",
"The Titanic sank on April 15, 1912",
"1502 people died when the Titanic sank",
"Have you ever wondered what RMS stand for in ship's names? It’s short for Royal Mail Steamer.",
"There were 15 people on the first lifeboat when the Titanic sank",
"A common housefly moves at 4 miles per hour. Don't ask me the average velocity of an unladen sparrow.",
"The pirate Black Beard was born Edward Teach",
"Just 7 people were killed in the St. Valentine's Day Massacre",
"The world's largest baked potato is in Blackfoot Idaho",
"J R R Tolkein is author of both the Lord of the Rings and the Hobbit. His full name was John Robert Reuel.",
"Have you ever heard of William H. Bonney? Didn't think so. His trade name was Billy the Kid.",
"The two super Japanese battleships in World War Two were the Yomato and the Musashai",
"Steve Jobs was the founder of Macintosh Computers",
"Have you ever wondered what the dimples on a golf ball are for? They help spin the ball to increase the distance it travels.",
"There are between 300 and 500 dimples on a single golf ball.",
"Captain James Cook was the first man to set foot on five continents",
"What do horses, rats and rabbits have in common? They cannot throw up their food.",
"Do you like light reading? Did you know that Les Miserables was given to all officers in the Confederate army?",
"The Civil War occurred from 1861 to 1865",
"Lima, Peru must like Winnie the Pooh because they have a brass statue of him in their downtown square.",
"Ever stopped to see how many holes a Chinese Checker board has? We'll save you some time--there's 121",
"What do fire escapes, windshield wipers and bullet-proof vests have in common? They were all invented by women.",
"Which now-famous author wrote Harry Potter? J.K. Rowling",
"Saturday morning trivia--a Smurf is three apples high.",
"It takes 6 Smurfs to make gold",
"The USS Constitution was known as Old Ironsides",
"Cornelius Van Drebble is the infamous inventor of the submarine",
"The poison arrow frog is the world's most poisonous animal--at least the most poisonous one we know of so far.",
"The world's largest frying pan is in Long Beach Washington and is 18 feet, 4 inches long.",
"Ever wondered who the world's first 3 passengers in a hot air balloon were? A Sheep, a Duck and a Rooster. Not kidding.",
"Ever seen the film "The The Rambunctious and Clever Ones"? Unless you grew up in Taiwan, you probably knew it as "Wayne's World".",
"The only word in english that starts and ends with U N D is 'underground'",
"The next time you watch a movie and see the Paramount Pictures logo count the stars--there's 22 of them.",
"Ironically the first movie played on MTV was 'Video Killed the Radio Star'",
"Ever wondered why Odin has only one eye? He traded it for wisdom--makes you wonder if the guy he traded for it got the last laugh.",
"Marie Antoinette wore purple when she was beheaded",
"Do you remember Tom Thumb's "real" name? It was Charles Sherwood Stratton. Big name for such a small guy."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Trivya is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Trivya = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Trivya.prototype = Object.create(AlexaSkill.prototype);
Trivya.prototype.constructor = Trivya;

Trivya.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Trivya onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Trivya.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Trivya onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Trivya.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Trivya onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Trivya.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Trivya to tell you a random fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var fact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "" + fact;

    response.tellWithCard(speechOutput, "Trivya", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Trivya skill.
    var Trivya = new Trivya();
    Trivya.execute(event, context);
};

