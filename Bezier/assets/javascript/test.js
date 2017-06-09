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
        let pos1 = {x: 100,y: 200};
        let pos2 = {x: 300,y: 400};

        let pos3 = {x: 500,y: 800};
        ///y = kx + b
        // let k = (p2.y - p1.y)/(p2.x - p1.x);
        // let b = (p1.y * p2.x - p2.y * p1.x) / (p2.x - p1.x);
        //
        // console.log('k = ' + k);
        // console.log('b = ' + b);

        const getSun = function (p1,p2) {
            return {
                k: (p2.y - p1.y)/(p2.x - p1.x),
                b: (p1.y * p2.x - p2.y * p1.x) / (p2.x - p1.x),
                range: {
                    p1:p1,
                    p2:p2
                }
            }
        };
        let sun1 = getSun(pos1,pos2);
        let sun2 = getSun(pos2,pos3);
        let sunList = [];
        sunList.push(sun1,sun2);

        const getX = function (y) {
            for (let i = 0 ; i < sunList.length ; i ++){
                if (y > sunList[i].range.p1.y && y < sunList[i].range.p2.y){
                    return  ( y - sunList[i].b ) / sunList[i].k;
                }
            }
            // return (y - b) / k;
        };
        const getY = function (x) {
            // let sun1 = getSun(pos1,pos2);
            // let sun2 = getSun(pos2,pos3);
            // return kx + b;
            for (let i = 0 ; i < sunList.length ; i ++){
                if (x > sunList[i].range.p1.x && x < sunList[i].range.p2.x){
                    return  x * sunList[i].k + sunList[i].b;
                }
            }
        };

        this.Graphics = this.node.getComponent(cc.Graphics);
        this.Graphics.strokeColor=cc.Color.RED;
        this.Graphics.lineWidth=10;
        this.Graphics.moveTo(pos1.x,pos1.y);
        this.Graphics.lineTo(pos2.x,pos2.y);
        this.Graphics.lineTo(pos3.x,pos3.y);

        // this.Graphics.fill();
        this.Graphics.stroke();
        
        this.Bollean.position = pos1;
        

        
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
