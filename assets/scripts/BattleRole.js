var NORMAL_ANIMATION_GROUP = "normal";
cc.Class({
    extends: cc.Component,

    properties: {
        bar: {
            default: null,
            type: cc.ProgressBar
        },
        anim:{
            default:null,
            type:dragonBones.ArmatureDisplay
        },
        _armature:null,
        hp:100,
        callBackHandler:null,
        animName:null,
        defualtButton:{
            default:null,
            type:cc.Button
        }
    },

    onLoad: function () {
        this.anim = this.node.getComponent(dragonBones.ArmatureDisplay);
        this._armature=this.anim.armature();
        //this.anim.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this.completeHandler, this);
        //this.anim.addEventListener(dragonBones.EventObject.LOOP_COMPLETE,this.completeHandler, this); 
        //this.anim.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        //this.anim.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);


        var node = this.node; 
        if(node.name="BattleRole"){
            this.ready();
        }
        this.defualtButton.node.on("click", function ( event ){
            node.dispatchEvent( new cc.Event.EventCustom('useCard', true) );
        }); 
        
    },
    completeHandler:function(event){

        if (event.type === dragonBones.EventObject.LOOP_COMPLETE&&this.animName === event.detail.animationState.name&&this.callBackHandler) {
           
             this.anim.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE);
             this.animName = null;
             this.scheduleOnce(function(){
                 if(this.callBackHandler){
                     this.callBackHandler.call(this);
                     this.callBackHandler = null;
                    
                 }
             });
            
        }
      
    },
    hpChange:function(val){
        this.hp +=val;
        if(this.hp<=0){
            this.bar.progress=0;
            cc.log("gameover")
            this.node.dispatchEvent( new cc.Event.EventCustom('gameover', true) );
        }else{
            this.bar.progress=this.hp/100;
        }
    },

    hpChangeTo:function(val){
        this.hp =val;
        this.bar.progress=this.hp/100;
    },

    playAnimOnceAndCallback:function(animName,cb){
        this._armature.animation.fadeIn(animName, -1,1);
        this.anim.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.completeHandler, this)
        this.callBackHandler = cb;
        this.animName = animName;
        //this._armature.animation.fadeIn(animName, -1, -1, 0, NORMAL_ANIMATION_GROUP);
    }, 

    attack:function(cb){
        this.playAnimOnceAndCallback('attack', cb);

    },
    injured:function(cb){
        this.playAnimOnceAndCallback('injured', cb);
    },
    ready:function(){
        this._armature.animation.fadeIn('stand', -1,0);
    },

    start () {
        
    },


});
