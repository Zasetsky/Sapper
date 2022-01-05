const icons = require.context('./images', true, /\.png$/);

const cells = {
  empty: icons('./empty.png'),
  grid: icons('./Grid.png'),
  flag: icons('./flag.png'),
  bomb: icons('./mine.png'),
  bombClicked: icons('./mineClicked.png'),
  grid1: icons('./grid1.png'),
  grid2: icons('./grid2.png'),
  grid3: icons('./grid3.png'),
  grid4: icons('./grid4.png'),
  grid5: icons('./grid5.png'),
  grid6: icons('./grid6.png'),
  grid7: icons('./grid7.png'),
  grid8: icons('./grid8.png'),
};

export default cells;
