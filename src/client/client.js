import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import MainMenuScene from './scenes/MainMenuScene';
import PlayerSetupScene from './scenes/PlayerSetupScene';

const config = {
  title:    'Crazy 8 Smackdown',
  version:  '1.0',
  type:     Phaser.AUTO,
  parent:   'game',
  input: {
    keyboard: true,
    mouse:    true,
    touch:    true,
    gamepad:  false,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  render: {
    pixelArt:   true,
    antialias:  true,
  },
  backgroundColor: '0xF5F5F5',
  dom: {
    createContainer: true,
  },
  scene: [ MainMenuScene, PlayerSetupScene, GameScene ],
};

new Phaser.Game(config);
