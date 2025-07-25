function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
}
function rnd(min, max) {
    return Math.random() * (max - min) + min;
}
function randInt(min, max) {
    return Math.floor(rnd(min, max + 1));
}


const PLAYER_SHIP_SPRITES = {
    forward: (() => {
        const img = new window.Image();
        img.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Standard_Ship_Straight_1753464621029.png";
        img.decode?.().catch(()=>{});
        return img;
    })(),
    left: (() => {

        const img = new window.Image();
        img.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Standard_Left_1753464903709.png";
        img.decode?.().catch(()=>{});
        return img;
    })(),
    right: (() => {
        const img = new window.Image();
        img.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Standard_Right_1753464887409.png";
        img.decode?.().catch(()=>{});
        return img;
    })(),
    straight: (() => {

        const img = new window.Image();
        img.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Straight_Standard_1753464841096.png";
        img.decode?.().catch(()=>{});
        return img;
    })()
};

const ENEMY_ANIMATION_FRAMES = [
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_9_1753466011682.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_8_1753466003274.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_6_1753465981879.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_5_1753465972683.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_4_1753465962290.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_3_1753465953600.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Round_Enemy_2_1753465944177.png"
];
const ENEMY_ANIMATION_SPRITES = [];
(function loadEnemySprites() {
    for (let url of ENEMY_ANIMATION_FRAMES) {
        const img = new window.Image();
        img.src = url;
        img.decode?.().catch(()=>{});
        ENEMY_ANIMATION_SPRITES.push(img);
    }
})();


const PLAYER_PROJECTILE_ANIMATION_FRAMES = [
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Player_Projectile_4_1753466972672.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Player_Projectile_1_1753466930619.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Player_Projectile_3_1753466957677.png",
    "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Player_Projectile_2_1753466944134.png"
];
const PLAYER_PROJECTILE_ANIMATION_SPRITES = [];
(function loadPlayerProjectileSprites() {
    for (let url of PLAYER_PROJECTILE_ANIMATION_FRAMES) {
        const img = new window.Image();
        img.src = url;
        img.decode?.().catch(()=>{});
        PLAYER_PROJECTILE_ANIMATION_SPRITES.push(img);
    }
})();









const STAGE1_BG_IMAGE = (() => {
    const img = new window.Image();
    img.src = "https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/0f84fe06-5c42-40c3-b563-1a28d18f37cc/library/Stage_1_Background_1753466264706.png";
    img.decode?.().catch(()=>{});
    return img;
})();


