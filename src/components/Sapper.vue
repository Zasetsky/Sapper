<template>
<div>
  <button class="btn-field" v-if="!cells.length" @click="bombsCount = 2, createField(fieldLengthX = 3, fieldLengthY = 3)">Easy</button>
  <br>
  <button class="btn-field" v-if="!cells.length" @click="bombsCount = 5, createField(fieldLengthX = 6, fieldLengthY = 6)">Medium</button>
  <br>
  <button class="btn-field" v-if="!cells.length" @click="bombsCount = 8, createField(fieldLengthX = 9, fieldLengthY = 9)">Hard</button>
  <br>
  <h3 v-if="!cells.length"><a href="https://github.com/" target="_blank">Author</a></h3>
 <div class="field" oncontextmenu="return false;" :class="{disabled: isDisabled}">
    <div class="row" v-for="(row, y) in cells" :key="y">
      <button v-for="(cell, x) in row" :key="x"
           class="cell" :class="getCellClasses(cell)"
           @click="checkCell(x, y)" @click.right="getFlag(x, y)" />
    </div>
  </div>
 <div ><button class="start-btn" v-if="cells.length" @click="resetGame()">Restart</button></div>
 <h1 v-if="isLoseMsg" class="gameower">You Lose</h1>
 <h1 v-else-if="isWinMsg" class="game-win">You Win!</h1>
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
      isLoseMsg: false,
      isWinMsg: false,
      cells: [],
      fieldLengthX: 0,
      fieldLengthY: 0,
      bombsCount: 0,
    };
  },

  computed: {
    openCellsLength() {
      let openCellsLength = 0;
      for (let y = 0; y < this.cells.length; y++) {
        const row = this.cells[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x].isActive) {
            openCellsLength++;
          }
        }
      }
      return openCellsLength;
    },
    cellsCount() {
      return this.fieldLengthX * this.fieldLengthY;
    },
    isDisabled() {
      return this.isLoseMsg || this.isWinMsg;
    },
  },

  methods: {
    createField(lengthX, lengthY) {
      this.cells = [];
      for (let i = 0; i < lengthY; i++) {
        const row = [];
        for (let j = 0; j < lengthX; j++) {
          row.push({
            isBomb: false,
            isActive: false,
            bombsCountAround: null,
            isFlag: false,
          });
        }
        this.cells.push(row);
      }
      for (let bombsPlanted = 0; bombsPlanted < this.bombsCount;) {
        const x = getRandomInt(lengthX);
        const y = getRandomInt(lengthY);
        if (!this.cells[y][x].isBomb) {
          this.cells[y][x].isBomb = true;
          bombsPlanted++;
        }
      }
    },

    checkCell(x, y) {
      const cell = this.cells[y][x];
      if (!this.isDisabled && !cell.isActive && !cell.isFlag) {
        cell.isActive = true;
        this.countBombsAround(x, y);
        if (cell.bombsCountAround === 0) {
          this.openEmptyCells(x, y);
        }
      }
      if (cell.isBomb && !cell.isFlag) {
        this.isLoseMsg = true;
      }
      if (this.openCellsLength === this.cellsCount - this.bombsCount) {
        this.isWinMsg = true;
      }
    },

    openEmptyCells(x, y) {
      if (this.cells[y - 1]) {
        if (this.cells[y - 1][x]) {
          this.countBombsAround(x, y - 1);
          const cell = this.cells[y - 1][x];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x, y - 1);
          }
        }
        if (this.cells[y - 1][x - 1]) {
          this.countBombsAround(x - 1, y - 1);
          const cell = this.cells[y - 1][x - 1];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x - 1, y - 1);
          }
        }
        if (this.cells[y - 1][x + 1]) {
          this.countBombsAround(x + 1, y - 1);
          const cell = this.cells[y - 1][x + 1];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x + 1, y - 1);
          }
        }
      }
      if (this.cells[y + 1]) {
        if (this.cells[y + 1][x]) {
          this.countBombsAround(x, y + 1);
          const cell = this.cells[y + 1][x];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x, y + 1);
          }
        }
        if (this.cells[y + 1][x - 1]) {
          this.countBombsAround(x - 1, y + 1);
          const cell = this.cells[y + 1][x - 1];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x - 1, y + 1);
          }
        }
        if (this.cells[y + 1][x + 1]) {
          this.countBombsAround(x + 1, y + 1);
          const cell = this.cells[y + 1][x + 1];
          if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
            this.checkCell(x + 1, y + 1);
          }
        }
      }
      if (this.cells[y][x - 1]) {
        this.countBombsAround(x - 1, y);
        const cell = this.cells[y][x - 1];
        if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
          this.checkCell(x - 1, y);
        }
      }
      if (this.cells[y][x + 1]) {
        this.countBombsAround(x + 1, y);
        const cell = this.cells[y][x + 1];
        if (cell.bombsCountAround === 0 && !cell.isFlag && !cell.isBomb) {
          this.checkCell(x + 1, y);
        }
      }
    },

    getFlag(x, y) {
      const cell = this.cells[y][x];
      if (!cell.isActive && (!this.isWinMsg || !this.isLoseMsg)) {
        cell.isFlag = !cell.isFlag;
      }
    },

    resetGame() {
      this.cells = [];
      this.isLoseMsg = false;
      this.isWinMsg = false;
      this.bombsCount = 0;
      this.fieldLengthX = 0;
      this.fieldLengthY = 0;
    },

    countBombsAround(x, y) {
      let bombsAround = 0;
      if (this.cells[y - 1]) {
        if (this.cells[y - 1][x] && this.cells[y - 1][x].isBomb) {
          bombsAround++;
        }
        if (this.cells[y - 1][x - 1] && this.cells[y - 1][x - 1].isBomb) {
          bombsAround++;
        }
        if (this.cells[y - 1][x + 1] && this.cells[y - 1][x + 1].isBomb) {
          bombsAround++;
        }
      }
      if (this.cells[y + 1]) {
        if (this.cells[y + 1][x] && this.cells[y + 1][x].isBomb) {
          bombsAround++;
        }
        if (this.cells[y + 1][x - 1] && this.cells[y + 1][x - 1].isBomb) {
          bombsAround++;
        }
        if (this.cells[y + 1][x + 1] && this.cells[y + 1][x + 1].isBomb) {
          bombsAround++;
        }
      }
      if (this.cells[y][x - 1] && this.cells[y][x - 1].isBomb) {
        bombsAround++;
      }
      if (this.cells[y][x + 1] && this.cells[y][x + 1].isBomb) {
        bombsAround++;
      }
      this.cells[y][x].bombsCountAround = bombsAround;
    },

    getBombsCountClass(cell) {
      if (cell.bombsCountAround === 0) {
        return 'empty';
      }
      return `grid${cell.bombsCountAround}`;
    },

    getCellClasses(cell) {
      const classes = [];
      if (cell.isFlag) {
        classes.push('flag');
      }
      if (cell.isActive) {
        classes.push('active');
        if (cell.isBomb) {
          classes.push('bombClicked');
        } else {
          classes.push(this.getBombsCountClass(cell));
        }
      } else if (this.isDisabled) {
        if (!cell.isBomb && cell.isFlag) {
          classes.push('falseBomb');
        } else if (cell.isBomb && !cell.isFlag) {
          classes.push('bomb');
        }
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
 a{
   text-decoration: none;
   color: black;
 }
.btn-field {
  margin: 10px;
  cursor: pointer;
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
.bombClicked {
  background: url('../data/images/mineClicked.png') no-repeat;
}
.bomb {
  background: url('../data/images/mine.png') no-repeat;
}
.falseBomb {
  background: url('../data/images/mineFalse.png') no-repeat;
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
