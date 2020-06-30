//弹射世界自动化工程
//Author：KuroiEin
//CreateDate：2020/6/4

//加载UI模式
"ui";

//#region 资源文件加载
var alarm = images.read("./图片/铃铛.jpg");
var enter = images.read("./图片/参加.jpg");
var quit = images.read("./图片/不参加.jpg");
var waitReady = images.read("./图片/准备中.jpg");
var overReady = images.read("./图片/准备完成.jpg");
var nextStep = images.read("./图片/下一步.jpg");
var quitRoom = images.read("./图片/退房.jpg");
var reBattle = images.read("./图片/返回房间.jpg");
var home = images.read("./图片/主界面.jpg");
var battlePre = images.read("./图片/房间内.jpg");
var okpic = images.read("./图片/OK.jpg");
var autopic = images.read("./图片/自动.jpg");
var startMission = images.read("./图片/开始挑战.jpg");
var startDeepMission = images.read("./图片/开始挑战_深层.jpg");
var restartMission = images.read("./图片/再挑战.jpg");
var cancel = images.read("./图片/取消.jpg");
var use = images.read("./图片/使用.jpg");
var posionS = images.read("./图片/小药.jpg");
var posionM = images.read("./图片/中药.jpg");
var posionL = images.read("./图片/大药.jpg");
//#endregion

//全局变量
var working = true;
var count = 0
var msg = "准备中";
var operCode = 0; //operCode:0(自动铃铛),1(单人周回),2(连车模式)
//任务属性
var bossList = [];

//#region UI
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="铃铛助手" />
            <tabs id="tabs" />
        </appbar>
        <viewpager id="viewpager">
            <frame>
                <img src="file://./图片/背景.jpg" />
                <vertical>
                    <button id="ok" text="确定" />
                    <list id="missionList">
                        <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" alpha="0.7"
                            cardElevation="1dp" foreground="?selectableItemBackground">
                            <horizontal gravity="center_vertical">
                                <View h="*" w="10" />
                                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                    <text id="title" text="{{this.title}}" textColor="#222222" textSize="16sp" maxLines="1" />
                                    <horizontal>
                                        <checkbox id="superLV" text="超级" visibility="{{this.superLVEnable}}" textColor="#999999" textSize="14sp" />
                                        <checkbox id="upPlusLV" text="上级+" visibility="{{this.upPlusLVEnable}}" textColor="#999999" textSize="14sp" />
                                        <checkbox id="upLV" text="上级" textColor="#999999" textSize="14sp" />
                                    </horizontal>
                                </vertical>
                            </horizontal>
                        </card>
                    </list>
                </vertical>
            </frame>
            <frame>
                <img src="file://./图片/背景2.jpg" />
                <vertical>
                    <button id="ok2" text="确定" />
                    <ScrollView>
                        <vertical>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                                cardElevation="1dp" foreground="?selectableItemBackground" alpha="0.7">
                                <horizontal gravity="center_vertical">
                                    <View h="*" w="10" />
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="周回模式" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <radiogroup orientation="horizontal">
                                             
                                                <radio id="soloPlay" text="周回素材" checked="true" textColor="#999999" textSize="14sp" />
                                                <radio id="multiPlay" text="自动连车" textColor="#999999" textSize="14sp" />
                                            
                                        </radiogroup>
                                    </vertical>
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                                cardElevation="1dp" foreground="?selectableItemBackground" alpha="0.7">
                                <horizontal gravity="center_vertical">
                                    <View h="*" w="10" />
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="周回结束动作" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <radiogroup orientation="horizontal">
                                            
                                                <radio id="autoStop" text="停止运行" checked="true" textColor="#999999" textSize="14sp" />
                                                <radio id="changeAlarm" text="等待铃铛" textColor="#999999" textSize="14sp" />
                                            
                                        </radiogroup>
                                    </vertical>
                                </horizontal>
                            </card>
                            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                                cardElevation="1dp" foreground="?selectableItemBackground" alpha="0.7">
                                <horizontal gravity="center_vertical">
                                    <View h="*" w="10" />
                                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                                        <text text="回复开关" textColor="#222222" textSize="16sp" maxLines="1" />
                                        <horizontal>
                                            <checkbox id="autoRepeatS" text="自动吃小药" textColor="#999999" textSize="14sp" />
                                            <checkbox id="autoRepeatM" text="自动吃中药" textColor="#999999" textSize="14sp" />
                                            <checkbox id="autoRepeatL" text="自动吃大药" textColor="#999999" textSize="14sp" />
                                        </horizontal>
                                    </vertical>
                                </horizontal>
                            </card>

                        </vertical>
                    </ScrollView>
                </vertical>
            </frame>
        </viewpager>
    </vertical>
)