window.Player = class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 22;
        this.color = '#0ff';
        this.speed = 5;
        this.bullets = [];
        this.canShoot = true;
        this.shootDelay = 240; // ms
        this.lastShot = 0;
        this.upgrades = {
            weapon: 0,    // 0: single, 1: double, 2: triple, 3: spread
            homing: false,
            wingmen: 0,   // 0: none, 1: one, 2: two
            shield: 0     // 0: none, 1: one hit, etc.
        };
        this.shieldActive = false;
        this.shieldTimer = 0;
        this.isAlive = true;
        this.input = { left: false, right: false, up: false, down: false, shoot: false };
        this.wingmen = [];
    }

    update(dt, game) {

        let dx = 0, dy = 0;
        if(this.input.left) dx -= 1;
        if(this.input.right) dx += 1;
        if(this.input.up) dy -= 1;
        if(this.input.down) dy += 1;
        let mag = Math.hypot(dx, dy);
        if(mag > 0) {
            dx /= mag;
            dy /= mag;
        }
        this.x = clamp(this.x + dx * this.speed, this.radius, game.width - this.radius);
        this.y = clamp(this.y + dy * this.speed, this.radius, game.height - this.radius);

        if(this.shieldActive) {
            this.shieldTimer -= dt;
            if(this.shieldTimer <= 0) this.shieldActive = false;
        }

        if(this.input.shoot && this.canShoot && this.isAlive) {
            this.shoot(game);
            this.canShoot = false;
            this.lastShot = 0;
        }
        if(!this.canShoot) {
            this.lastShot += dt;
            if(this.lastShot >= this.shootDelay) this.canShoot = true;
        }

        this.updateWingmen(dt, game);

        for(let b of this.bullets) b.update(dt, game);
        this.bullets = this.bullets.filter(b => !b.dead);
    }

    shoot(game) {



        let b = (angle, speed = 9) =>
            new window.Bullet(
                this.x + Math.sin(angle) * 0, // x offset for angle, 0 for up
                this.y - this.radius - 6,
                angle,
                speed,
                '#0ff',
                true,
                this.upgrades.homing
            );

        if(this.upgrades.weapon === 0) {
            this.bullets.push(b(-Math.PI / 2));
        } else if(this.upgrades.weapon === 1) {
            this.bullets.push(b(-Math.PI / 2 - 0.08));
            this.bullets.push(b(-Math.PI / 2 + 0.08));
        } else if(this.upgrades.weapon === 2) {
            this.bullets.push(b(-Math.PI / 2));
            this.bullets.push(b(-Math.PI / 2 - 0.13));
            this.bullets.push(b(-Math.PI / 2 + 0.13));
        } else if(this.upgrades.weapon >= 3) {
            for(let i=-2;i<=2;++i){
                this.bullets.push(b(-Math.PI / 2 + i*0.14));
            }
        }

        for(let wm of this.wingmen) wm.shoot(game);
    }

    updateWingmen(dt, game) {

        while(this.wingmen.length < this.upgrades.wingmen) {
            let offset = this.wingmen.length === 0 ? -38 : 38;
            this.wingmen.push(new window.Wingman(this, offset * (this.wingmen.length === 0 ? -1 : 1)));
        }
        while(this.wingmen.length > this.upgrades.wingmen) {
            this.wingmen.pop();
        }
        for(let wm of this.wingmen) wm.update(dt, game);
    }

    getActiveSprite() {

        if (this.input.left && !this.input.right) {
            return PLAYER_SHIP_SPRITES.left;
        }

        if (this.input.right && !this.input.left) {
            return PLAYER_SHIP_SPRITES.right;
        }

        return PLAYER_SHIP_SPRITES.straight;
    }

    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);

        let sprite = this.getActiveSprite();

        if (sprite && sprite.complete && sprite.naturalWidth > 0) {
            let scale = Math.min(
                (this.radius * 2) / sprite.naturalWidth,
                (this.radius * 2) / sprite.naturalHeight
            );
            let w = sprite.naturalWidth * scale;
            let h = sprite.naturalHeight * scale;

            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(sprite, -w / 2, -h / 2, w, h);

        } else {

            let grad = ctx.createLinearGradient(0, -this.radius, 0, this.radius);
            grad.addColorStop(0, '#0ff');
            grad.addColorStop(1, '#036');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, -this.radius);
            ctx.lineTo(this.radius * 0.75, this.radius * 0.85);
            ctx.lineTo(-this.radius * 0.75, this.radius * 0.85);
            ctx.closePath();
            ctx.shadowColor = '#0ff8';
            ctx.shadowBlur = 14;
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff9';
            ctx.beginPath();
            ctx.ellipse(0, -this.radius * 0.45, this.radius * 0.28, this.radius * 0.16, 0, 0, Math.PI*2);
            ctx.fill();
        }

        ctx.restore();
        for(let wm of this.wingmen) wm.draw(ctx);

        if(this.shieldActive || this.upgrades.shield > 0) {
            ctx.save();
            ctx.globalAlpha = this.shieldActive ? 0.7 : 0.25;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 10, 0, Math.PI*2);
            ctx.strokeStyle = '#0ff';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#0ff8';
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.restore();
        }

        for(let b of this.bullets) b.draw(ctx);
    }

    hit(game) {
        if(this.upgrades.shield > 0) {
            this.upgrades.shield -= 1;
            this.shieldActive = true;
            this.shieldTimer = 700;
            if(this.upgrades.shield < 0) this.upgrades.shield = 0;
            return;
        }
        this.isAlive = false;
    }
};

window.Wingman = class Wingman {
    constructor(player, xOffset) {
        this.player = player;
        this.xOffset = xOffset;
        this.yOffset = 16;
        this.bullets = [];
        this.canShoot = true;
        this.shootDelay = 420;
        this.lastShot = 0;
    }
    update(dt, game) {
        this.x = clamp(this.player.x + this.xOffset, 28, game.width - 28);
        this.y = clamp(this.player.y + this.yOffset, 28, game.height - 28);

        if(this.canShoot && this.player.input.shoot) {
            this.shoot(game);
            this.canShoot = false;
            this.lastShot = 0;
        }
        if(!this.canShoot) {
            this.lastShot += dt;
            if(this.lastShot >= this.shootDelay) this.canShoot = true;
        }
        for(let b of this.bullets) b.update(dt, game);
        this.bullets = this.bullets.filter(b => !b.dead);
    }
    shoot(game) {
        this.bullets.push(new window.Bullet(this.x, this.y-22, -Math.PI/2, 8.2, '#7ff', true, this.player.upgrades.homing));
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#6ff';
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
        for(let b of this.bullets) b.draw(ctx);
    }
};

