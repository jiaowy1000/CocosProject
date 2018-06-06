var CardData = cc.Class({
    name: 'Card',
    properties: {
        //这几个属性用于显示
        cardId: 0,
        cardText1: '',
        cardText2: '', 
        cardText3: '',
        cardPic:{
            default:null,
            type:cc.SpriteFrame,
        },
        //此外还应该有卡牌的类型，伤害等等一大堆东西
    }
});