<template>
<div>
  <button class="btn-field" v-if="!items.length" @click="createField(fieldLengthX, fieldLengthY)">3x3</button>
 <div class="field" :class="{disabled: isDisabled}">
    <div class="row" v-for="(row, rowIndex) in items" :key="rowIndex">
      <div v-for="(item, index) in row" :key="index"
           class="cell" :class="{active: item.isActive}"
           @click="checkCell(item)">
      </div>
    </div>
  </div>
 <div ><button class="start-btn" @click="resetGame()">Restart</button></div>
 <h1 v-if="loseMsg" class="gameower">You Lose</h1>
 <h1 v-else-if="winMsg" class="game-win">You Win!</h1>
</div>
</template>

<script>
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default {
  name: 'Sapper',
  data() {
    return {
      loseMsg: false,
      winMsg: false,
      isDisabled: false,
      items: [],
      fieldLengthX: 3,
      fieldLengthY: 3,
      bombsCount: 2,
    };
  },
  computed: {
  },
  methods: {
    createField(lengthX, lengthY) {
      this.items = [];
      for (let i = 0; i < lengthY; i++) {
        const row = [];
        for (let j = 0; j < lengthX; j++) {
          row.push({ bomb: false, isActive: false });
        }
        this.items.push(row);
      }

      for (let bombsPlanted = 0; bombsPlanted < this.bombsCount;) {
        const x = getRandomInt(lengthX);
        const y = getRandomInt(lengthY);
        if (!this.items[y][x].bomb) {
          this.items[y][x].bomb = true;
          bombsPlanted++;
          console.log({ y, x });
        }
      }
    },
    checkCell(item) {
      if (!item.bomb && !this.loseMsg && !item.isActive) {
        item.isActive = true;
      } else if (item.bomb && !this.winMsg) {
        this.loseMsg = true;
        this.isDisabled = true;
      }

      let openItemsLength = 0;
      const cellsCount = this.fieldLengthX * this.fieldLengthY;
      for (let y = 0; y < this.items.length; y++) {
        const row = this.items[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x].isActive) {
            openItemsLength++;
          }
        }
      }

      if (openItemsLength === cellsCount - this.bombsCount) {
        this.winMsg = true;
        this.isDisabled = true;
      }
    },

    resetGame() {
      this.createField(this.fieldLengthX, this.fieldLengthY);
      this.loseMsg = false;
      this.winMsg = false;
      this.isDisabled = false;
    },
  },
};
</script>

<style scoped>
.field {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
.field.disabled {
  pointer-events: none;
}
.row {
  display: flex;
}
.cell {
  background-color: black;
  padding: 25px;
  margin: 1px;
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
