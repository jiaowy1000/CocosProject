var rotateArr = [0,-3 ,-9 ,-15 ,-20 ,-27];

cc.Class({
    extends: cc.Component,

    properties: {
        curCardNode: cc.Node,
        all: cc.Node,
        left: cc.Node,
        right: cc.Node,
        node1: cc.Node,
        node2: cc.Node,
        node3: cc.Node,
        node4: cc.Node,
        node5: cc.Node,
        node6: cc.Node,
        node7: cc.Node,
        node8: cc.Node,
        node9: cc.Node,
        node10: cc.Node,
        cardPrefab: cc.Prefab,
        curCard:null,
        curCardNum:0,
        handALlHum:0,
    },
    onLoad(){
        this.node.on('MOUSE_ENTER',function(event){
            event.target.parent.parent.getComponent("CardTemplate").toGrow();
        });
        this.node.on('MOUSE_LEAVE',function(event){
            event.target.parent.parent.getComponent("CardTemplate").toGrowBack();
        });
        var self = this;
        this.node.on('MOUSE_DOWN',function(event){
            //event.target.parent.getComponent("CardTemplate").chooseThis();
            self.chooseCard(event.target.parent.parent); 
        });
    },
    chooseCard:function(cardNode){
        if(this.curCard){
            if(cardNode.getComponent("CardTemplate").id!=curCard.getComponent("CardTemplate").id){
                this.curCard = event.target;
                this.curCardNum = 1;
                this.curCard.getComponent("CardTemplate").chooseThis();
            }
        }else{
            this.curCardNum +=1;
            cardNode.getComponent("CardTemplate").chooseThis();
        }
    },
    useCards:function(enermy){
        this.getCardToN(this.handALlHum - this.curCardNum);
        
        enermy.hpChange(-5*this.curCardNum);
        this.curCardNum = 0;
    },
    chooseNone:function(){

    },
    getOneCard:function(){

    },
    getCardToN:function(num){
        if(num<2){
            num=2;
        }
        this.handALlHum = num;
        for(var i=1;i<=10;i++){
            this["node"+i].removeAllChildren();
            this["node"+i].setRotation(0);
        }
        var ji = num%2==1;
        if(ji){
            this.all.setPosition(cc.p(45,0));
            this.right.setPosition(cc.p(0,-10));
            this.node5.setPosition(cc.p(-45,35));
        }else{
            this.all.setPosition(cc.p(0,0));
            this.right.setPosition(cc.p(0,5));
            this.node5.setPosition(cc.p(-45,45));
        }
        var a = parseInt((10 - num)/2) + 1;
        for(var i=0;i<num;i++){
            var card = cc.instantiate(this.cardPrefab);
            //应该从牌包里抽牌，但现在先随机抽一个cardID 0-9的牌
            var cardID = parseInt(cc.random0To1()*10);
            this["node"+(a+i)].addChild(card);
            card.getComponent('CardTemplate').init(cardID);
            // var data = {cardId:0,cardText1:"对指定敌人造成5点物理伤害",cardText2:"额外造成2点物理伤害",cardText1:"攻击强度+1"} ;
            // var getSpriteTempURL = function(a){ return "resources/img/card/card"+(a+1)+".png"}.bind(this,i); 
            // data.cardPicURL = getSpriteTempURL();
            // cc.log(data.cardPicURL);
        }
        if(ji){
            for(var i=1;i<=10;i++){
                if(i<5){
                    this["node"+i].setRotation(rotateArr[5-i]);
                }else if(i>5){
                    this["node"+i].setRotation(-rotateArr[i-5]);
                }
            }
        }else{
            for(var i=1;i<=10;i++){
                if(i<=5){
                    this["node"+i].setRotation(rotateArr[6-i]);
                }else{
                    this["node"+i].setRotation(-rotateArr[i-5]);
                }
            }
        }
    },
    start () {

    },
});
