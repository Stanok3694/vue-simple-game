new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        firstLaunch: true,
        currentState: '',
        turns: []
    },
    methods:{
        // main game logic section
        startGame: function () {
            this.gameIsRunning = true;
            this.firstLaunch = false;

            this.playerHealth = 100;
            this.monsterHealth = 100;
            
            this.currentState = 'begin';
            this.setLogElementsInTurns(this.currentState);          
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

            this.currentState = 'heal';
            this.setLogElementsInTurns(this.currentState);
            
            this.monsterAttack(5,12);
        },
        giveUp: function () {
            this.gameIsRunning = false;

            this.currentState = 'lose';
            this.setLogElementsInTurns(this.currentState);
        },

        // service section
        playerAttack: function(min, max){
            var dealDamage = this.calculateDamage(min,max);
            this.monsterHealth -= dealDamage;

            this.currentState = 'player-attack';
            this.setLogElementsInTurns(this.currentState, dealDamage);
        },
        monsterAttack: function(min,max){
            var dealDamage = this.calculateDamage(min,max);
            this.playerHealth -= dealDamage;

            this.currentState = 'monster-attack';
            this.setLogElementsInTurns(this.currentState, dealDamage);
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        winStatus: function() {
            if(this.monsterHealth <= 0){
                this.gameIsRunning = false;

                this.currentState = 'win';
                this.setLogElementsInTurns(this.currentState);
                return true;
            } else if (this.playerHealth <= 0){
                this.gameIsRunning = false;

                this.currentState = 'lose';
                this.setLogElementsInTurns(this.currentState);
                return true;
            }
            return false;
        },
        setLogElementsInTurns: function (currentState, additionalInfo) {
            if(currentState == 'begin') this.turns.unshift({
                text: 'Battle begins...',
                isFirstLaunch: true
            })
            if(currentState == 'player-attack') this.turns.unshift({
                text: 'Player hits Monster for ' + additionalInfo,
                isPlayer: true,
                isPlayerFeelGood: true
            })
            if(currentState == 'monster-attack') this.turns.unshift({
                text: 'Monster hits Player for ' + additionalInfo,
                isPlayer: false
            })
            if(currentState == 'heal') {
                this.turns.unshift({
                    text: 'Player heals himself for 10',
                    isPlayer: true,
                    isHeal: true
                });
            }
            if(currentState == 'win'){
                this.turns = [];
                this.turns.unshift({
                    text: 'Glory day! You won in your battle!',
                    isPlayer: true,
                    isPlayerWin: true
                });
            }
            if(currentState == 'lose'){
                this.turns = [];
                this.turns.unshift({
                    text: 'No glory - no mercy! You lost your own battle!',
                    isPlayer: true,
                    isPlayerFeelGood: false
                })
            }
        }
    }
})