//#region  boss名录
storages.remove("missionList");
var storage = storages.create("missionList");
//从storage获取todo列表
var missionList = storage.get("items", [
    {
        title: "石头人（火）",
        superLV: "./关卡图/石头人超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/石头人上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/石头人上级.jpg"
    },
    {
        title: "螃蟹（水）",
        superLV: "./关卡图/螃蟹超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/螃蟹上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/螃蟹上级.jpg"
    },
    {
        title: "章鱼哥（水）",
        superLV: "./关卡图/章鱼哥超级.jpg",
        superLVEnable: "gone",
        upPlusLV: "./关卡图/章鱼哥上级+.jpg",
        upPlusLVEnable: "gone",
        upLV: "./关卡图/章鱼哥上级.jpg",
    },
    {
        title: "不死王（风）",
        superLV: "./关卡图/不死王超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/不死王上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/不死王上级.jpg"
    },
    {
        title: "白虎（雷）",
        superLV: "./关卡图/白虎超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/白虎上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/白虎上级.jpg"
    },
    {
        title: "机器人（光）",
        superLV: "./关卡图/机器人超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/机器人上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/机器人上级.jpg"
    },
    {
        title: "Sec（光）",
        superLV: "./关卡图/螃蟹超级.jpg",
        superLVEnable: "gone",
        upPlusLV: "./关卡图/螃蟹超级.jpg",
        upPlusLVEnable: "gone",
        upLV: "./关卡图/螃蟹超级.jpg"
    },
    {
        title: "恶魔人（暗）",
        superLV: "./关卡图/恶魔人超级.jpg",
        superLVEnable: "visible",
        upPlusLV: "./关卡图/恶魔人上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/恶魔人上级.jpg"
    },
    {
        title: "大蛇（无）",
        superLV: "./关卡图/大蛇超级.jpg",
        superLVEnable: "gone",
        upPlusLV: "./关卡图/大蛇上级+.jpg",
        upPlusLVEnable: "gone",
        upLV: "./关卡图/大蛇上级.jpg"
    },
    {
        title: "水废龙",
        superLV: "./关卡图/活动超级.jpg",
        superLVEnable: "gone",
        upPlusLV: "./关卡图/活动上级+.jpg",
        upPlusLVEnable: "visible",
        upLV: "./关卡图/活动上级.jpg"
    }
]);;
ui.missionList.setDataSource(missionList);
ui.missionList.on("item_bind", function (itemView, itemHolder) {
    //绑定勾选框事件
    itemView.superLV.on("check", function (checked) {
        let item = itemHolder.item;
        if(checked)
        {
            bossList.push(item.superLV);
        }
        else
        {
            removeListValue(bossList,item.superLV);
        }
    });
    itemView.upPlusLV.on("check", function (checked) {
        let item = itemHolder.item;
        if(checked)
        {
            bossList.push(item.upPlusLV);
        }
        else
        {
            removeListValue(bossList,item.upPlusLV);
        }
    });
    itemView.upLV.on("check", function (checked) {
        let item = itemHolder.item;
        if(checked)
        {
            bossList.push(item.upLV);
        }
        else
        {
            removeListValue(bossList,item.upLV);
        }
    });
});

//#endregion


ui.viewpager.setTitles(["铃铛挂机", "连续周回"]);
ui.tabs.setupWithViewPager(ui.viewpager);


ui.ok.click(function () {
    //启动状态监控
    operCode = 0;
    threads.start(function () { startTask() });
});


