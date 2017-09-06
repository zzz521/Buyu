var ImgFigure = React.createClass({
    render:function () {
        var styleObj = {
            top: this.props.info.pos.y,
            left: this.props.info.pos.x,
        };
        return(
            <figure className="img-figure" style={styleObj}>
                <img src={"img/"+this.props.data.fileName} alt=""/>
                <figcaption>
                    <h2>{this.props.data.title}</h2>
                    <div></div>
                </figcaption>
            </figure>
        );
    }
});

var Controller = React.createClass({
    render:function () {
        return(
            <div></div>
        );
    }
});

var Fhotowall = React.createClass({
        getInitialState:function () {
            return{
                imgInfoArr:[
                    {
                        pos:{
                            x: 0,
                            y: 0
                        }
                    }
                ]
            }
        },
        Const: {
            centerPos : {
                x:0,
                y:0
            },
            leftXMin : 0,
            leftXMax : 0,
            rightXMin : 0,
            rightXMax : 0,
            yMin : 0,
            yMax : 0
        },
        componentDidMount:function () {
            //获取真实DOM并计算高度
            var stageDOM = this.refs.stage,
                wStageDOM = stageDOM.clientWidth,
                hStageDOM = stageDOM.clientHeight,
                wHalfStageDOM = wStageDOM / 2,
                hHalfStageDOM = hStageDOM / 2;
            var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgA),
                wImgFigureDOM = imgFigureDOM.clientWidth,
                hImgFigureDOM = imgFigureDOM.clientHeight,
                wHalfImgFigureDOM = wImgFigureDOM / 2,
                hHalfImgFigureDOM = hImgFigureDOM / 2;
            this.Const.centerPos = {
                x : wHalfStageDOM - wHalfImgFigureDOM,
                y : hHalfStageDOM - hHalfImgFigureDOM
            };
            this.Const.leftXMin = -wHalfImgFigureDOM;
            this.Const.leftXMax = wHalfStageDOM - wHalfImgFigureDOM * 3;
            this.Const.rightXMin = wHalfStageDOM + wHalfImgFigureDOM;
            this.Const.rightXMax = wStageDOM - wHalfImgFigureDOM;
            this.Const.yMin = -hHalfImgFigureDOM;
            this.Const.yMax = hStageDOM - hHalfImgFigureDOM;

            var imgInfoArr1 = this.state.imgInfoArr;
            //给16个图片组件进行pos的赋值 imgInfoArr1 是中间量
            for(var i=0; i<imgInfoArr1.length; i++){
                if(i < imgInfoArr1.length / 2){
                    imgInfoArr1[i].pos = {
                        x : getRangeRandom(this.Const.leftXMin, this.Const.leftXMax),
                        y: getRangeRandom(this.Const.yMin, this.Const.yMax)
                    };
                }else{
                    imgInfoArr1[i].pos = {
                        x : getRangeRandom(this.Const.rightXMin, this.Const.rightXMax),
                        y: getRangeRandom(this.Const.yMin, this.Const.yMax)
                    };
                }
            }
            this.setState({
                imgInfoArr: imgInfoArr1
            });
        },
        render:function () {
            var imgFigureArr = [];
            var controllerArr = [];
            for(var i=0;i<imgDatas.length;i++){
                //给state里面的imgInfoArr赋值
                if(!this.state.imgInfoArr[i]){
                    this.state.imgInfoArr[i] = {
                        pos : {
                            x: 0,
                            y: 0
                        },
                    };
                }
                imgFigureArr.push(<ImgFigure key={i} data={imgDatas[i]} ref="imgA" info={this.state.imgInfoArr[i]}/>);
                controllerArr.push(<Controller key={i}/>);
            }
            // console.log(this.state.imgInfoArr);
        return(
            <section className="stage" ref="stage">
                <section className="state">
                    {imgFigureArr}
                </section>
                <nav>
                    {controllerArr}
                </nav>
            </section>
        );
    }
});

ReactDOM.render(
    <Fhotowall/>,
    document.getElementById('app')
);

function getRangeRandom(low,high){
    return Math.random() * (high - low) + low;
};