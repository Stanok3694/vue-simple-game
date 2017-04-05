new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        firstLaunch: true, 
        stepCounter: 0,
        allPutDamage: 0,
        allGetDamage: 0,
        turns: []
    },
    methods:{
        // main methods section
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.firstLaunch = false,
            this.stepCounter = 0,
            this.allPutDamage = 0,
            this.allGetDamage = 0,
            this.turns = [],
            this.turns.unshift({
                isFirstLaunch: true,
                text: 'Battle begins...'
            });
        },
        attack: function () {
            this.playerAttack(3,10);

            if(this.winStatus()){
                return;
            }
            this.monsterAttack(5,12);                 
            this.winStatus();  
        },
        specialAttack: function () {
            this.playerAttack(5,12);          
            if(this.winStatus()){
                return;
            }
            this.monsterAttack(8,22);                 
            this.winStatus();
        },
        heal: function () {
            if (this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                    isPlayer: true,
                    isPlayerFeelGood: true,
                    text: 'Player heals himself for 10'
            });
            this.monsterAttack(5,12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = [];
            this.turns.unshift({
                isPlayer: true,
                isPlayerFeelGood: false,
                text: 'No glory - no mercy! You lost your own battle!'
            });
        },
        // service section
        playerAttack: function(min, max){
            var dealDamage = this.calculateDamage(min,max);
            this.monsterHealth -= dealDamage;
            this.allPutDamage += dealDamage;
            this.stepCounter += 1;
            this.turns.unshift({
                isPlayer: true,
                isPlayerFeelGood: true,
                text: 'Player hits Monster for' + dealDamage
            });
        },
        monsterAttack: function(min,max){
            var dealDamage = this.calculateDamage(min,max);
            this.playerHealth -= dealDamage;
            this.turns.unshift({
                isPlayer: false,
                isPlayerFeelGood: false,
                text: 'Monster hits Player for' + dealDamage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        winStatus: function() {
            if(this.monsterHealth <= 0){
                this.gameIsRunning = false;
                this.turns = [];
                this.turns.unshift({
                    isPlayer: true,
                    isPlayerWin: true,
                    text: 'Glory day! You won in your battle!'
                });
                return true;
            } else if (this.playerHealth <= 0){
                this.giveUp();
                return true;
            }
            return false;
        }
    }
})