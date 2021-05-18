const RootComponent = {
  data() {
    return {
      userData: {},
      usersID: 0,
      name: "",
      email: "",
      password: "",
      max_length: 25,
      max_pass_length: 21,
      max_tweet_length: 200,
      error: "",
      registered: false,
      tweetMsg: "",
      tweets: []
    }
  },
  computed: {
    maxCharsName() {
      return this.name.length + '/' + this.max_length
    },
    maxCharsEmail() {
      return this.email.length + '/' + this.max_length
    },
    maxCharsPassword() {
      return this.password.length + '/' + this.max_pass_length
    },
    maxCharsTweet() {
      return this.tweetMsg.length + '/' + this.max_tweet_length
    },
    errorMessage() {
      return 'Max char limit reached! excess chars: ${this.max_length - this.tweet.length}'
    }
  },
  methods: {
    registerAccount() {
      if (this.name !== "" && this.email !== "" && this.password !== "" ) {
        this.userData.id = ++this.usersID
        this.userData.name = this.name
        this.userData.email = this.email
        this.userData.password = this.password
        this.registered = true
      } else {
        this.error = "Complete all the form fields"
      }
      /* Add registration data to the local storage */
      localStorage.setItem('simple_tweet_registered', true)
      /* Add the whole userData object as JSON string */
      localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))
      /* Clear the registration inputs */
      this.name = ""
      this.email = ""
      this.password = ""
    },
    sendTweet() {
      /* Store the tweet in the tweets property */
      this.tweets.unshift(
        {
          text: this.tweetMsg,
          date: new Date().toLocaleTimeString()
        }
      )
      /* Empty the tweetMsg property */
      this.tweetMsg = ""
      //console.log(this.tweets)
      /* Tranform the object into a string  */
      stringTweets = JSON.stringify(this.tweets)
      //console.log(stringTweets)
      /* Add to the local storage the stringified tweet object */
      localStorage.setItem('simple_tweet_tweets', stringTweets)
    },
    removeTweet(index){
      let removeIt = confirm("Are you sure you want to remove this tweet?")
      if(removeIt) {
        this.tweets.splice(index, 1);
        /* Remove the item also from the local storage */
        localStorage.simple_tweet_tweets = JSON.stringify(this.tweets)
      }
    }
  },
  created() {
    /* Check if the user is registered and set the registered to true */
    if(localStorage.getItem("simple_tweet_registered") === 'true'){
      this.registered = true
    }
    // repopulate the userData object
    if(localStorage.getItem('simple_tweet_registered_user')) {
      this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
    }
    /* Parse all tweets from the local storage  */
    if(localStorage.getItem("simple_tweet_tweets")) {
      console.log("There is a list of tweets")
      this.tweets = JSON.parse(localStorage.getItem('simple_tweet_tweets'))
    } else {
      console.log("No tweets here")
    }
  }
}
const app = Vue.createApp(RootComponent)
.component('tweet-message',{
  props: {
    'tweet': Object,
  },
  template: `
  <div class="tweetMsg">
    <p>
      {{ tweet.text}}
    </p>
    <div class="tweetDate">
      <i class="fas fa-calendar fa-sm fa-fw"></i>{{ tweet.date }}
    </div>
    <div class="tweet_remove" @click="$emit('remove-tweet', 'index')">
      <span class="remove">Delete this tweet <i class="fas fa-trash fa-sm fa-fw"></i></span>
    </div>
  </div>
  `
})
.mount('#app')