window.Bullet = class Bullet {
    constructor(x, y, angle, speed, color, fromPlayer, homing) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.color = color;
        this.fromPlayer = fromPlayer;
        this.dead = false;
        this.radius = fromPlayer ? 6 : 7;
        this.homing = homing && fromPlayer;
        this.target = null;

        if (this.fromPlayer) {
            this.animFrame = 0;
            this.animTimer = 0;
            this.animFrameInterval = 50; // ms per frame, 20fps
            this.animFrameCount = PLAYER_PROJECTILE_ANIMATION_SPRITES.length;
        }

    }
    update(dt, game) {
        if(this.homing && game) {

            let minDist = 9999, t = null;
            for(let e of game.enemies) {
                let d = Math.hypot(e.x - this.x, e.y - this.y);
                if(d < minDist) {
                    minDist = d; t = e;
                }
            }
            if(t) {
                let desired = Math.atan2(t.y - this.y, t.x - this.x);
                let da = ((desired - this.angle + Math.PI*3) % (Math.PI*2)) - Math.PI;
                this.angle += clamp(da, -0.14, 0.14);
            }
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if(this.x < -20 || this.x > game.width + 20 || this.y < -40 || this.y > game.height + 40) this.dead = true;

        if (this.fromPlayer && this.animFrameCount > 1) {
            this.animTimer += dt;
            while (this.animTimer >= this.animFrameInterval) {
                this.animFrame = (this.animFrame + 1) % this.animFrameCount;
                this.animTimer -= this.animFrameInterval;
            }
        }

    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.fromPlayer && PLAYER_PROJECTILE_ANIMATION_SPRITES.length > 0
            && PLAYER_PROJECTILE_ANIMATION_SPRITES[this.animFrame]
            && PLAYER_PROJECTILE_ANIMATION_SPRITES[this.animFrame].complete
            && PLAYER_PROJECTILE_ANIMATION_SPRITES[this.animFrame].naturalWidth > 0
        ) {
            let w = 24, h = 24; // reasonable size for a projectile
            ctx.save();
            ctx.rotate(this.angle - Math.PI/2); // point upwards
            ctx.globalAlpha = 0.92;
            ctx.drawImage(PLAYER_PROJECTILE_ANIMATION_SPRITES[this.animFrame], -w/2, -h/2, w, h);
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI*2);
            ctx.closePath();
            ctx.shadowColor = this.color + "9";
            ctx.shadowBlur = this.fromPlayer ? 15 : 7;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.84;
            ctx.fill();
        }

        ctx.restore();
    }
};

window.Enemy = class Enemy {
    constructor(type, x, y, hp, speed, color, movePattern) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.maxHp = hp;
        this.speed = speed;
        this.dead = false;
        this.radius = 20;
        this.type = type;
        this.color = color;
        this.movePattern = movePattern;
        this.bullets = [];
        this.shootDelay = 900 + randInt(0,600);
        this.lastShot = 0;
        this.angle = 0;
        this.age = 0;

        this.animFrame = 0;
        this.animTimer = 0;
        this.animFrameCount = ENEMY_ANIMATION_SPRITES.length;
        this.animFrameInterval = 80; // ms per frame, ~12.5fps
    }

    update(dt, game) {
        this.age += dt;

        if(this.movePattern === 'sine') {
            this.x += Math.sin(this.age/410) * 0.95;
            this.y += this.speed;
        } else if(this.movePattern === 'zigzag') {
            this.x += Math.sin(this.age/170) * 2.2;
            this.y += this.speed*1.07;
        } else {
            this.y += this.speed;
        }

        this.lastShot += dt;
        if(this.lastShot > this.shootDelay) {
            this.shoot(game);
            this.lastShot = 0;
        }
        for(let b of this.bullets) b.update(dt, game);
        this.bullets = this.bullets.filter(b => !b.dead);

        if(this.y > game.height + 60) this.dead = true;

        this.animTimer += dt;
        if (this.animTimer > this.animFrameInterval) {
            this.animFrame = (this.animFrame + 1) % this.animFrameCount;
            this.animTimer = 0;
        }
    }

    shoot(game) {
        if(this.type === 'basic' || this.type === 'zigzag') {
            this.bullets.push(new window.Bullet(this.x, this.y + this.radius, Math.PI/2, 5.7, '#f77', false, false));
        }

    }

    hit(dmg) {
        this.hp -= dmg;
        if(this.hp <= 0) this.dead = true;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        let sprite = ENEMY_ANIMATION_SPRITES[this.animFrame % ENEMY_ANIMATION_SPRITES.length];
        if (sprite && sprite.complete && sprite.naturalWidth > 0) {
            let scale = (this.radius * 2) / Math.max(sprite.naturalWidth, sprite.naturalHeight);
            let w = sprite.naturalWidth * scale;
            let h = sprite.naturalHeight * scale;
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(sprite, -w / 2, -h / 2, w, h);
        } else {

            let grad = ctx.createRadialGradient(0,0,8,0,0,this.radius);
            grad.addColorStop(0, this.color);
            grad.addColorStop(1, "#131322");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(0, -this.radius);
            ctx.lineTo(this.radius * 0.75, this.radius * 0.7);
            ctx.lineTo(-this.radius * 0.75, this.radius * 0.7);
            ctx.closePath();
            ctx.shadowColor = this.color+"c";
            ctx.shadowBlur = 13;
            ctx.fill();
        }

        if(this.hp < this.maxHp) {
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = "#fa0";
            let w = 32 * (this.hp/this.maxHp);
            ctx.fillRect(-16, this.radius+6, w, 5);
            ctx.strokeStyle = "#fff9";
            ctx.strokeRect(-16, this.radius+6, 32, 5);
        }
        ctx.restore();
        for(let b of this.bullets) b.draw(ctx);
    }
};

