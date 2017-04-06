new Vue({
    el:"#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        firstLaunch: true,
        currentState: 'begin', 
        // stepCounter: 0,
        // allPutDamage: 0,
        // allGetDamage: 0,
        turns: []
    },
    methods:{
        // main methods section
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.firstLaunch = false
            this.setLogElementsInTurns('begin');
            // statistic variables:
            // this.stepCounter = 0,
            // this.allPutDamage = 0,
            // this.allGetDamage = 0,
            
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
            this.setLogElementsInTurns('heal');
            this.monsterAttack(5,12);
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.setLogElementsInTurns('lose');
        },
        // service section
        playerAttack: function(min, max){
            var dealDamage = this.calculateDamage(min,max);
            this.monsterHealth -= dealDamage;
            this.setLogElementsInTurns('player-attack', dealDamage);
            // this.allPutDamage += dealDamage;
            // this.stepCounter += 1;
        },
        monsterAttack: function(min,max){
            var dealDamage = this.calculateDamage(min,max);
            this.playerHealth -= dealDamage;
            this.setLogElementsInTurns('monster-attack', dealDamage);
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        winStatus: function() {
            if(this.monsterHealth <= 0){
                this.gameIsRunning = false;
                this.setLogElementsInTurns('win');
                return true;
            } else if (this.playerHealth <= 0){
                this.gameIsRunning = false;
                this.setLogElementsInTurns('lose');
                return true;
            }
            return false;
        },
        setLogElementsInTurns: function (currentState, additionalInfo) {
            if(currentState == 'begin') this.turns.unshift({text: 'Battle begins...'})
            if(currentState == 'player-attack') this.turns.unshift({text: 'Player hits Monster for ' + additionalInfo})
            if(currentState == 'monster-attack') this.turns.unshift({text: 'Monster hits Player for ' + additionalInfo})
            if(currentState == 'heal') this.turns.unshift({text: 'Player heals himself for 10'})
            if(currentState == 'win'){
                this.turns = [];
                this.turns.unshift({text: 'Glory day! You won in your battle!'});
            }
            if(currentState == 'lose'){
                this.turns = [];
                this.turns.unshift({text: 'No glory - no mercy! You lost your own battle!'})
            }
        }
    }
})