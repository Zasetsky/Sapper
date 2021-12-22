<template>
<div>
 <div class="field">
  <div v-for="(item, index) in items" :key="index"
  class="cell" :class="{active: item.isActive}"
  @click="checkCell(item)">{{ item }}</div>
  <div><button @click.once="random()"></button></div>
 </div>
 <h1 v-if="loseMsg === true" class="game-result">You Lose!</h1>
</div>
</template>

<script>

export default {
  name: 'Sapper',
  data() {
    return {
      loseMsg: false,
      items: [
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
        { bomb: false, isActive: false },
      ],
    };
  },
  computed: {
  },
  methods: {
    checkCell(item) {
      if (item.bomb === false && this.loseMsg === false && item.isActive === false) {
        item.isActive = true;
      } else if (item.bomb === true) {
        this.loseMsg = true;
      }
    },
    random() {
      const randomIndexes = new Array(2);
      for (let i = 0; i < randomIndexes.length; i += 1) {
        randomIndexes[i] = Math.floor(Math.random() * 9);
      }
      for (let index = 0; index < this.items.length; index += 1) {
        if (randomIndexes.includes(index)) {
          this.items[index].bomb = true;
        }
      }
      console.log(randomIndexes);
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
.cell {
  background-color: black;
  padding: 40px;
  color: black;
  font-size: 0;
}
.cell.active {
  background-color: grey;
}
.game-result {
  text-align: center;
}
</style>
