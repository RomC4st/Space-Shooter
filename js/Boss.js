class BossLvl1 extends Entity {

  // create() {
  //   this.title = this.add.text(this.game.config.width * 0.5, 128, `BOSS`, {
  //     fontFamily: 'monospace',
  //     fontSize: 38,
  //     fontStyle: 'bold',
  //     color: '#ffffff',
  //     align: 'center'
  //   });
  //   this.title.setOrigin(0.5);
  // }
  // update() {

  // }
  constructor(scene, x, y) {
    super(scene, x, y, "boss", "BossLvl1");

    this.body.velocity.x = Phaser.Math.Between(50, 60);
    this.body.velocity.y = 0;
    this.shootTimer = this.scene.time.addEvent({
      delay: 500,
      callback: function () {
        var laser = new BossLvl1Laser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
  }
  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
        
      }
    }
  }
}
