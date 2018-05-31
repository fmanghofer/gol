<template>
  <div class="fullHeight">
    <div id="header">
        <div class="headline">Game of Life </div>
        <div>
            <div class="inline">
                <div class="gradient black">
                    <label for="fieldSizeX">Breite:</label>
                    <input v-model.number="fieldSizeX" type="number" id="fieldSizeX" @blur="onXChanged" @keydown="onXKeyDown">
                </div>
                <div class="gradient black">
                    <label for="fieldSizeY" class="marginLeft">Höhe:</label>
                    <input v-model.number="fieldSizeY" type="number" id="fieldSizeY" @blur="onYChanged" @keydown="onYKeyDown"> 
                </div>
                <div class="gradient black">
                    <label for="fieldEditMode">Editierbar:</label>
                    <input type="checkbox" id="fieldEditMode" v-model="godMode">
                </div>
            </div>
            <div class="fullHeight margin inline">
                <span class="gradient black">Generation: {{ generationCounter }}</span>
                <a v-on:click="onNextButtonClicked" :disabled="nextButtonDisabled" class="btn gradient black">Nächster Zyklus</a>
                <a v-on:click="onStartEvolutionButtonClicked" v-show="!evolutionRunning" class="btn gradient black">Evolution starten</a>
                <a v-on:click="onEndEvolutionButtonClicked" v-show="evolutionRunning" class="btn gradient black">Evolution stoppen</a>
                <a class="btn gradient black" v-on:click="onNewGameButtonClicked">Neues Spiel</a>
            </div>
        </div>
    </div>
    <div id="game-wrapper">
        <game-of-life :sizey="sizeY" :sizex="sizeX" :godmode="godMode" id="game-instance"></game-of-life>
    </div>
    <div id="footer">© by Florian Manghofer 2018</div>
  </div>
</template>

<script>
/**
 * Module implements a screen to show the game of life component as well as some controlls
 * @author Florian Manghofer <f.manghofer@googlemail.com>
 * @copyright Florian Manghofer 2018
 */
