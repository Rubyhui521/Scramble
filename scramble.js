/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const app = Vue.createApp({
  data: function () {
    return {
      maxPoints: 10,
      maxStrikes: 3,

      game: {
        playbn: false,
        words: ['PASSPORT', 'TISSUE', 'TABLET', 'MICROPHONE', 'NOTEBOOK', 'CHARGER', 'KEYBOARD', 'DRAWER', 'CRAYON', 'BLOCK'], // secret word
        guess: '',// guess word
        points: 0,
        strikes: 0,
        passes: 3,
        message: '' 
      }
    }
  },

  // created: function() {
  //   const game =localStorage.getItem('game')
  //   if (game) {
  //     this.game = JSON.parse(game)
  //   }
  // },

  computed: {
    word: function() {
      return this.game.words[0]
    },
    scrambled: function() {
      return shuffle(this.word)
    }
  },

  methods: {   
    verifyGuess: function() {
      if (this.word === this.game.guess.toUpperCase()) {
        this.game.guess = ""
        this.game.points++
        if (this.game.points < this.maxPoints) {
          this.game.message = "Correct! Next Word"
          this.game.words.shift()
        } else {
          this.game.message = "You Win!"
          this.restart()
          this.game.playbn = true
          document.querySelector("input").disabled = true
        }
      } else {
        this.game.guess = ""
        this.game.strikes++
        if (this.game.strikes < this.maxStrikes) {
          this.game.message = "Wrong! Try again!"
          this.game.words.shift()
        } else {
          this.game.message = "You Lost!"
          this.restart()
          this.game.playbn = true
          document.querySelector("input").disabled = true
        }
      }
    },

    pass: function() {
      // check if there is any passes left
      if (this.game.passes) {
        this.game.passes--
        this.game.message = "You passed. Next Word"
        this.game.words.shift()
      } 
    },

    restart: function() {
      this.game.playbn = false,
      this.game.points = 0,
      this.game.strikes = 0,
      this.game.passes = 3,
      this.game.message = "",
      this.game.guess = ""
      document.querySelector("input").disabled = false
    }
  },

  // watch property is used to listen to a specific data object and then update localstorage
  watch: {
    // listen to the game object
    game: {
      // wait for the propertie of the object rather than the object itself to change
      deep: true,
      handler: function (game) {
        localStorage.setItem('game', JSON.stringify(game))
      }
    }
  }
})

const vm = app.mount('#app')
