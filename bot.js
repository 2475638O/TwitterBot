// Define your variables
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var stream = T.stream('statuses/filter', { track: 'i feel ugly, im feeling ugly, why am i so ugly?, i am so ugly, i\'m feeling ugly, i\'m so ugly, i need a hug, i need someone to love me, i hate myself,'});
// When a tweet occurs
stream.on('tweet', function(tweet) {
    // Log it
    console.log('@' + tweet.user.screen_name + ': ' + tweet.text);
    // Determine if it is a retweet and ignore
    if (tweet.text.indexOf('RT') > -1) { return; }
    // Set your reply
    var replyString = (tweet.user.utc_offset === null) ? ' I think you are beautiful.' : ' You are amazing and loved.';
    // Post your reply
    T.post('statuses/update', { status: '@' + tweet.user.screen_name + replyString, in_reply_to_status_id: tweet.id_str}, function(err, data, response) {
          // If an error occurs, log it
          if (err) {
            console.log(err);
            return;
          }
          // Otherwise store your response and store it
          tweet.botReplyId = data.id_str;
          db.tweets.insert(tweet);
    });
});
// Check your stream every 10 minutes
setInterval(stream, 1800000);