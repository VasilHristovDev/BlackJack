$(window).on('load',function(){
    var delayMs = 1000; // delay in milliseconds
 
    setTimeout(function(){
        $('#myModal').modal('show');
        }, delayMs);
    });
    var scoreP = 0;
    var scoreC = 0;
 
    function start()
    {
        var deck = new Deck([]);
 
        var player = new Player([],0);
        var computer = new Computer([],0);
        deck = setDeck();
        player = setParticipant(player, deck);
        showScore("Pscore",player.score);
        computer = setParticipant(computer, deck);
        showScore("Cscore",computer.score);
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
            this.hand.push(deck.getFirstCard());
        };
        
        this.addCard = function(deck)
        {
            var newCard = deck.getFirstCard();
 
            this.hand.push(newCard);
            this.score += newCard.points;
            
            showCards("PHand", newCard.cardToString());
        };
    }
    function hit(player,deck){
        player.addCard(deck.getFirstCard());
    }
 
    function Computer(hand,score)
    {
        Player.call(this,hand,score);
 
        this.addCard = function(deck)
        {
            var newCard = deck.getFirstCard();
 
            this.hand.push(newCard);
            this.score += newCard.points;
 
            showCards("CHand", newCard.cardToString());
        };
    }
    function showCards(id1, cardName)
    {
            var player = document.getElementById(id1);
            var card = document.createElement("li");
            player.appendChild(card);
            var cardImg = document.createElement("img");
            card.appendChild(cardImg);
            cardImg.setAttribute("src","../Cards/" + cardName+".png");
        
    }
    function showScore(id,score)
    {
        var scoreboard = document.getElementById(id);
        scoreboard.innerHTML+=score;
    }