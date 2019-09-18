class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }
  preload() {
    this.load.image("sprBg0", "content/sprBg0.png");
    this.load.image("sprBg1", "content/sprBg1.png");
    // this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
    this.load.image("EasyMode", "content/easy.png");
    this.load.image("HardMode", "content/hard.png");
    this.load.image("EasyModeDown", "content/easyDown.png");
    this.load.image("HardModeDown", "content/hardDown.png");
    this.load.image("sprBtnPlayDown", "content/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
    this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
    this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");
    this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
    this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }
  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };
    this.btnPlayEasy = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "EasyMode"
    );
    this.btnPlayHard = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "HardMode"
    );
    this.btnPlayEasy.setInteractive();
    this.btnPlayHard.setInteractive();

    this.btnPlayEasy.on("pointerover", function () {
       this.btnPlayEasy.setTexture("EasyModeDown");
      // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnPlayHard.on("pointerover", function () {
       this.btnPlayHard.setTexture("HardModeDown");
      // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnPlayEasy.on("pointerout", function () {
       this.setTexture("EasyMode")
    });
    this.btnPlayHard.on("pointerout", function () {
      this.setTexture("HardMode");
    }) ;

    this.btnPlayEasy.on("pointerup", function () {
      score.difficulty=0
      this.scene.start("SceneMain");
    }, this);
    this.btnPlayHard.on("pointerup", function () {
      score.difficulty=1
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE SHOOTER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.btnPlayHard.setOrigin(0.5,-0.7)
    this.title.setOrigin(0.5);
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