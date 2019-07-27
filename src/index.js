import Phaser from "phaser";
import Server from "./server/Server";
import MainMenuScene from "./scenes/MainMenuScene";
import PlayerSetupScene from "./scenes/PlayerSetupScene";
import GameScene from "./scenes/GameScene";

const config = {
  title:    "Crazy 8 Smackdown",
  version:  "0.0.1",
  width:    800,
  height:   600,
  type:     Phaser.AUTO,
  parent:   "game",
  input: {
    keyboard: true,
    mouse:    true,
    touch:    true,
    gamepad:  false,
  },
  render: {
    pixelArt:   true,
    antialias:  true,
  },
  backgroundColor: "0xF5F5F5",
  scene: [ MainMenuScene, PlayerSetupScene, GameScene ],
};

new Phaser.Game(config);