class Stage1BackgroundScroller {
    constructor(canvasWidth, canvasHeight, img) {
        this.img = img;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.scrollSpeed = 1.8; // px per frame, tune as needed
        this.offsetY = 0;
    }

    update(dt) {

        this.offsetY += this.scrollSpeed * dt / 16.6667; // scale for 60fps
        if (!this.img.complete || this.img.naturalHeight === 0) {
            this.offsetY = this.offsetY % this.height;
            return;
        }

        if (this.offsetY >= this.img.naturalHeight) {
            this.offsetY = this.offsetY % this.img.naturalHeight;
        }
    }

    draw(ctx) {
        if (!this.img.complete || this.img.naturalWidth === 0 || this.img.naturalHeight === 0) {

            ctx.fillStyle = "#0a0030";
            ctx.fillRect(0, 0, this.width, this.height);
            return;
        }

        let iw = this.img.naturalWidth;
        let ih = this.img.naturalHeight;


        let scaleX = this.width / iw;
        let scaleY = this.height / ih;
        let scale = Math.max(scaleX, scaleY);

        let drawWidth = iw * scale;
        let drawHeight = ih * scale;

        let yOffset = this.offsetY * scale;


        let yStart = - (drawHeight - yOffset);
        for (let y = yStart; y < this.height; y += drawHeight) {
            ctx.drawImage(this.img, 0, y, drawWidth, drawHeight);
        }

    }
}


