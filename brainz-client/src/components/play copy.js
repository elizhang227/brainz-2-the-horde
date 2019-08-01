import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react';

const worldWidth = 1600;
const worldHeight = 1600;
const gameWidth = 800;
const gameHeight = 600;
let enemyCount = 2;
let kills = 0;
let wave = 1;
let life = 3;
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
        initialize: false,
        game: {
            width: "100%",
            height: "100%",
            type: Phaser.AUTO,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0
                    },
                    debug: false
                }
            },
            scene: {
                extend: {
                    player: null,
                    enemy: null,
                    healthpoints: null,
                    reticle: null,
                    moveKeys: null,
                    playerBullets: null,
                    enemyBullets: null,
                    time: 0,
                    enemyHitCallback: function (enemyHit, bulletHit) {
                        // Reduce health of enemy
                        if (bulletHit.active === true && enemyHit.active === true) {
                            enemyHit.health = enemyHit.health - 1;
                            console.log("Enemy hp: ", enemyHit.health);

                            // Kill enemy if health <= 0
                            if (enemyHit.health <= 0) {
                                enemyHit.setActive(false).setVisible(false);
                            }

                            // Destroy bullet
                            bulletHit.setActive(false).setVisible(false);
                        }
                    },

                    playerHitCallback: function (playerHit, bulletHit) {
                        // Reduce health of player
                        if (bulletHit.active === true && playerHit.active === true) {
                            playerHit.health = playerHit.health - 1;
                            console.log("Player hp: ", playerHit.health);

                            // Destroy bullet
                            bulletHit.setActive(false).setVisible(false);
                        }
                    },

                    enemyFire: function (enemy, player, time, gameObject) {

                        if (enemy.active === false) {
                            return;
                        }

                        if ((time - enemy.lastFired) > 1000) {
                            enemy.lastFired = time;

                            // Get bullet from bullets group
                            var bullet = this.enemyBullets.get().setActive(true).setVisible(true);

                            if (bullet) {
                                bullet.fire(this.enemy, this.player);
                                // Add collider between bullet and player
                                gameObject.physics.add.collider(this.player, bullet, this.playerHitCallback);
                            }
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
                    console.log(this.scene)
                    console.log(this.game)
                    console.log('this', this)
                    this.cameras.main.setBackgroundColor('#24252A')
                },
                preload: function () {
                    // Load in images and sprites
                    this.load.spritesheet('player_handgun', 'assets/sprites/player_handgun.png',
                        { frameWidth: 66, frameHeight: 60 }
                    ); // Made by tokkatrain: https://tokkatrain.itch.io/top-down-basic-set
                    this.load.image('bullet', 'assets/sprites/bullets/bullet6.png');
                    this.load.image('target', 'assets/demoscene/ball.png');
                    this.load.image('background', 'assets/skies/underwater1.png');
                },
                create: function () {
                    // Set world bounds
                    this.physics.world.setBounds(0, 0, 1600, 1200);
                    // Add 2 groups for Bullet objects
                    this.playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
                    this.enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

                    console.log(this.playerBullets)
                    // Add background player, enemy, reticle, healthpoint sprites
                    var background = this.add.image(800, 600, 'background');
                    this.player = this.physics.add.sprite(800, 600, 'player_handgun');
                    this.enemy = this.physics.add.sprite(300, 600, 'player_handgun');
                    this.reticle = this.physics.add.sprite(800, 700, 'target');

                    // Set image/sprite properties
                    background.setOrigin(0.5, 0.5).setDisplaySize(1600, 1200);
                    this.player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
                    this.enemy.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true);
                    this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);

                    // Set sprite variables
                    this.player.health = 3;
                    this.enemy.health = 3;
                    this.enemy.lastFired = 0;

                    // Set camera properties
                    this.cameras.main.zoom = 0.5;
                    this.cameras.main.startFollow(this.player);

                    let bro = this.game
                    let controlPlayer = this.player;
                    // Creates object for input with WASD kets
                    this.moveKeys = this.input.keyboard.addKeys({
                        'up': Phaser.Input.Keyboard.KeyCodes.W,
                        'down': Phaser.Input.Keyboard.KeyCodes.S,
                        'left': Phaser.Input.Keyboard.KeyCodes.A,
                        'right': Phaser.Input.Keyboard.KeyCodes.D
                    });
                    let controlMoves = this;

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
                        if (controlPlayer.active === false)
                            return;

                        // Get bullet from bullets group
                        var bullet = this.playerBullets.get().setActive(true).setVisible(true);

                        if (bullet) {
                            bullet.fire(this.player, this.reticle);
                            this.physics.add.collider(this.enemy, bullet, this.enemyHitCallback);
                        }
                    }, this);

                    // Pointer lock will only work after mousedown
                    this.game.canvas.addEventListener('mousedown', function () {
                        bro.input.mouse.requestPointerLock();
                    });

                    // Exit pointer lock when Q or escape (by default) is pressed.
                    this.input.keyboard.on('keydown_Q', function (event) {
                        if (this.input.mouse.locked)
                            this.input.mouse.releasePointerLock();
                    }, 0, this);

                    // Move reticle upon locked pointer move
                    this.input.on('pointermove', function (pointer) {
                        if (this.input.mouse.locked) {
                            this.reticle.x += pointer.movementX;
                            this.reticle.y += pointer.movementY;
                        }
                    }, this);
                },
                update: function (time, delta) {
                    // Rotates player to face towards reticle
                    this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.reticle.x, this.reticle.y);

                    // Rotates enemy to face towards player
                    this.enemy.rotation = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y);

                    //Make reticle move with player
                    this.reticle.body.velocity.x = this.player.body.velocity.x;
                    this.reticle.body.velocity.y = this.player.body.velocity.y;

                    // Constrain velocity of player
                    this.constrainVelocity(this.player, 500);

                    // Constrain position of constrainReticle
                    this.constrainReticle(this.reticle, this.player);

                    // Make enemy fire
                    // this.enemyFire(this.enemy, this.player, time, this.game);
                }
            }
        }
    }

    componentDidMount = () => {
        this.initializeGame();
    }

    initializeGame = () => {
        const { game } = this.state
        // this.ionPhaser.game = game
        this.setState({ initialize: true })

        setTimeout(() => {
            console.log(game.instance)
        }, 3000)
    }

    render() {
        const { initialize, game } = this.state
        return (
            <div>
                <IonPhaser game={game} initialize={initialize} />
            </div>
        )
    }
}

export default Play;