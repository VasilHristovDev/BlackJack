$(window).on('load',function(){
    var delayMs = 1000; // delay in milliseconds

    setTimeout(function(){
        $('#myModal').modal('show');
        }, delayMs);
    });    
    function Start(){

    }
    function Back(){
        window.location = "Deck.html";
    }
     var output = document.getElementById("output");
            function Card(name,color)
            {
                this.name = name;
                this.color = color;  
            }
            function Computer(hand)
            {
                this.hand = hand;
            }
            function shuffleDeck(deck) {
            for (var x = deck.length - 1; x > 0; x--) {
                var holder = Math.floor(Math.random() * (x + 1));
                var temp = deck[x];
                deck[x] = deck[holder];
                deck[holder] = temp;
            }
            return deck;
        }
            var Deck = [];
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
                       newCard.color = "♦";
                   }
                   
                   if(j==2)
                   {
                       newCard.color = "♥";
                   }
                   
                   if(j==3)
                   {
                       newCard.color = "♠";
                   }
                   
                   if(j==4)
                   {
                       newCard.color = "♣";
                   }
                    Deck[current_card_index] = newCard;
                    current_card_index++;
                }
            }