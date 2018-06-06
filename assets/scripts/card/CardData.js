var CardData = cc.Class({
    name: 'Card',
    properties: {
        cardId: 0,
        cardText1: '',
        cardText2: '', 
        cardText3: '',
        cardPicURL:'',
    },
    init:function(cardId,cardText1,cardText2,cardText3,cardPicURL){
        this.cardId = cardId;
        this.cardText1=cardText1;
        this.cardText2=cardText2;
        this.cardText3=cardText3;
        if(cardPicURL)
            this.cardPicURL=cardPicURL;
        else{
            this.cardPicURL = cc.url.raw("resources/img/card/card"+cardId+".png")
        }
        return this;
    }
});
CardData.prototype.getInstance = function(){
    return new CardData();
}