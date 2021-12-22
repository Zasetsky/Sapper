<template>
<div>
 <div class="field">
  <div v-for="(item, index) in items" :key="index"
  class="cell" :class="{active: item.isActive}"
  @click="checkCell(item)">{{ item }}</div>
  <div><button @click.once="random()"></button></div>
 </div>
 <h1 v-if="loseMsg.val === 1" class="game-result">You Lose!</h1>
</div>
</template>

<script>

export default {
  name: 'Sapper',
  data() {
    return {
      loseMsg: { val: 0 },
      items: [
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
        { val: 0, isActive: false },
      ],
    };
  },
  computed: {
  },
  methods: {
    checkCell(item) {
      if (item.val === 0 && this.loseMsg.val === 0 && item.isActive === false) {
        item.isActive = true;
      } else if (item.val > 0) {
        this.loseMsg.val = 1;
      }
    },
    random() {
      const randomIndexes = new Array(2);
      for (let i = 0; i < randomIndexes.length; i += 1) {
        randomIndexes[i] = Math.floor(Math.random() * 9);
      }
      for (let index = 0; index < this.items.length; index += 1) {
        if (randomIndexes.includes(index)) {
          this.items[index].val = 1;
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