window.GameManager = class GameManager {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.bgStageColors = [
            ['#0a0030','#051e2a'], ['#003d52','#16525f'], ['#3c0057','#2d1855'],
            ['#0d0030','#1a0066'], ['#0e2031','#2c3e50'], ['#1a0020','#220037'],
            ['#111f3a','#2e466b'], ['#251f2b','#6d338f'], ['#0a0030','#444'],
            ['#2e1132','#0e0c2b']
        ];
        this.level = 1; // 1-10
        this.stage = 1; // 1-10 for each level
        this.wave = 1;  // 1-10 for each stage
        this.currency = 0;
        this.enemies = [];
        this.player = new window.Player(this.width/2, this.height-70);
        this.lastEnemySpawn = 0;
        this.enemySpawnDelay = 700;
        this.enemyCount = 0;
        this.bullets = [];
        this.paused = false;
        this.inShop = false;
        this.gameOver = false;
        this.victory = false;
        this.menu = true;
        this.shopTimeout = null;

        this.waveState = "playing"; // "playing", "cleared", "transition"
        this.waveTransitionTimer = 0;

        this._waveEnemyCounts = {};
        this._waveEnemyTargetCounts = {}; // Store the random target per wave

        this._stage1BgScroller = new Stage1BackgroundScroller(this.width, this.height, STAGE1_BG_IMAGE);

        this.initCanvas();
        this.initHUD();
        this.initInput();
        this.showMenu();
    }

    initCanvas() {
        let cont = document.getElementById('gameContainer');
        cont.innerHTML = '';
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.tabIndex = 1;
        this.canvas.style.outline = 'none';
        cont.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    initHUD() {

        let old = document.getElementById('hud');
        if(old) old.remove();
        let hud = document.createElement('div');
        hud.id = "hud";
        hud.innerHTML = '';
        document.getElementById('gameContainer').appendChild(hud);
        this.hud = hud;
    }

    displayHUD() {
        let waveMsg = "";
        if (this.waveState === "cleared" || this.waveState === "transition") {
            waveMsg = `<span style="color:#0ff;font-weight:bold;">&nbsp;— Wave Cleared! —</span>`;
        }
        this.hud.innerHTML = `
            <b>Level:</b> ${this.level} &nbsp; 
            <b>Stage:</b> ${this.stage} &nbsp; 
            <b>Wave:</b> ${this.wave} &nbsp; 
            <b>Currency:</b> <span style="color:#0ff">${this.currency}</span>
            ${this.player.upgrades.shield > 0 ? `&nbsp;<b>Shields:</b> <span style="color:#0ff">${this.player.upgrades.shield}</span>` : ``}
            ${waveMsg}
        `;
    }

    initInput() {
        this.keyMap = {};

        window.addEventListener('keydown', (e)=>{
            if(this.paused) return;
            if(e.code === 'ArrowLeft' || e.code === 'KeyA') this.player.input.left = true;
            if(e.code === 'ArrowRight' || e.code === 'KeyD') this.player.input.right = true;
            if(e.code === 'ArrowUp' || e.code === 'KeyW') this.player.input.up = true;
            if(e.code === 'ArrowDown' || e.code === 'KeyS') this.player.input.down = true;
            if(e.code === 'Space') this.player.input.shoot = true;
        });
        window.addEventListener('keyup', (e)=>{
            if(this.paused) return;
            if(e.code === 'ArrowLeft' || e.code === 'KeyA') this.player.input.left = false;
            if(e.code === 'ArrowRight' || e.code === 'KeyD') this.player.input.right = false;
            if(e.code === 'ArrowUp' || e.code === 'KeyW') this.player.input.up = false;
            if(e.code === 'ArrowDown' || e.code === 'KeyS') this.player.input.down = false;
            if(e.code === 'Space') this.player.input.shoot = false;
        });
        this.canvas.addEventListener('mousedown', (e)=>{
            if(this.paused) return;
            this.player.input.shoot = true;
        });
        this.canvas.addEventListener('mouseup', (e)=>{
            this.player.input.shoot = false;
        });
        this.canvas.addEventListener('mouseleave', (e)=>{
            this.player.input.shoot = false;
        });
    }

    showMenu() {
        this.menu = true;
        this.clearOverlays();
        let overlay = document.createElement('div');
        overlay.id = "menuOverlay";
        overlay.innerHTML = `<div class="overlayTitle">🚀 SPACE SHOOTER</div>
            <div style="margin-bottom:16px;">Defeat waves of enemies, earn currency, and upgrade your ship.<br>
            <span style="font-size:0.96em;color:#0ff">Arrows/WASD</span> to move, <span style="font-size:0.96em;color:#0ff">Space/Mouse</span> to shoot.</div>
            <button id="startBtn">Start Game</button>
        `;
        document.getElementById('gameContainer').appendChild(overlay);
        document.getElementById('startBtn').onclick = ()=>{
            this.menu = false;
            this.clearOverlays();
            this.startGame();
        };
    }

    clearOverlays() {
        let ids = ['menuOverlay','shopOverlay','gameOverOverlay','victoryOverlay'];
        for(let id of ids) {
            let el = document.getElementById(id);
            if(el) el.remove();
        }
    }

    startGame() {
        this.level = 1;
        this.stage = 1;
        this.wave = 1;
        this.currency = 0;
        this.enemies = [];
        this.player = new window.Player(this.width/2, this.height-70);
        this.lastEnemySpawn = 0;
        this.enemyCount = 0;
        this.paused = false;
        this.inShop = false;
        this.gameOver = false;
        this.victory = false;
        this.menu = false;
        this.shopTimeout = null;

        this.waveState = "playing";
        this.waveTransitionTimer = 0;

        this._waveEnemyCounts = {};
        this._waveEnemyTargetCounts = {};

        this._stage1BgScroller = new Stage1BackgroundScroller(this.width, this.height, STAGE1_BG_IMAGE);

        this.displayHUD();
        this.render(performance.now());
    }

    nextWave() {
        this.wave++;
        if(this.wave > 10) {
            this.wave = 1;
            this.stage++;
            if(this.stage > 10) {
                this.stage = 1;
                this.level++;
                if(this.level > 10) {

                    this.level = 10;
                    this.stage = 10;
                    this.wave = 10;
                    this.victory = true;
                    this.showVictory();
                    return;
                }
            }
        }
        this.enemies = [];
        this.lastEnemySpawn = 0;
        this.enemyCount = 0;

        this.waveState = "playing";
        this.waveTransitionTimer = 0;
        this.displayHUD();
    }


    /**
     * Saves the current game state (except for overlays and paused flags).
     * Returns a plain object representing the state.
     */
    getGameStateForContinue() {

        function cloneUpgrades(upg) {
            return {
                weapon: upg.weapon,
                homing: upg.homing,
                wingmen: upg.wingmen,
                shield: upg.shield
            };
        }
        return {
            level: this.level,
            stage: this.stage,
            wave: this.wave,
            currency: this.currency,
            playerUpgrades: cloneUpgrades(this.player.upgrades),
            playerShieldActive: this.player.shieldActive,
            playerShieldTimer: this.player.shieldTimer,
            playerIsAlive: this.player.isAlive,
            _waveEnemyTargetCounts: Object.assign({}, this._waveEnemyTargetCounts),
        };
    }

    /**
     * Restores the game state for "continue" after shop.
     * State parameter is the object returned by getGameStateForContinue().
     */
    restoreGameStateFromContinue(state) {
        this.level = state.level;
        this.stage = state.stage;
        this.wave = state.wave;
        this.currency = state.currency;
        this.enemies = [];

        this.player = new window.Player(this.width/2, this.height-70);
        this.player.upgrades = Object.assign({}, state.playerUpgrades);
        this.player.shieldActive = state.playerShieldActive;
        this.player.shieldTimer = state.playerShieldTimer;
        this.player.isAlive = state.playerIsAlive;
        this.lastEnemySpawn = 0;
        this.enemyCount = 0;
        this.paused = false;
        this.inShop = false;
        this.gameOver = false;
        this.victory = false;
        this.menu = false;
        this.shopTimeout = null;
        this.waveState = "playing";
        this.waveTransitionTimer = 0;
        this._waveEnemyCounts = {};
        this._waveEnemyTargetCounts = Object.assign({}, state._waveEnemyTargetCounts || {});

        this._stage1BgScroller = new Stage1BackgroundScroller(this.width, this.height, STAGE1_BG_IMAGE);

        this.initHUD();
        this.initInput();
        this.displayHUD();
    }

    showShop() {
        this.paused = true;
        this.inShop = true;
        this.player.input.shoot = false;
        let overlay = document.createElement('div');
        overlay.id = 'shopOverlay';
        overlay.innerHTML = `
            <div class="overlayTitle">Upgrade Shop</div>
            <div id="shopCurrency">You have <b>${this.currency}</b> currency.</div>
            <div class="shopOptions"></div>
            <button class="continueBtn">Continue</button>
        `;
        let options = [
            {
                name: "Weapon Upgrade",
                desc: ["Double shot", "Triple shot", "Spread shot", "MAX"],
                cost: [14, 32, 55, 0],
                apply: ()=>{ this.player.upgrades.weapon = clamp(this.player.upgrades.weapon+1,0,3);}
            },
            {
                name: "Homing Missiles",
                desc: ["Add homing ability to your shots."],
                cost: [26],
                apply: ()=>{ this.player.upgrades.homing = true; }
            },
            {
                name: "Wingman",
                desc: ["Gain left wingman", "Gain right wingman", "MAX"],
                cost: [18, 38, 0],
                apply: ()=>{ this.player.upgrades.wingmen = clamp(this.player.upgrades.wingmen+1,0,2);}
            },
            {
                name: "Shields",
                desc: ["Gain 1 shield point"],
                cost: [12],
                apply: ()=>{ this.player.upgrades.shield++; }
            }
        ];
        let shop = overlay.querySelector('.shopOptions');

        let btns = [];

        let w = this.player.upgrades.weapon;
        let weapBtn = document.createElement('button');
        weapBtn.className = 'shopBtn';
        let maxed = w >= 3;
        let weapCost = options[0].cost[w] || 0;
        weapBtn.disabled = maxed || this.currency < weapCost;
        weapBtn.innerHTML = `<b>Weapon</b><br>${options[0].desc[w] || "MAX"}<br>
            <span style="color:#0ff">${maxed ? "MAX" : weapCost+" 💰"}</span>`;
        if(!maxed && this.currency>=weapCost) {
            weapBtn.onclick = ()=>{
                this.currency -= weapCost;
                options[0].apply();
                this.showShop();
            };
        }
        shop.appendChild(weapBtn);

        let h = this.player.upgrades.homing;
        let homBtn = document.createElement('button');
        homBtn.className = 'shopBtn';
        homBtn.disabled = h || this.currency<options[1].cost[0];
        homBtn.innerHTML = `<b>Homing</b><br>${options[1].desc[0]}<br>
            <span style="color:#0ff">${h ? "OWNED" : options[1].cost[0]+" 💰"}</span>`;
        if(!h && this.currency>=options[1].cost[0]) {
            homBtn.onclick = ()=>{
                this.currency -= options[1].cost[0];
                options[1].apply();
                this.showShop();
            };
        }
        shop.appendChild(homBtn);

        let wing = this.player.upgrades.wingmen;
        let wingBtn = document.createElement('button');
        wingBtn.className = 'shopBtn';
        let wmaxed = wing >= 2;
        let wingCost = options[2].cost[wing] || 0;
        wingBtn.disabled = wmaxed || this.currency<wingCost;
        wingBtn.innerHTML = `<b>Wingman</b><br>${options[2].desc[wing] || "MAX"}<br>
            <span style="color:#0ff">${wmaxed ? "MAX" : wingCost+" 💰"}</span>`;
        if(!wmaxed && this.currency>=wingCost) {
            wingBtn.onclick = ()=>{
                this.currency -= wingCost;
                options[2].apply();
                this.showShop();
            };
        }
        shop.appendChild(wingBtn);

        let shBtn = document.createElement('button');
        shBtn.className = 'shopBtn';
        shBtn.disabled = this.currency<options[3].cost[0];
        shBtn.innerHTML = `<b>Shield</b><br>${options[3].desc[0]}<br>
            <span style="color:#0ff">${options[3].cost[0]+" 💰"}</span>`;
        if(this.currency>=options[3].cost[0]) {
            shBtn.onclick = ()=>{
                this.currency -= options[3].cost[0];
                options[3].apply();
                this.showShop();
            };
        }
        shop.appendChild(shBtn);


        const savedState = this.getGameStateForContinue();
        overlay.querySelector('.continueBtn').onclick = ()=>{
            this.paused = false;
            this.inShop = false;
            this.clearOverlays();

            this.restoreGameStateFromContinue(savedState);

            this.render(performance.now());
        };

        document.getElementById('gameContainer').appendChild(overlay);
    }


    showGameOver() {
        this.clearOverlays();
        this.gameOver = true;
        let overlay = document.createElement('div');
        overlay.id = "gameOverOverlay";
        overlay.innerHTML = `<div class="overlayTitle">GAME OVER</div>
            <div style="margin-bottom:12px;">You reached Level ${this.level}, Stage ${this.stage}, Wave ${this.wave}.</div>
            <button class="restartBtn">Restart</button>
        `;
        document.getElementById('gameContainer').appendChild(overlay);
        overlay.querySelector('.restartBtn').onclick = ()=>{
            this.clearOverlays();
            this.startGame();
        };
    }

    showVictory() {
        this.clearOverlays();
        let overlay = document.createElement('div');
        overlay.id = "victoryOverlay";
        overlay.innerHTML = `<div class="overlayTitle">VICTORY!</div>
            <div style="margin-bottom:12px;">You conquered all 10 levels!<br>Congratulations, pilot!</div>
            <button class="restartBtn">Play Again</button>
        `;
        document.getElementById('gameContainer').appendChild(overlay);
        overlay.querySelector('.restartBtn').onclick = ()=>{
            this.clearOverlays();
            this.startGame();
        };
    }

    render(ts) {

        if(this.menu) return;
        if(!this._lastTs) this._lastTs = ts;
        let dt = Math.min(33, ts - this._lastTs);
        this._lastTs = ts;

        if(!this.paused && !this.gameOver && !this.victory) {

            this.drawBackground(this.ctx, dt);

            this.player.update(dt, this);

            let wingBullets = [];
            for(let wm of this.player.wingmen) wingBullets.push(...wm.bullets);

            for(let e of this.enemies) e.update(dt, this);

            if (this.waveState === "playing" && !this.inShop) {

                if(this.enemyCount < this.waveEnemyTargetCount()) {
                    if(this.enemies.length < Math.min(5, this.waveEnemyTargetCount() - this.enemyCount)) {
                        if(this.lastEnemySpawn <= 0) {
                            this.spawnEnemy();
                            this.lastEnemySpawn = this.enemySpawnDelay;
                        }
                        this.lastEnemySpawn -= dt;
                    }
                }
            }


            let allPlayerBullets = [...this.player.bullets, ...wingBullets];
            for(let b of allPlayerBullets) {
                for(let e of this.enemies) {
                    if(!b.dead && !e.dead && Math.hypot(b.x-e.x, b.y-e.y) < e.radius+8) {
                        e.hit(1); b.dead = true;
                        if(e.dead) this.currency += this.enemyReward();
                    }
                }
            }

            for(let e of this.enemies) {
                for(let b of e.bullets) {
                    if(!b.dead && this.player.isAlive && Math.hypot(b.x-this.player.x, b.y-this.player.y)<this.player.radius+6) {
                        b.dead = true;
                        this.player.hit(this);
                        if(!this.player.isAlive) {
                            setTimeout(()=>this.showGameOver(), 900);
                        }
                    }
                }
            }

            for(let e of this.enemies) {
                if(!e.dead && this.player.isAlive && Math.hypot(e.x-this.player.x, e.y-this.player.y)<this.player.radius+e.radius-4) {
                    e.dead = true;
                    this.player.hit(this);
                    if(!this.player.isAlive) {
                        setTimeout(()=>this.showGameOver(), 900);
                    }
                }
            }

            this.enemies = this.enemies.filter(e=>!e.dead);


            if (this.waveState === "playing" && this.enemies.length === 0 && this.enemyCount >= this.waveEnemyTargetCount() && !this.inShop) {

                this.waveState = "cleared";
                this.waveTransitionTimer = 0;
            }
            if (this.waveState === "cleared") {
                this.waveTransitionTimer += dt;

                if(this.wave % 5 === 0 && !this.inShop) {
                    setTimeout(()=>this.showShop(), 400);
                }

                if(this.waveTransitionTimer >= 1100) {
                    this.waveState = "transition";
                    this.nextWave();
                }
            }

            this.displayHUD();
        } else {

            this.drawBackground(this.ctx, dt);
        }



        if(this.player.isAlive) this.player.draw(this.ctx);

        for(let e of this.enemies) e.draw(this.ctx);

        if(!this.player.isAlive) this.drawExplosion(this.ctx, this.player.x, this.player.y, ts);

        if(!this.menu && !this.gameOver && !this.victory) requestAnimationFrame((t)=>this.render(t));
    }

    drawBackground(ctx, dt = 16.67) {
        ctx.clearRect(0, 0, this.width, this.height);

        if (this.stage === 1) {
            this._stage1BgScroller.update(dt);
            this._stage1BgScroller.draw(ctx);
        } else {

            let cidx = (this.stage-1)%this.bgStageColors.length;
            let grad = ctx.createLinearGradient(0,0,0,this.height);
            grad.addColorStop(0, this.bgStageColors[cidx][0]);
            grad.addColorStop(1, this.bgStageColors[cidx][1]);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    drawExplosion(ctx, x, y, t) {
        for(let i=0;i<18;++i) {
            let a = i*Math.PI*2/18;
            let r = rnd(0,20) + 18 + Math.sin(t/99+i)*2;
            ctx.save();
            ctx.globalAlpha = 0.11 + Math.sin(t/350+i)*0.12;
            ctx.beginPath();
            ctx.arc(x+Math.cos(a)*r, y+Math.sin(a)*r, 7+r*0.05, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${randInt(160,255)},${randInt(60,200)},${randInt(0,80)},0.8)`;
            ctx.shadowColor = "#fa0";
            ctx.shadowBlur = 21;
            ctx.fill();
            ctx.restore();
        }
    }

    spawnEnemy() {

        let types = ['basic','sine','zigzag'];
        let w = this.wave, s = this.stage, l = this.level;
        let hp = 1 + Math.floor((w+s+l)/6);
        let speed = 1.4 + 0.12*(w+s*0.6+l*0.15);
        let t = (w%3===1) ? 'basic' : ((w%3===2)?'sine':'zigzag');
        let cidx = (this.stage-1)%this.bgStageColors.length;
        let color = ['#f44','#f8c800','#8ff'][(w+s+l)%3];
        let movePattern = t==='sine' ? 'sine' : (t==='zigzag'?'zigzag':'down');
        let x = rnd(40, this.width-40);
        let y = rnd(-20, -80);
        this.enemies.push(new window.Enemy(t, x, y, hp, speed, color, movePattern));
        this.enemyCount++;
    }

    waveEnemyTargetCount() {
        let key = `${this.level}_${this.stage}_${this.wave}`;
        if (!(key in this._waveEnemyTargetCounts)) {
            this._waveEnemyTargetCounts[key] = randInt(15, 20);
        }
        return this._waveEnemyTargetCounts[key];
    }

    waveEnemyCount() {
        return this.waveEnemyTargetCount();
    }

    enemyReward() {

        return 3 + Math.floor(this.wave/3) + Math.floor(this.stage/3) + Math.floor(this.level/2);
    }
};


function initGame() {
    window._game = new window.GameManager();
}

window.addEventListener('DOMContentLoaded', initGame);