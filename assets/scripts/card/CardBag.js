var CardData = require("CardData");
cc.Class({
    extends: cc.Component,
    properties: {
        cardList: {
            default: [],
            type: CardData
        },
        cardPrefab: cc.Prefab,
        
    },
    onLoad () {
        
        var node = this.node;
        var self = this;
        node.on(cc.Node.EventType.MOUSE_DOWN, function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('cardBagClick', true) );
            event.stopPropagation();

        });

        for (var i = 0; i < this.cardList.length; ++i) {
            var card = cc.instantiate(this.cardPrefab);
            var data = this.cardList[i];
            this.node.addChild(card);
            card.getComponent('CardTemplate').init(data);
        }
    },
    hideAll:function(){
        this.node.setOpacity(0);
    },
    showAll:function(){
        this.node.setOpacity(255);
    } 
   
});