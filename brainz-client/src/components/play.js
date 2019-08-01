import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import MainContainer from '../sharedComponents/mainContainer';

const worldWidth = 1600;
const worldHeight = 1600;
const gameWidth = 800;
const gameHeight = 600;
let enemyCount = 2;
let kills = 0;
let wave = 1;
let life = 1231231231231231231231231231231231231;
let run = false;

var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

        // Bullet Constructor
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.speed = 1;
            this.born = 0;
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.setSize(12, 12, true);
        },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target) {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

class Play extends Component {

    state = {
        score: {
            kills: 0,
            wave: 1
        },
        redirect: false,
        initialize: false,
        game: {
            width: gameWidth,
            height: gameHeight,
            type: Phaser.AUTO,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0
                    },
                    debug: true
                }
            },
            scene: {
                extend: {
                    changeScore: null,
                    player: null,
                    enemies: null,
                    healthpoints: null,
                    reticle: null,
                    moveKeys: null,
                    playerBullets: null,
                    waveText: '',
                    killText: '',
                    lifeText: '',
                    enemyHitCallback: function (enemyHit, bulletHit) {
                        // Reduce health of enemy
                        if (bulletHit.active === true && enemyHit.active === true) {
                            enemyHit.health = enemyHit.health - 1;

                            // Kill enemy if health <= 0
                            if (enemyHit.health <= 0) {
                                kills++;
                                enemyHit.destroy();
                            }

                            // Destroy bullet
                            bulletHit.setActive(false).setVisible(false);
                        }
                    },
                    gotCaught: function (enemy, player) {
                        enemy.attack = true;

                        if (this.time.now > enemy.invincibleTimer) {
                            life--;
                            enemy.invincibleTimer = this.time.now + 1000;
                        }
                    },
                    // Ensures sprite speed doesnt exceed maxVelocity while update is called
                    constrainVelocity: function (sprite, maxVelocity) {
                        if (!sprite || !sprite.body)
                            return;

                        var angle, currVelocitySqr, vx, vy;
                        vx = sprite.body.velocity.x;
                        vy = sprite.body.velocity.y;
                        currVelocitySqr = vx * vx + vy * vy;

                        if (currVelocitySqr > maxVelocity * maxVelocity) {
                            angle = Math.atan2(vy, vx);
                            vx = Math.cos(angle) * maxVelocity;
                            vy = Math.sin(angle) * maxVelocity;
                            sprite.body.velocity.x = vx;
                            sprite.body.velocity.y = vy;
                        }
                    },

                    // Ensures reticle does not move offscreen
                    constrainReticle: function (reticle, player) {

                        var distX = reticle.x - player.x; // X distance between player & reticle
                        var distY = reticle.y - player.y; // Y distance between player & reticle

                        // Ensures reticle cannot be moved offscreen (player follow)
                        if (distX > 800)
                            reticle.x = player.x + 800;
                        else if (distX < -800)
                            reticle.x = player.x - 800;

                        if (distY > 600)
                            reticle.y = player.y + 600;
                        else if (distY < -600)
                            reticle.y = player.y - 600;
                    }
                },
                init: function () {
                    //For Testing Purposes

                    // console.log(this.scene)
                    // console.log(this.game)
                    // console.log('this', this)
                },
                preload: function () {
                    // Load in images and sprites
                    this.load.spritesheet('player_handgun', './assets/sprites/player_handgun.png', { frameWidth: 66, frameHeight: 60 });
                    for (let i = 0; i <= 16; i++) {
                        if (i <= 8) {
                            this.load.image(`zombieAttack${i}`, `./assets/animations/zombie/skeleton-attack_${i}.png`);
                        }
                        this.load.image(`zombie${i}`, `./assets/animations/zombie/skeleton-move_${i}.png`);
                    }
                    this.load.image('bullet', './assets/bullet.png');
                    this.load.image('target', './assets/red_crosshair.png');
                    this.load.image('background', './assets/grass.png');
                    this.load.bitmapFont('arcadeTextSmall', './assets/fonts/emu-small/font.png', './assets/fonts/emu-small/font.xml');
                    this.load.bitmapFont('arcadeTextLarge', './assets/fonts/emu-large/font.png', './assets/fonts/emu-large/font.xml');
                },
                create: function () {
                    // Set world bounds
                    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
                    const ourWorld = this.physics.world;

                    let walkAnim = [],
                        attackAnim = [];

                    for (let i = 0; i <= 16; i++) {
                        if (i <= 8) {
                            attackAnim.push({ key: `zombieAttack${i}` });
                        }
                        walkAnim.push({ key: `zombie${i}` });
                    }

                    this.anims.create({
                        key: 'walk',
                        frames: walkAnim,
                        frameRate: 40,
                    });

                    this.anims.create({
                        key: 'attack',
                        frames: attackAnim,
                        frameRate: 12,
                    });

                    // Add background player, enemy, reticle, healthpoint sprites
                    this.add.tileSprite(worldWidth / 2, worldHeight / 2, worldWidth, worldHeight, 'background');

                    this.player = this.physics.add.sprite(worldWidth / 2, worldHeight / 2, 'player_handgun');
                    this.reticle = this.physics.add.sprite(0, 0, 'target');

                    // Add groups for enemies
                    this.enemies = this.physics.add.group({
                        collideWorldBounds: true,
                        setCollideWorldBounds: true,
                        onWorldBounds: true,
                    });

                    // Add groups for Bullet objects
                    this.playerBullets = this.physics.add.group({
                        classType: Bullet,
                        runChildUpdate: true
                    });

                    // Set player and camera in the center in of the screen.
                    this.player.setOrigin(0.5, 0.5).setDisplaySize(32, 32).setCollideWorldBounds(true).setDrag(800, 800);
                    this.cameras.main.startFollow(this.player);

                    //////////////////
                    // TEXT STYLING //
                    //////////////////

                    let waveStartText = this.add.bitmapText(gameWidth / 2, gameHeight / 2, 'arcadeTextLarge', `Wave ${wave}`).setOrigin(0.5, 0.5).setScrollFactor(0);
                    this.waveText = this.add.bitmapText(10, 10, 'arcadeTextSmall', '', 12).setScrollFactor(0);
                    this.killsText = this.add.bitmapText(300, 10, 'arcadeTextSmall', '', 12).setScrollFactor(0);
                    this.lifeText = this.add.bitmapText(700, 10, 'arcadeTextSmall', '', 12).setScrollFactor(0);

                    this.time.delayedCall(1000, () => {
                        // Remove Wave Text
                        waveStartText.setText('')

                        // Creation of our enemy sprites
                        for (let i = 0; i < Math.round(enemyCount); i++) {
                            let randX = Phaser.Math.Between(0, ourWorld.bounds.width)
                            let randY;

                            if ((randX >= 0 && randX <= (ourWorld.bounds.width - gameWidth) / 2) || (randX >= ourWorld.bounds.width - (gameWidth / 2) && randX <= ourWorld.bounds.width)) {
                                randY = Phaser.Math.Between(0, ourWorld.bounds.height)

                            } else {
                                let randomTopBottom = [
                                    Phaser.Math.Between(0, (ourWorld.bounds.height - gameHeight) / 2),
                                    Phaser.Math.Between(ourWorld.bounds.height - (gameHeight / 2), ourWorld.bounds.height)
                                ];

                                randY = randomTopBottom[Phaser.Math.Between(0, 1)]
                            }

                            this.enemies.create(randX, randY, 'zombie0').setOrigin(0.5, 0.5).setDisplaySize(30, 30).setCollideWorldBounds(true);
                        }

                        // Set Reticle properties
                        this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

                        // Set sprite letiables
                        this.player.health = 399999999999999999999999999;
                        this.player.body.immovable = true;
                        this.enemies.getChildren().forEach(e => {
                            e.attack = false;
                            e.health = 1;
                            e.invincibleTimer = 0;
                            e.anims.play('walk', true);
                            this.physics.add.collider(e, this.player, this.gotCaught, null, this);
                            e.anims.play('walk', true);
                            e.on('animationcomplete', () => { // if an animation ends play the idle animation
                                e.anims.play('walk');
                            });
                        });

                        ////////////////////////////
                        // KEYBOARD FUNCTIONALITY //
                        ////////////////////////////

                        this.moveKeys = this.input.keyboard.addKeys({
                            'up': Phaser.Input.Keyboard.KeyCodes.W,
                            'down': Phaser.Input.Keyboard.KeyCodes.S,
                            'left': Phaser.Input.Keyboard.KeyCodes.A,
                            'right': Phaser.Input.Keyboard.KeyCodes.D
                        });

                        let controlMoves = this;
                        let controlPlayer = this.player;

                        // Enables movement of player with WASD keys
                        this.input.keyboard.on('keydown_W', function (event) {
                            controlPlayer.setAccelerationY(-800);
                        });
                        this.input.keyboard.on('keydown_S', function (event) {
                            controlPlayer.setAccelerationY(800);
                        });
                        this.input.keyboard.on('keydown_A', function (event) {
                            controlPlayer.setAccelerationX(-800);
                        });
                        this.input.keyboard.on('keydown_D', function (event) {
                            controlPlayer.setAccelerationX(800);
                        });

                        // Stops player acceleration on uppress of WASD keys
                        this.input.keyboard.on('keyup_W', function (event) {
                            if (controlMoves.moveKeys['down'].isUp)
                                controlPlayer.setAccelerationY(0);
                        });
                        this.input.keyboard.on('keyup_S', function (event) {
                            if (controlMoves.moveKeys['up'].isUp)
                                controlPlayer.setAccelerationY(0);
                        });
                        this.input.keyboard.on('keyup_A', function (event) {
                            if (controlMoves.moveKeys['right'].isUp)
                                controlPlayer.setAccelerationX(0);
                        });
                        this.input.keyboard.on('keyup_D', function (event) {
                            if (controlMoves.moveKeys['left'].isUp)
                                controlPlayer.setAccelerationX(0);
                        });

                        // Fires bullet from player on left click of mouse
                        this.input.on('pointerdown', function (pointer, time, lastFired) {
                            if (this.player.active === false) {
                                return;
                            } else {
                                let bullet = this.playerBullets.get().setActive(true).setVisible(true);

                                bullet.fire(this.player, this.reticle);
                                this.physics.add.overlap(this.enemies.getChildren(), bullet, this.enemyHitCallback);
                            }
                        }, this);

                        // Move reticle 
                        this.input.on('pointermove', function (pointer) {
                            this.reticle.x = pointer.worldX;
                            this.reticle.y = pointer.worldY;
                        }, this);

                        run = true
                    }, [], this);
                },

                update: function (time, delta) {

                    // Display Texts
                    this.waveText.setText(`Wave: ${wave}`);
                    this.killsText.setText(`Kills: ${kills}`);
                    this.lifeText.setText(`Life: ${life}`);

                    if (!!run) {
                        // Rotates player to face towards reticle

                        this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

                        // Reticle moves with player
                        this.reticle.body.velocity.x = this.player.body.velocity.x;
                        this.reticle.body.velocity.y = this.player.body.velocity.y;

                        this.enemies.getChildren().forEach(e => {
                            // Rotates enemy to face towards player, adds a damage collier, moves enemy towards player
                            e.rotation = Phaser.Math.Angle.Between(e.x, e.y, this.player.x, this.player.y)
                            if (e.attack) {
                                e.anims.play('attack', true);
                                e.attack = false;
                            }
                            this.physics.moveToObject(e, this.player);
                        });

                        // Collider for our enemies - Stops them from stacking (somewhat)
                        this.physics.add.collider(this.enemies, this.enemies)

                        // Next wave
                        if (this.enemies.getChildren().length === 0) {
                            enemyCount = enemyCount * 1.25;
                            wave++;
                            run = false;
                            this.scene.restart();
                        }

                        if (life <= 0) {
                            this.changeScore(kills, wave)
                        }

                        this.constrainVelocity(this.player, 500);
                    }
                }
            }
        }
    }

    componentDidMount = () => {
        this.initializeGame();
    }

    initializeGame = () => {
        enemyCount = 2;
        kills = 0;
        wave = 1;
        life = 312312312312312313123;
        run = false;
        this.setState({
            initialize: true,
            game: {
                ...this.state.game,
                scene: {
                    ...this.state.game.scene,
                    extend: {
                        ...this.state.game.scene.extend,
                        changeScore: this.changeScore.bind(this)
                    }
                }
            }
        })
    }

    changeScore(playerKills, playerWaves) {
        this.setState({
            score: {
                kills: playerKills,
                wave: playerWaves
            },
            redirect: true
        })
    }

    render() {
        const { initialize, game, redirect } = this.state;
        return (
            <MainContainer style={{ overflow: 'hidden', padding: 0, margin: '20px auto 0' }}>
                {!!redirect ?
                    <Redirect to={{ pathname: '/scores', score: this.state.score }} />
                    :
                    <div className="arcade">
                        <img className="arcadeImg" src="https://i.pinimg.com/originals/21/4f/fe/214ffea513725401b85ad3b9966829ce.png" alt="arcade" />
                        <IonPhaser id="phaserGame" game={game} initialize={initialize} />
                    </div>
                }
            </MainContainer>
        )
    }
}

export default Play;