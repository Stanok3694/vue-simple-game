new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        // main methods section
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.turns = [],
            this.turns.unshift({
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
                    text: 'Player heals himself for 10'
            });
            this.monsterAttack(5,12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
            alert('You are the weak scum! You lose!');
        },
        // service section
        playerAttack: function(min, max){
            var dealDamage = this.calculateDamage(min,max);
            this.monsterHealth -= dealDamage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for' + dealDamage
            });
        },
        monsterAttack: function(min,max){
            var dealDamage = this.calculateDamage(min,max);
            this.playerHealth -= dealDamage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for' + dealDamage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        winStatus: function() {
            if(this.monsterHealth <= 0){
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0){
                if(confirm('You lost! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})