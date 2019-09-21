class SceneEnd extends Phaser.Scene {
  constructor() {
    super({ key: "SceneEnd" });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, `Congratulations,`, {
      fontFamily: 'monospace',
      fontSize: 38,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.text = this.add.text(this.game.config.width * 0.5, 128, `You save the galaxy`, {
      fontFamily: 'monospace',
      fontSize: 38,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.displayScore = this.add.text(this.game.config.width * 0.5, 128, `Your score: ${options.points}`, {
      fontFamily: 'monospace',
      fontSize: 38,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
    this.text.setOrigin(0.5, -0.5)
    this.displayScore.setOrigin(0.5, -1.5)

    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown"),
    };
    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );
    this.btnRestart.setInteractive();
    this.btnRestart.on("pointerover", function () {
      this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);
    this.btnRestart.on("pointerout", function () {
      this.setTexture("sprBtnRestart");
    });
    this.btnRestart.on("pointerdown", function () {
      this.btnRestart.setTexture("sprBtnRestartDown");
      this.sfx.btnDown.play();
    }, this);
    this.btnRestart.on("pointerup", function () {
      this.btnRestart.setTexture("sprBtnRestart");
      // delete all properties of object options
      const difficulty_options = options.difficulty
      const bossLives = 15
      const bossLvl = true
      for (const prop of Object.getOwnPropertyNames(options)) {
        delete options[prop];
      }
      options["difficulty"] = difficulty_options
      options["bossLvl1Life"] = bossLives
      options["bossLvl1"] = bossLvl
      this.scene.start("SceneMain");
      // console.log(this.Player)
    }, this);
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  };

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
  }
  
