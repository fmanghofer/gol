/**
 * Class representing a cell.
 * @author Florian Manghofer <f.manghofer@googlemail.com>
 * @copyright Florian Manghofer 2018
 */
class Cell {

  /**
   * Represents a cell
   * @constructor
   * @param {number} index - index of this cell in the overall cell list
   * @param {boolean} alive - if cell is alive (true) or dead(false)
   * @param {GameEngine} oGameEngine - instance of GameEngine
   */
  constructor(index, alive, oGameEngine) {
    /**
     * Cell index in game engine list
     * @member
     * @type {number}
     */
    this.index = index;

    /**
     * State of the cell
     * @member
     * @type {boolean}
     */
    this.alive = alive;

    /**
     * Contains references to all neighbout cells or null, if not set
     * @member
     * @property {?Cell}  UPLEFT     - in relation to this cell the neigbour cell up left
     * @property {?Cell}  UP         - in relation to this cell the neigbour cell up
     * @property {?Cell}  UPRIGHT    - in relation to this cell the neigbour cell up right
     * @property {?Cell}  LEFT       - in relation to this cell the neigbour cell left
     * @property {?Cell}  RIGHT      - in relation to this cell the neigbour cell right
     * @property {?Cell}  DOWNLEFT   - in relation to this cell the neigbour cell below on the left side
     * @property {?Cell}  DOWN       - in relation to this cell the neigbour cell below
     * @property {?Cell}  DOWNRIGHT  - in relation to this cell the neigbour on the right side
     */
    this.neighbours = {
      UPLEFT: null,
      UP: null,
      UPRIGHT: null,
      LEFT: null,
      RIGHT: null,
      DOWNLEFT: null,
      DOWN: null,
      DOWNRIGHT: null
    };

    /**
     * Game engine Instance
     * @member
     * @type {GameInstance}
     */
    this.oGameEngine = oGameEngine;

    /**
     * Instance to DOM Element which represents this cell
     * @member
     * @type {HTMLDivElement}
     */
    this.domElement = document.createElement('div'); // create new DOM Element
    this.domElement.classList.add('grid-item'); // add style classes
    this.domElement.classList.add('content');
    if (this.alive) {
      this.setAlive();
    }

    // add on click listener and call corresponding method
    this.domElement.addEventListener('click', this._onClick.bind(this));
  }

  /**
   * Getter for cell state
   * @return {boolean} true when alive, false when dead
   */
  isAlive() {
    return this.alive;
  }

  /**
   * Getter for index
   * @return {number}
   */
  getIndex() {
    return this.index;
  }

  /**
   * Set the cell index
   * @param {number} index 
   */
  setIndex(index) {
    this.index = index;
  }

  /**
   * Geter for x position
   * @return {number} - Position of cell within the row
   */
  getPosX() {
    return this.index % Cell.sizeX; //we calculate it at runtime, index in list modulo items per row
  }

  /**
   * Getter for y position
   * @return {number} - position of cell within the column
   */
  getPosY() {
    return parseInt(this.index / Cell.sizeX); // we calculate it at runtime, index in list / items per row
  }

  /**
   * Set a neighbour cell
   * @param {String} position - Position of Cell (ENUM KEY)
   * @param {Cell} instance - Neighbour cell instance
   */
  setNeighbour(position, instance) {
    this.neighbours[position] = instance;
  }

  /**
   * Getter for a neighbour cell
   * @param {String} position - Position of Cell (ENUM KEY)
   * @return {?Cell}
   */
  getNeighbour(position) {
    return this.neighbours[position];
  }

  /**
   * Getter for DOM Element
   * @return {HTMLDivElement}
   */
  getDOMElement() {
    return this.domElement;
  }

  /**
   * Get the number of alive neighbour cells
   * @return {number}
   */
  getAliveNeighbours() {
    let count = 0;
    for (let n in this.neighbours) { // go through all neighbour cells and count, which of them are alive (if not null)
      let oNeighbour = this.neighbours[n];
      count += ((oNeighbour != null) ? (oNeighbour.isAlive() ? 1 : 0) : 0);
    }
    return count;
  }

  /**
   * Revives a cell
   */
  revive() {
    this.alive = true;
    this.domElement.classList.add('alive');
  }

  /**
   * Kills a cell
   */
  kill() {
    this.alive = false;
    this.domElement.classList.remove('alive');
  }

  /**
   * On cell click handler
   * If godemode is set, kill or revive kell depending on its current state
   * @private
   * @param {Object} oEvent - Event object
   */
  _onClick(oEvent) {
    if (this.oGameEngine.isGodMode()) { // do something if godmode is on
      let n = 0; // counter for changes in alive cells
      if (this.alive == true) { // if currently alive, kill cell
        this.kill();
        --n;
      } else { // else cell is currently dead, revive it
        this.revive();
        ++n;
      }
      this.oGameEngine.changeAliveCellsNumber(n); // tell game engine instance that we´ve changed the amount of alive cells
    }
  }
}
/**
 * Amount of Cells within a row in the game field grid
 * Should be set by game engine to be able to calculate the x and y position
 * @memberOf Cell
 * @type {number}
 */
Cell.sizeX = 0;