export default {
  name: "GameScreen",
  data() {
    return {
      fieldSizeX: 35, // binding for x value
      fieldSizeY: 25, // binding for y value
      runningEvolutionId: 0,
      evolutionTime: 1000,
      godMode: true,
      evolutionRunning: false, // binding for evolution buttons
      nextButtonDisabled: false, // binding for next button state
      generationCounter: 0, // binding for generation counter
      sizeY: 25, // binding for web component x
      sizeX: 35, // binding for web component y
      oGameInstance: null // web component instance
    };
  },

  /**
   * Is called when view is mounted.
   * Calculate the height of the game view in percent to be responsive
   */
  mounted() {
    let oHeaderDOMElement = document.getElementById("header");
    let oFooterDOMElement = document.getElementById("footer");
    let oGameWrapper = document.getElementById("game-wrapper");

    let headerHeight = this._getDOMElementHeight(oHeaderDOMElement);
    let footerHeight = this._getDOMElementHeight(oFooterDOMElement);

    let w = window,
      d = document.documentElement,
      b = d.body,
      documentHeight = parseInt(
        window.innerHeight || d.clientHeight || b.clientHeight
      );
    let size = documentHeight - headerHeight - footerHeight;
    size = size / documentHeight * 100;
    oGameWrapper.style.height = size + "%";

    this.oGameInstance = document.getElementById("game-instance");

    /**
     * Listen for web component events to update the UI
     */
    this.oGameInstance.addEventListener(
      // when no cells alive, set next button disabled
      "Finish",
      function(oEvent) {
        this.nextButtonDisabled = true;
        this.generationCounter = oEvent.detail.generation();
      }.bind(this)
    );

    this.oGameInstance.addEventListener(
      //when there is a cell status manipulation, set next button enabled
      "GenerationManipulated",
      function(oEvent) {
        this.nextButtonDisabled = false;
        this.generationCounter = oEvent.detail.generation();
      }.bind(this)
    );
  },
  methods: {
    /**
     * Is called when clicked on next button
     * Calls the web components play method
     * @param {MouseEvent} oEvent - Click event object
     */
    onNextButtonClicked: function(oEvent) {
      this.oGameInstance.play();
    },

    /**
     * Is called wehn clicked on new game button
     * Creates a new game
     * @param {MouseEvent} oEvent - Click event object
     */
    onNewGameButtonClicked: function(oEvent) {
      this.onEndEvolutionButtonClicked();
      this.oGameInstance.newGame();
    },

    /**
     * Is called when input field x loses focus
     * Sets the x value to the field or resets the x input value if invalid
     * @param {FocusEvent} oEvent - Focus event object
     */
    onXChanged: function(oEvent) {
      try {
        let x = parseInt(this.fieldSizeX);
        if (x > 0) {
          this.sizeX = this.fieldSizeX;
          return;
        }
      } catch (err) {
        console.log("only integers!");
      }
      this.fieldSizeX = this.sizeX;
    },

    /**
     * Is called when input field y loses focus
     * Sets the y value to the field or resets the y input value if invalid
     * @param {FocusEvent} oEvent - Focus event object
     */
    onYChanged: function(oEvent) {
      try {
        let y = parseInt(this.fieldSizeY);
        if (y > 0) {
          this.sizeY = this.fieldSizeY;
          return;
        }
      } catch (err) {
        console.log("only integers!");
      }
      this.fieldSizeY = this.sizeY;
    },

    /**
     * Is called when key down event on the x input field
     * If enter, then onXChanged is called
     * @param {KeyboardEvent} oEvent - Focus event object
     */
    onXKeyDown: function(oEvent) {
      alert(oEvent);
      if (oEvent.keyCode === 13) {
        this.onXChanged();
      }
    },

    /**
     * Is called when key down event on the y input field
     * If enter, then onXChanged is called
     * @param {KeyboardEvent} oEvent - Focus event object
     */
    onYKeyDown: function(oEvent) {
      if (oEvent.keyCode === 13) {
        this.onYChanged();
      }
    },

    /**
     * Is called when start evolution button is clicked
     * Sets an interval which triggers _runEvolution
     * @param {MouseEvent} oEvent - Click event object
     */
    onStartEvolutionButtonClicked: function(oEvent) {
      this.evolutionRunning = true;
      this.runningEvolutionId = setInterval(
        this._runEvolution,
        this.evolutionTime
      );
    },
    
    /**
     * Plays a new game cycle
     * @private
     */
    _runEvolution: function() {
      this.oGameInstance.play();
    },

    /**
     * Is called when end evolution button is clicked
     * Clears the active interval
     * @param {MouseEvent} oEvent - Click event object
     */
    onEndEvolutionButtonClicked: function(oEvent) {
      this.evolutionRunning = false;
      clearInterval(this.runningEvolutionId);
    },

/**
 * Return the total height of an DOM Element
 * @private
 * @param {HTMLElement} oElement - DOM Element
 * @return {number} total height
 */
    _getDOMElementHeight: function(oElement) {
      let height = oElement.offsetHeight;
      height += parseInt(
        window.getComputedStyle(oElement).getPropertyValue("margin-top")
      );
      height += parseInt(
        window.getComputedStyle(oElement).getPropertyValue("margin-bottom")
      );
      return height;
    }
  }
};
</script>

<style scoped>
.header-spacer {
  height: 1px;
}

#header {
  text-align: center;
}

#game-instance {
  width: 100%;
  height: 100%;
  display: block;
}

#game-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
}

#footer {
  margin-top: 5px;
  position: relative;
  display: block;
  text-align: center;
}

.fullHeight {
  height: 100%;
}

.margin {
  margin-top: 10px;
  margin-bottom: 10px;
}

input[type="number"] {
  width: 50px;
}

.headline {
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bolder;
  font-size: 50px;
}

.padding-top {
  padding-top: 10px;
}

.inline {
  display: inline-block;
}
</style>
