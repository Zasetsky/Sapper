<template>
<div>
  <button class="btn-field" v-if="!items.length" @click="createField(fieldLengthX, fieldLengthY)">Start</button>
 <div class="field" oncontextmenu="return false;" :class="{disabled: isDisabled}">
    <div class="row" v-for="(row, rowIndex) in items" :key="rowIndex">
      <div v-for="(item, index) in row" :key="index"
           class="cell" :class="getCellClasses(item)"
           @click="checkCell(index, rowIndex)" @click.right="getFlag(index, rowIndex)">
      </div>
    </div>
  </div>
 <div ><button class="start-btn" v-if="items.length" @click="resetGame()">Restart</button></div>
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
      fieldLengthX: 9,
      fieldLengthY: 9,
      bombsCount: 8,
    };
  },

  methods: {

    createField(lengthX, lengthY) {
      this.items = [];
      for (let i = 0; i < lengthY; i++) {
        const row = [];
        for (let j = 0; j < lengthX; j++) {
          row.push({
            bomb: false,
            isActive: false,
            bombsCountAround: 0,
            flag: false,
          });
        }
        this.items.push(row);
      }

      for (let bombsPlanted = 0; bombsPlanted < this.bombsCount;) {
        const x = getRandomInt(lengthX);
        const y = getRandomInt(lengthY);
        if (!this.items[y][x].bomb) {
          this.items[y][x].bomb = true;
          bombsPlanted++;
        }
      }
    },

    checkCell(itemX, itemY) {
      const item = this.items[itemY][itemX];
      if (!this.loseMsg && !item.isActive && !item.flag) {
        item.isActive = true;
        this.countBombsAround(itemX, itemY);
      } if (item.bomb && !this.winMsg && !item.flag) {
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

    getFlag(itemX, itemY) {
      const cell = this.items[itemY][itemX];
      if (!cell.isActive && !this.winMsg && !this.loseMsg) {
        cell.flag = !cell.flag;
      }
    },

    resetGame() {
      this.createField(this.fieldLengthX, this.fieldLengthY);
      this.loseMsg = false;
      this.winMsg = false;
      this.isDisabled = false;
    },

    countBombsAround(x, y) {
      let bombsAround = 0;
      if (this.items[y - 1] && this.items[y - 1][x] && this.items[y - 1][x].bomb) {
        bombsAround++;
      } if (this.items[y - 1] && this.items[y - 1][x - 1] && this.items[y - 1][x - 1].bomb) {
        bombsAround++;
      } if (this.items[y][x - 1] && this.items[y][x - 1].bomb) {
        bombsAround++;
      } if (this.items[y + 1] && this.items[y + 1][x - 1] && this.items[y + 1][x - 1].bomb) {
        bombsAround++;
      } if (this.items[y + 1] && this.items[y + 1][x] && this.items[y + 1][x].bomb) {
        bombsAround++;
      } if (this.items[y + 1] && this.items[y + 1][x + 1] && this.items[y + 1][x + 1].bomb) {
        bombsAround++;
      } if (this.items[y][x + 1] && this.items[y][x + 1].bomb) {
        bombsAround++;
      } if (this.items[y - 1] && this.items[y - 1][x + 1] && this.items[y - 1][x + 1].bomb) {
        bombsAround++;
      }
      this.items[y][x].bombsCountAround = bombsAround;
    },

    getBombsCountClass(cell) {
      if (cell.bombsCountAround === 0) {
        return 'empty';
      }
      return `grid${cell.bombsCountAround}`;
    },

    getCellClasses(cell) {
      const classes = [];
      if (cell.isActive) {
        classes.push('active');
        if (cell.bomb) {
          classes.push('bomb');
        } else {
          classes.push(this.getBombsCountClass(cell));
        }
      } else if (cell.flag) {
        classes.push('flag');
      }
      return classes;
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
  background: url('../data/images/Grid.png') no-repeat;
  padding: 16px;
  cursor: pointer;
  margin: 1px;
}
.cell.active {
  pointer-events: none;
}
.empty {
  background: url('../data/images/empty.png') no-repeat;
}
.flag {
  background: url('../data/images/flag.png') no-repeat;
}
.grid1 {
  background: url('../data/images/grid1.png') no-repeat;
}
.grid2 {
  background: url('../data/images/grid2.png') no-repeat;
}
.grid3 {
  background: url('../data/images/grid3.png') no-repeat;
}
.grid4 {
  background: url('../data/images/grid4.png') no-repeat;
}
.grid5 {
  background: url('../data/images/grid5.png') no-repeat;
}
.grid6 {
  background: url('../data/images/grid6.png') no-repeat;
}
.grid7 {
  background: url('../data/images/grid7.png') no-repeat;
}
.grid8 {
  background: url('../data/images/grid8.png') no-repeat;
}
.bomb {
  background: url('../data/images/mineClicked.png') no-repeat;
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
