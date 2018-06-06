var CardData = require("CardData");
cc.Class({
    extends: cc.Component,
    properties: {
        cardList: {
            default: [],
            type: CardData
        }
    },
    onLoad () {
        cc.log("添加常驻节点");
        cc.game.addPersistRootNode(this.node);  
    },
    getCardByID:function(cardID){
        return this.cardList[""+cardID];
    },
    hideAll:function(){
        this.node.setOpacity(0);
    },
    showAll:function(){
        this.node.setOpacity(255);
    }
   
});