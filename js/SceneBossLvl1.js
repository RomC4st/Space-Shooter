class SceneBossLvl1 extends Phaser.Scene {
  constructor() {
    super({ key: "SceneBossLvl1" })
  }
  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, `BOSS`, {
      fontFamily: 'monospace',
      fontSize: 38,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }
  update() {

  }
}
