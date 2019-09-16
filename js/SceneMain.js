score = {
  scoreText: '',
  points: 0
}

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });

  }
  preload() {
    this.load.image("sprBg0", "content/sprBg0.png");
    this.load.image("sprBg1", "content/sprBg1.png");
    this.load.spritesheet("sprExplosion", "content/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", "content/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", "content/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "content/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", "content/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "content/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "content/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.audio("SoundLvl1", "content/SoundLvl1.mp3");
    this.load.audio("sndExplode0", "content/sndExplode0.wav");
    this.load.audio("sndExplode1", "content/sndExplode1.wav");
    this.load.audio("sndLaser", "content/sndLaser.wav");
    score.points = 0
    score.scoreText = ''
  }
  create() {
    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });
    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });
    this.sfx = {
      music: this.sound.add("SoundLvl1"),
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    this.sfx.music.play();
    this.sfx.laser.volume = 0.3
    this.sfx.explosions.volume = 0.5
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

    score.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#fff' });

    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.playerLasers = this.add.group();
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
          score.points += 10;
          score.scoreText.setText('score: ' + score.points);
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });
    this.physics.add.collider(this.player, this.enemies, function (player, enemy) {
      if (enemy) {
        if (player.onDestroy !== undefined) {
          player.explode(false)
          player.onDestroy()
        }
      }
    });
    this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
      if (!player.getData("isDead") &&
        !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        var enemy = null;
        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });
  }
  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.up.isDown) {
        this.player.moveUp();
      }
      else if (this.down.isDown) {
        this.player.moveDown();
      }
      if (this.left.isDown) {
        this.player.moveLeft();
      }
      else if (this.right.isDown) {
        this.player.moveRight();
      }
      if (this.space.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }

    }
    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

}