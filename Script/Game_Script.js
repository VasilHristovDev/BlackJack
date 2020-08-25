$(window).on('load',function(){
    var delayMs = 1000; // delay in milliseconds

    setTimeout(function(){
        $('#myModal').modal('show');
        }, delayMs);
    });

    function start()
    {
        var deck = new Deck([]);

        var player = new Player([]);
        var computer = new Computer([]);

        deck = setDeck();

        player = setParticipant(player, deck);
        computer = setParticipant(computer, deck);
  

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

        for(var i =2;i<=14;i++)
        {
            
            for(var j = 1;j<=4;j++)
            {
                var newCard = new Card("","");
                switch(i)
                {
                    case 11:
                    newCard.name = "J";
                    break;
                    case 12:
                    newCard.name = "Q";
                    break;
                    case 13: 
                    newCard.name = "K";
                    break;
                    case 14:
                    newCard.name = "A";
                    break;
                    default:
                    newCard.name = i;
                    break;
                }
             
                if(j==1)
                {
                   newCard.color = "D";
                }
               
                if(j==2)
                {
                   newCard.color = "H";
                }
               
                if(j==3)
                {
                   newCard.color = "S";
                }
               
                if(j==4)
                {
                   newCard.color = "C";
                }
                
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
            return cards.shift(0).toString();
        };
    }

    function Player(hand)
    {
        this.hand = hand;

        this.hit = function(deck)
        {
            this.hand.push(deck.getFirstCard());
            
        };
        
        this.addCard = function(deck)
        {
            this.hand.push(deck.getFirstCard());
           var parent = document.getElementById("PHand");
           var card = document.createElement("li");
           parent.appendChild(card);
           var img = document.createElement("img");
           card.appendChild(img);
           img.setAttribute("src","../Cards/"+deck.getFirstCard());
           card.value = deck.getFirstCard();
           card.text = deck.getFirstCard();
            

        };
    }

    function Computer(hand)
    {
        Player.call(this, hand);
    }