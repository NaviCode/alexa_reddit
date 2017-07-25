/*jshint esversion: 6 */
const Alexa     = require('alexa-sdk');
const reddit    = require('./modals/reddit'); 

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event,context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'Welcome to Reddit!');
    },
    "RedditJoke": function(){
        reddit.get_joke(this);
    },  
    'AMAZON.StopIntent': function() {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'AMAZON.CancelIntent': function() {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'SessionEndedRequest': function() {
        // Force State Save When User Times Out
        this.emit(':saveState', true);
    },

    'AMAZON.HelpIntent': function() {
        this.emit(':ask', `You can tell me the name of a musical artist and I will say it back to you.  Who would you like me to find?`, `Who would you like me to find?`);
    },
    'Unhandled': function() {
        this.emit(':ask', `You can tell me the name of a musical artist and I will say it back to you.  Who would you like me to find?`, `Who would you like me to find?`);
    }

};
