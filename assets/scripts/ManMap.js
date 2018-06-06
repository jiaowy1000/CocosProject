var Global = require("Global");
var CardBag = require("CardBag");

cc.Class({
    extends: cc.Component,

    properties: {
        room:{
            default:null,
            type:cc.Prefab,
            roomId:"room0",
            roomType:0
        },
        roomData:{
            default:null,
            type:Array
        },
        hero:{
            default:null,
            type:dragonBones.ArmatureDisplay
        },
        armature:null,
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


        if(cc.sys.isNative){
          
            cc.loader.load(jsb.fileUtils.getWritablePath()+'kk1.json', function(err,res){
                if (err) {  
                    cc.log(err);  
                     cc.log(err);  
                      cc.log(err); 
                       cc.log(err); 
                }else{
                    cc.log("res:"+JSON.stringify(res));
                    Global.gameData = res; 
                        cc.log("writeStringToFile:"+jsb.fileUtils.writeStringToFile(JSON.stringify(Global), jsb.fileUtils.getWritablePath()+'kk1.json'));  
                }  
            });
        }
        
        var salf = this;
       

        this.loadData(salf.loadRoomcallBack,salf);
        this.armature = this.hero.armature();
        this.armature.animation.fadeIn("Move", -1, 0, 0, "ONEANIMATION");
    },
    loadRoomcallBack(roomData,salf){
        cc.director.preloadScene("Battlefield", function () {
            cc.log("Next scene preloaded");
        });
        //localStorage.setItem('key', "123遛啦遛啦");
        for(var i=0;i<roomData.length;i++){
            salf.createRoom(parseInt(cc.random0To1()*8),salf.getRoomPosition(roomData[i]),i);
        }
        salf.hero.node.zIndex=100;
        if(Global.x&&Global.y){
            salf.hero.node.setPosition(cc.p(Global.x,Global.y))
        }

    },
    
    loadData(loadRoomcallBack){
        var salf = this;
        cc.loader.load(cc.url.raw('resources/roomPosition.json'), function(err,res){
            if (err) {  
                cc.log(err);  
            }else{
                let roomList=res.root;  
                salf.roomData = roomList;
                loadRoomcallBack(roomList,salf);
            }  
        });
    },

    createRoom(ui,p,id){
        //localStorage.setItem('key', "123遛啦遛啦");
        var salf = this;
        var newRoom = cc.instantiate(this.room);
        var roomScript = newRoom.getComponent('Room');
        roomScript.setRoom(ui);
        newRoom.roomId="room"+id;
        newRoom.roomType = ui;
        salf.node.getChildByName("manmap").addChild(newRoom);
        newRoom.on(cc.Node.EventType.MOUSE_UP, function(event){
            cc.log(event.target.getPosition().x+"===y="+event.target.getPosition().y);
            Global.x = event.target.getPosition().x;
            Global.y = event.target.getPosition().y;
            var heroMove = cc.moveTo(1,event.target.getPosition());
            var finished = cc.callFunc(function(target) {
                this.armature.animation.fadeIn("Move", -1, 0, 0, "ONEANIMATION");
                this.node.runAction(cc.sequence(cc.fadeOut(1.0),cc.callFunc(
                    function(){cc.director.loadScene("Battlefield");}
                )));
            }, salf);
            var myseq = cc.sequence(heroMove,finished);
            salf.hero.node.runAction(myseq);
            salf.armature.animation.fadeIn("pao2", -1, 0, 0, "ONEANIMATION");
        });
        
        newRoom.on(cc.Node.EventType.MOUSE_ENTER, function ( event ){
            //cc.log("c"+event.target.roomId);
        });
        newRoom.setPosition(p);
    },
    getRoomPosition(roomPosition){
        return cc.p(roomPosition.x,roomPosition.y);
    },

    start () {
    },

    update (dt) {

    },
});
