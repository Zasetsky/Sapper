<template>
<div>
  <button class="btn-field" @click="createField(9)">3x3</button>
 <div class="field" :class="{disabled: isDisabled}">
  <div v-for="(item, index) in items" :key="index"
  class="cell" :class="{active: item.isActive}"
  @click="checkCell(item)">{{ item }}</div>
 </div>
 <div ><button class="start-btn" @click="resetGame()">Restart</button></div>
 <h1 v-if="loseMsg === true" class="gameower">You Lose</h1>
 <h1 v-if="winMsg === true" class="game-win">You Win!</h1>
</div>
</template>

<script>

export default {
  name: 'Sapper',
  data() {
    return {
      randomIndexes: new Array(2),
      loseMsg: false,
      winMsg: false,
      isDisabled: false,
      items: [],
    };
  },
  computed: {
  },
  methods: {
    createField(fieldLengthX) {
      this.items = [];
      this.randomIndexes = new Array(2);
      for (let i = 0; i < fieldLengthX; i += 1) {
        this.items.push({ bomb: false, isActive: false });
      }
      for (let i = 0; i < this.randomIndexes.length; i += 1) {
        this.randomIndexes[i] = Math.floor(Math.random() * 9);
      }
      for (let i = 0; i < this.randomIndexes.length; i += 1) {
        while (this.randomIndexes[0] === this.randomIndexes[1]) {
          this.randomIndexes[i] = Math.floor(Math.random() * 9);
        }
      }
      for (let index = 0; index < this.items.length; index += 1) {
        if (this.randomIndexes.includes(index)) {
          this.items[index].bomb = true;
        }
      }
    },
    checkCell(item) {
      let g = 0;
      if (item.bomb === false && this.loseMsg === false && item.isActive === false) {
        item.isActive = true;
      } if (item.bomb === true && this.winMsg === false) {
        this.loseMsg = true;
        this.isDisabled = true;
      } for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].isActive === true) {
          g += 1;
        } if (g === this.items.length - this.randomIndexes.length) {
          this.winMsg = true;
          this.isDisabled = true;
        }
        console.log(this.winMsg);
      }
    },
    resetGame() {
      this.createField(this.items.length);
      this.loseMsg = false;
      this.winMsg = false;
      this.isDisabled = false;
      console.log(this.randomIndexes);
    },
  },
};
</script>

<style scoped>
.field {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-row-gap: 2px;
  grid-column-gap: 2px;
  justify-content: center;
}
.field.disabled {
  pointer-events: none;
}
.cell {
  background-color: black;
  padding: 25px;
  color: black;
  font-size: 0;
  cursor: pointer;
}

.cell.active {
  background-color: grey;
  pointer-events: none;
}
.start-btn {
  width: 60px;
  height: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.gameower {
  text-align: center;
}
</style>
