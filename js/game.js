var config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver,
    SceneBossLvl1
  ],
  pixelArt: true,
  roundPixels: true
}

var game = new Phaser.Game(config);