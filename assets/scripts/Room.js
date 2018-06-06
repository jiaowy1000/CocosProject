
cc.Class({
    extends: cc.Component,

    properties: {
        roomArray: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    onLoad () {
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.roomArray[this.rt];
        switch (this.rt) {
            case 0:
                this.node.width=120;
                this.node.height=80;
                break;
            case 1:
                this.node.width=75;
                this.node.height=95;
                break;
            case 2:
                this.node.width=100;
                this.node.height=130;
                break;
            case 3:
                this.node.width=90;
                this.node.height=80;
                break;
            case 4:
                this.node.width=80;
                this.node.height=80;
                break;
            case 5:
                this.node.width=115;
                this.node.height=140;
                break;
            case 6:
                this.node.width=120;
                this.node.height=115;
                break;
            case 7:
                this.node.width=100;
                this.node.height=135;
                break;
            default:
                this.node.width=120;
                this.node.height=80;
                break;
        };
    },
    setRoom(roomType){
        this.rt = roomType;
    },
    start () {
    },

    // update (dt) {},
});
