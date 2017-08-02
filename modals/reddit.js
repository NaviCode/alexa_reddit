/*jshint esversion: 6 */
const request = require('request');

exports.get_joke = function(alexa){
    let number_of_jokes = 100;
    const url = `https://www.reddit.com/r/jokes/top.json?limit=${number_of_jokes}`;    
    let jokes = reddit.get(url,alexa);
};

const reddit = {
    get: function(url,alexa){
        let joke_box = [];
        request.get(url,function(error,response,body){
            let jokes = (JSON.parse(body).data.children);
            for(var i in jokes){
                let joke = {
                    "title": jokes[i].data.title,
                    "joke": jokes[i].data.selftext
                };
                joke_box.push(joke);
                // If this is the last joke in the series
                if(i == jokes.length -1){
                    // HAVE ALEXA RECITE ONE RANDOM JOKE HAHAHA
                    let random = Math.ceil(Math.random() * 100)
                    alexa.emit(":tell",joke_box[random].title  + "<break time='1s'/>" + joke_box[random].joke);
                }
            }
        });
    }
};