var useRecS = false;
var useRecM = false;
var useRecL = false;
var changeMode = false;
ui.ok2.click(function () {
    if (ui.autoRepeatS.checked) useRecS = true;
    if (ui.autoRepeatM.checked) useRecM = true;
    if (ui.autoRepeatL.checked) useRecL = true;
    if (ui.soloPlay.checked) operCode = 1;
    if (ui.multiPlay.checked) operCode = 2;
    if (ui.autoStop.checked) changeMode = false;
    if (ui.changeAlarm.checked) changeMode = true;
    //启动状态监控
    threads.start(function () { startTask() });
});

//#endregion


//#region 工作流
function WorkFlow(operCode) {
    while (working) {
        //判断自己在什么界面
        var img = captureScreen();
        //是否在报错界面？
        if (findImage(img, okpic, { threshold: 0.8 }) && operCode!=1) {
            count = 0;
            msg = "报错界面，点击ok";
            var point = findImage(img, okpic, { threshold: 0.8 });
            click(point.x + 100, point.y + 50);
        }
        //是否在再挑战界面？
        if (findImage(img, restartMission, { threshold: 0.8 }) && operCode == 1) {
            count = 0;
            msg = "";
            var point = findImage(img, restartMission, { threshold: 0.8 });
            click(point.x + 100, point.y + 50);
        }
        //是否在准备界面？
        else if (findImage(img, startMission, { threshold: 0.8 }) && operCode == 1) {
            msg = "准备界面,点击开始";
            count = 0;
            var point = findImage(img, startMission, { threshold: 0.8 });
            click(point.x + 100, point.y + 50);
        }
        //是否在深层准备界面？
        else if (findImage(img, startDeepMission, { threshold: 0.8 }) && operCode == 1) {
            msg = "深层准备界面,点击开始";
            count = 0;
            var point = findImage(img, startDeepMission, { threshold: 0.8 });
            click(point.x + 100, point.y + 50);
        }
        //是否在主界面？  
        else if (findImage(img, home, { threshold: 0.8 })) {
            if (operCode == 0 || changeMode == true) {
                operCode = 0;
                count = 0;
                msg = "等待铃铛中";
                WaitAlarm(img);
            }
            else {
                exit();
            }
        }
        //是否在boss选择界面？
        else if (findImage(img, enter, { threshold: 0.8 }) && operCode == 0) {
            count = 0;
            msg = "boss确认界面";
            CheckBoss(img);
        }
        //是否在等待开战界面？
        else if (findImage(img, battlePre, { threshold: 0.8 }) && !findImage(img, use, { threshold: 0.8 })) {
            msg = "战斗等待界面";
            count = 0;
            ReadyBattle(img);
        }
        //是否在战斗中
        else if (findImage(img, autopic, { threshold: 0.8 })) {
            msg = "战斗中，等待结束";
            count = 0;
        }
        //是否在战斗结算界面？
        else if (findImage(img, nextStep, { threshold: 0.8 }) || findImage(img, quitRoom, { threshold: 0.8 })) {
            count = 0;
            msg = "";
            CheckBattleEnd(img);
        }
        //是否在确认吃药界面？
        else if ((findImage(img, cancel, { threshold: 0.8 })||findImage(img, use, { threshold: 0.8 })) && operCode == 1) {
            msg = "吃药界面";
            PosionFunc(img);
        }
        //都不在，并且超时，就尝试返回   
        else {
            count = count + 1;
            if (count > 10) {
                msg = "在未知界面超过10s，尝试返回";
                click(500, 500);
                back();
                sleep(5000);
            }
        }
        sleep(1000);
    }
}
//#endregion

//#region 自动铃铛模式
function autoAlarm() {
    sleep(5000);
    var img = captureScreen();
    //启动时是否在主界面？
    if (!findImage(img, home, { threshold: 0.8 })) {
        msg = "自动铃铛模式请在主界面启动";
        toast(msg);
        working = false;
        exit();
    }
    WorkFlow(0);
}
//#endregion

//#region 单人周回模式
function soloRepeat() {
    sleep(5000);
    var img = captureScreen();
    //启动时是否在准备界面？
    if (!findImage(img, startMission, { threshold: 0.8 }) && !findImage(img, startDeepMission, { threshold: 0.8 })) {
        msg = "单人周回模式请在战斗准备界面启动";
        toast(msg);
        working = false;
        exit();
    }
    WorkFlow(1);
}
//#endregion

