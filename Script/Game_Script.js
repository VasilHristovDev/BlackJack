$(window).on('load',function(){
    var delayMs = 1000; // delay in milliseconds
 
    setTimeout(function(){
        $('#myModal').modal('show');
        }, delayMs);
    });
    var scoreP = 0;
    var scoreC = 0;
    var globalP = new Player([],0);
    var globalC = new Computer([],0);
    var gDeck = new Deck([]);
    var scoreboard;
    
    
 
    function start()
    {
        
 
       
        gDeck = setDeck();
        globalP = setParticipant(globalP, gDeck);
        showScore("Pscore",globalP.score);
        checkScore(globalP);
        globalC = setParticipant(globalC, gDeck);
        showScore("Cscore",globalC.score);
    }
    
 
    function back()
    {
        window.location = "Deck.html";
    }
 
    function setParticipant(participant, deck)
    {
        for (var x = 0; x <= 1; x++) 
        {
            participant.addCard(deck);   
        }
 
        return participant;
    }
 
    function setDeck()
    {
        var deck = new Deck([]);
        var current_card_index = 0;
        let suites = ["D","H","S","C"];
        for(var i =2;i<=14;i++)
        {
            
            for(var j = 0;j<=3;j++)
            {
                var newCard = new Card("","");
                switch(i)
                {
                    case 11:
                    newCard.name = "J";
                    newCard.points = 10;
                    break;
                    case 12:
                    newCard.name = "Q";
                    newCard.points = 10;
                    break;
                    case 13: 
                    newCard.name = "K";
                    newCard.points = 10;
                    break;
                    case 14:
                    newCard.name = "A";
                    newCard.points = 11;
                    break;
                    default:
                    newCard.name = i.toString();
                    newCard.points = i;
                    break;
                }
                newCard.color = suites[j];
                
                deck.cards[current_card_index] = newCard;
                current_card_index++;
            }
        }
 
        deck.shuffleDeck();
 
        return deck;
    }
 
    function Card(name,color)
    {
        this.name = name;
        this.color = color;
        this.points = 0;
        
        this.cardToString = function()
        {
            return (this.name + this.color).toString()
        }
    }
 
    function Deck(cards)
    {
        this.cards = cards;
 
        this.shuffleDeck = function()
        {
            for (var x = cards.length - 1; x > 0; x--) 
            {
                var holder = Math.floor(Math.random() * (x + 1));
                var temp = cards[x];
                cards[x] = cards[holder];
                cards[holder] = temp;
            }
        };
 
        this.getFirstCard = function()
        {
            return cards.shift(0);
        };
    }
 
    function Player(hand,score)
    {
        this.hand = hand;
        this.score = score;
 
        this.hit = function(deck)
        {
            var newCard = deck.getFirstCard()
            this.hand.push(newCard);
            this.score += newCard.points;
            checkScore(this);
            if(checkScore(this))
            {
                showScore("Pscore","LOST");
            }
            else{
            showScore("Pscore",this.score);
            showCards("PHand", newCard.cardToString());
            }
        };
        
        this.addCard = function(deck)
        {
            var newCard = deck.getFirstCard();
 
            this.hand.push(newCard);
            this.score += newCard.points;
            
            showCards("PHand", newCard.cardToString());
        };
        
    }
   
 
    function Computer(hand,score)
    {
        Player.call(this,hand,score);
        var counter = 0;
        this.addCard = function(deck)
        {
            var newCard = deck.getFirstCard();
 
            this.hand.push(newCard);
            this.score += newCard.points;
            if(counter==0)
            {
                showCards("CHand", "yellow_back");
            }
            else
            {
                showCards("CHand", newCard.cardToString());
            }
            counter++;
        };
    }
    function showCards(id, cardName)
    {
            var player = document.getElementById(id);
            var card = document.createElement("li");
            player.appendChild(card);
            var cardImg = document.createElement("img");
            card.appendChild(cardImg);
            cardImg.setAttribute("src","../Cards/" + cardName+".png");
        
    }
    function showScore(id,score)
    {
        scoreboard = document.getElementById(id);
        scoreboard.innerHTML="Score:"+score;
    }
    function checkScore(player)
    {
       if(player.score>21)
       {
        alert("BUSTED");
        alert("Computer Wins");
        return true;
       }
       if(player.score==21)
       {
        console.log("BLACKJACK!");
       }     
    }
    