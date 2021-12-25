<template>
<div>
 <div class="field" :class="{disabled: isDisabled}">
  <div v-for="(item, index) in items" :key="index"
  class="cell" :class="{active: item.isActive}"
  @click="checkCell(item)">{{ item }}</div>
 </div>
 <div ><button class="start-btn" @click.once="startGame()">Start</button></div>
 <!-- <div ><button class="restart-btn" @click="restartGame()">Restart</button></div> -->
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
      items: [
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
        { bomb: false, isActive: true },
      ],
    };
  },
  computed: {
  },
  methods: {
    checkCell(item) {
      if (item.bomb === false && this.loseMsg === false && item.isActive === false) {
        item.isActive = true;
      } if (item.bomb === true && this.winMsg === false) {
        this.loseMsg = true;
        this.isDisabled = true;
      }
      console.log(this.winMsg);
    },
    startGame() {
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
        } if (this.items[index].isActive === true) {
          this.items[index].isActive = false;
        }
      }
      console.log(this.randomIndexes);
    },
    // resetGame() {
    //   const randomIndexes = new Array(2);
    //   for (let i = 0; i < randomIndexes.length; i += 1) {
    //     randomIndexes[i] = Math.floor(Math.random() * 9);
    //   }
    //   for (let index = 0; index < this.items.length; index += 1) {
    //     if (randomIndexes.includes(index)) {
    //       this.items[index].bomb = true;
    //     } if (this.items[index].isActive === true) {
    //       this.items[index].isActive = false;
    //     } else if (this.loseMsg === true) {
    //       this.loseMsg = false;
    //       console.log(this.loseMsg);
    //     }
    //   }
    // },
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
  padding: 40px;
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
