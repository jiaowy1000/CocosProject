
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var name    = "armatureName";
        // 获取组件对象
        var ar = this.getComponent(dragonBones.ArmatureDisplay);
        ar.playAnimation('jump', 0);
    },

    start () {

    }

    //update (dt) {}
});
