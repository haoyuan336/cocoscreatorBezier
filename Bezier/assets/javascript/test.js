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
        let p2 = {x: 300,y: 400};
        ///y = kx + b
        let k = (p2.y - p1.y)/(p2.x - p1.x);
        let b = (p1.y * p2.x - p2.y * p1.x) / (p2.x - p1.x);
        console.log('k = ' + k);
        console.log('b = ' + b);



        const getX = function (y) {
            return (y - b) / k;
        };
        const getY = function (x) {
          return k * x + b;
        };

        this.Graphics = this.node.getComponent(cc.Graphics);
        this.Graphics.strokeColor=cc.Color.RED;
        this.Graphics.lineWidth=1;
        this.Graphics.moveTo(p1.x,p1.y);
        this.Graphics.lineTo(p2.x,p2.y);
        this.Graphics.fill();
        this.Graphics.stroke();
        
        this.Bollean.position = p1;
        

        
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            cc.log("mousemove" + event.touch.getLocation());
            //this.Bollean.position = event.touch.getLocation();

            let touchP = event.touch.getLocation();

            let targetX = getX(touchP.y);
            let targetY = getY(touchP.x);

            cc.log('dis X = ' + (touchP.x - targetX));
            cc.log('dis Y = ' + (touchP.y - targetY));


            if (Math.abs(touchP.x - targetX) < 50 && Math.abs(touchP.y - targetY) < 50){
                let y = getY(touchP.x);
                this.Bollean.position = {
                    x: touchP.x,
                    y: y
                }
            }
            
        
        }.bind(this),this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
