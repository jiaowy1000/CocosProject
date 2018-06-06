var HandCardsControl = require("HandCardsControl");
var CardBag = require("CardBag");

var Global = require("Global"); 
cc.Class({
    extends: cc.Component,

    properties: {
        battleRole:{
            default:null,
            type:cc.Prefab,
        },
        backBtn: {
            default: null,
            type: cc.Button 
        },
        getCardBtn: {
            default: null,
            type: cc.Button
        },
        cardsControl:{
            default: null,
            type: HandCardsControl
        },
        cardBagBtn:{
            default:null,
            type:cc.Button,
        },
        cardBag:{
            default:null,
            type:CardBag,
        } 
    },

    onLoad () {
        var cardBag = this.cardBag.node;
        cardBag.getComponent("CardBag").hideAll();

        this.cardBagBtn.node.on('click', function (event) {
            cardBag.getComponent("CardBag").showAll();
        });
        this.node.on('cardBagClick', function (event) {
            cardBag.getComponent("CardBag").hideAll();
        }); 
        //var btnName = localStorage.getItem('key');
        var label = this.backBtn.node.getChildByName("Label").getComponent(cc.Label);
        label.string = Global.backLabel;
        var self = this;
        self.backBtn.node.on("click", function (event) {
            cc.director.loadScene("manMap");
        });
        
        var role1 = cc.instantiate(this.battleRole);
        role1.setPosition(cc.p(-300,-150));
        self.node.addChild(role1);
        var myRole = role1.getComponent("BattleRole");
        
        myRole.ready();

        myRole.hpChangeTo(60);

        var role2 = cc.instantiate(this.battleRole);
        role2.setPosition(cc.p(160,-50));
        role2.setScaleX(-1);
        self.node.addChild(role2);
        var enermy = role2.getComponent("BattleRole");
        
        enermy.ready();
        enermy.hpChangeTo(100);
        self.getCardBtn.node.on("click", function (event) {
            //抽牌 随机1-10张
            var carNum = 1+parseInt(cc.random0To1()*10); 
            cc.log('抽牌数量：'+carNum);
            self.cardsControl.getComponent("HandCardsControl").getCardToN(carNum);
        });
        this.node.on('useCard', function (event) {
            myRole.attack(function(){
                self.cardsControl.getComponent("HandCardsControl").useCards(enermy);
                myRole.ready();
            });
        });

        this.node.on('gameover', function (event) {
            cc.log(cc.sys.isNative);
            if(cc.sys.isNative){
                cc.log("writeStringToFile:"+jsb.fileUtils.writeStringToFile(JSON.stringify(Global), jsb.fileUtils.getWritablePath()+'kk.json'));  
            }
            cc.director.loadScene("manMap");
        });

    },

    start () {

    },

    // update (dt) {},
});
