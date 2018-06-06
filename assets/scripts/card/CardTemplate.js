var CardsAll = require("CardsAll");
cc.Class({
    extends: cc.Component,

    properties: {
        cardId: 0,
        defaultNode: cc.Node,
        picSprite: cc.Sprite,
        cardText1: cc.Label,
        cardText2: cc.Label,
        cardText3: cc.Label,
        choose:false,
    },
    init: function (cardId) {
        //以卡片id就可以初始化，应该引入CardAll，从其中取数据 和 图片信息
        this.cardId = cardId;
        var cardsAll = cc.director.getScene().getChildByName('CardsAll');  
        var cardsAllComponent = cardsAll.getComponent("CardsAll");
        this.cardText1.string = cardsAllComponent.getCardByID(cardId).cardText1; 
        this.cardText2.string = cardsAllComponent.getCardByID(cardId).cardText2
        this.cardText3.string = cardsAllComponent.getCardByID(cardId).cardText3; 
        this.picSprite.spriteFrame=cardsAllComponent.getCardByID(cardId).cardPic;
    },
    onLoad(){
        //cc.log("this card id:"+this.id);
        if(!this.defaultNode){
            return;
        }
        var node = this.defaultNode; 
        node.on(cc.Node.EventType.MOUSE_ENTER, function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('MOUSE_ENTER', true) );
        });
        node.on(cc.Node.EventType.MOUSE_LEAVE, function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('MOUSE_LEAVE', true) );
        });
        node.on(cc.Node.EventType.MOUSE_DOWN, function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('MOUSE_DOWN', true) );
        });
        node.on(cc.Node.EventType.MOUSE_MOVE, function ( event ){
        });
    },
    scaleBig2smallCircle:function(){
        var bt = cc.scaleTo(0.5, 0.9);
        var st = cc.scaleTo(0.8,1);
        var seq = cc.sequence(bt,st);
        var rep = cc.repeatForever(seq);
        this.nod.runAction(rep);
    },
    //抽出来
    toGrow:function(){
        this.node.stopAllActions();
        var actionBy = cc.moveTo(0.3, cc.p(0, 65));
        this.node.runAction(actionBy);
    },
    //缩回去
    toGrowBack:function(){
        if(this.choose){
            return;
        }
        this.node.setScale(1);
        this.node.stopAllActions();
        var actionBy = cc.moveTo(0.3, cc.p(0, 0));
        this.node.runAction(actionBy);
    },
    chooseThis:function(){ 
        this.choose = !this.choose;
        if(this.choose){
            this.node.stopAllActions();
            this.node.setPosition(cc.p(0,65));
        }else{
            this.node.stopAllActions();
            this.node.setPosition(cc.p(0,0));
        }
        this.node.setScale(1.1);
    },
    onDisable:function(){
        //应该在这删除鼠标监听事件
        this.node.destroy();
    },
    start () {

    },
});