//#region 连车模式
function multiRepeat() {
    sleep(5000);
    var img = captureScreen();
    //启动时是否在准备界面？
    if (!findImage(img, battlePre, { threshold: 0.8 })) {
        msg = "连车模式请在战斗准备界面启动";
        toast(msg);
        working = false;
        exit();
    }
    WorkFlow(2);
}
//#endregion

//#region 通用方法
function WaitAlarm(img) {

    var alarmp = findImage(img, alarm, { threshold: 0.6 });
    if (alarmp) {
        click(alarmp.x + 50, alarmp.y + 50);
    };
}

function CheckBoss(img) {
    var enterp = findImage(img, enter, { threshold: 0.8 });
    var quitp = findImage(img, quit, { threshold: 0.8 });
    if (enterp && quitp) {
        //根据boss列表选择
        for (var j = 0; j < bossList.length; j++) {
            if (findImage(img, images.read(bossList[j]), { threshold: 0.8 })) {
                click(enterp.x + 100, enterp.y + 50);
                return;
            }
        }
        click(quitp.x + 100, quitp.y + 50);

    }
}

function ReadyBattle(img) {
    var oreadyp = findImage(img, overReady, { threshold: 0.8 });
    var readyp = findImage(img, waitReady, { threshold: 0.8 });
    if (!oreadyp && readyp) {
        click(readyp.x + 100, readyp.y + 50);
    }
}

function CheckBattleEnd(img) {
    var endp = findImage(img, nextStep, { threshold: 0.8 });
    var quitp = findImage(img, quitRoom, { threshold: 0.8 });
    var reBattlep = findImage(img, reBattle, { threshold: 0.8 });
    if (endp) {
        //进入退出房间阶段
        click(endp.x + 100, endp.y + 50);
    }
    else if (quitp && operCode == 0) {
        click(quitp.x + 100, quitp.y + 50);
    }
    else if (reBattlep && operCode == 2) {
        click(reBattlep.x + 100, reBattlep.y + 50);
    }
}

function PosionFunc(img) {
    if (useRecS) {
        var recP = findImage(img, posionS, { threshold: 0.9 })
        if (recP) click(recP.x + 100, recP.y + 50);
        sleep(1000);
    }
    if (useRecM) {
        var recP = findImage(img, posionM, { threshold: 0.9 })
        if (recP) click(recP.x + 100, recP.y + 50);
        sleep(1000);
    }
    if (useRecL) {
        var recP = findImage(img, posionL, { threshold: 0.9 })
        if (recP) click(recP.x + 100, recP.y + 50);
        sleep(1000);
    }
    if (findImage(img, use, { threshold: 0.8 })) {
        var recP = findImage(img, use, { threshold: 0.8 })
        if (recP) 
        {
            click(recP.x + 100, recP.y + 50);
            sleep(1000);
            back();
         }   
    }
    count = count + 1;
    if (count > 3) {
        msg = "尝试吃药失败，周回结束";
        back();
        sleep(1000);
        back();
        if (changeMode) { operCode = 0; }
        else { exit(); }
    }
}

function removeListValue(list,val)
{
    for (var i = 0; i < list.length; i++) { 
        if (list[i] == val) 
        {
            list.splice(i, 1); 
            return;
        }
    }
      
}
//#endregion

//启动
function startTask() {
    console.log(operCode);
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
    launchApp("ワーフリ");
    threads.start(function () {
        switch (operCode) {
            case 0:
                autoAlarm();
                break;
            case 1:
                soloRepeat();
                break;
            case 2:
                multiRepeat();
                break;
            default:
                autoAlarm();
        }
    });
    windowFunc();
}

function windowFunc()
{   
    var window = floaty.window(
        <frame gravity="center">
            <text id="text" textSize="16sp"/>
        </frame>
    );
    
    window.setPosition(155, -58);
    window.setSize(900, 137);

    window.exitOnClose();
    
    window.text.click(()=>{
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });
    
    setInterval(()=>{
        //对控件的操作需要在UI线程中执行
        ui.run(function(){
            window.text.setText(msg);
        });
    }, 1000);
}