var CardBag = require("CardBag");
var Global = require("Global"); 

cc.Class({
    extends: cc.Component,
    properties: {
        cardPrefab: cc.Prefab,
    },
    onLoad () {
        //应该由卡包和Global.js做互动
        var node = this.node;
        var self = this;
        node.on(cc.Node.EventType.MOUSE_DOWN, function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('cardBagClick', true) );
            event.stopPropagation();

        });
        //玩家的手牌包裹，尚未载入真实数据
        for (var i = 0; i < Global.curCardIDs.length; i++) {
            var card = cc.instantiate(this.cardPrefab);
            //var data = this.cardList[i];
            var cardID = Global.curCardIDs[i];
            this.node.addChild(card);
            card.getComponent('CardTemplate').init(cardID);
        }
    },
    hideAll:function(){
        this.node.setOpacity(0);
    },
    showAll:function(){
        this.node.setOpacity(255);
    } 
   
});