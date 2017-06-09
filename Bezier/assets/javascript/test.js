cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        Bollean: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        let p1 = {x: 100,y: 200};
        let p2 = {x: 200,y: 500};
        this.Graphics = this.node.getComponent(cc.Graphics);
        this.Graphics.strokeColor=cc.Color.RED;
        this.Graphics.lineWidth=10;
        this.Graphics.moveTo(p1.x,p1.y);
        this.Graphics.lineTo(p2.x,p2.y);
        this.Graphics.fill();
        this.Graphics.stroke();
        
        this.Bollean.position = p1;
        

        
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            cc.log("mousemove" + event.touch.getLocation());
            this.Bollean.position = event.touch.getLocation();
        
        }.bind(this),this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
