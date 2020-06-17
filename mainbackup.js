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
var home = images.read("./图片/主界面.jpg");
var battlePre =  images.read("./图片/房间内.jpg");
var okpic =  images.read("./图片/OK.jpg");
var autopic =  images.read("./图片/自动.jpg");
var startMission =  images.read("./图片/开始挑战.jpg");
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

//任务属性
var bossList = [];

//#region UI
ui.layout(
    <vertical>
        <appbar>
        <toolbar id="toolbar" title="铃铛助手" />
        <tabs id = "tabs"/>
        </appbar>    
        <viewpager id="viewpager">
        <frame>
        <img src="file://./图片/背景.jpg"/>
        <vertical>    
        <button id="ok" text="确定"/>      
        <ScrollView>
        <vertical>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="石头人（火）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                            <checkbox id="fire0SuperLV" text="超级"  textColor="#999999" textSize="14sp"/>
                            <checkbox id="fire0PlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>
                            <checkbox id="fire0UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="螃蟹（水）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                             <checkbox id="water0SuperLV" text="超级"  textColor="#999999" textSize="14sp"/>
                            <checkbox id="water0PlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>
                            <checkbox id="water0UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>

            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="章鱼哥（水）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>                            
                            <checkbox id="water1UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>

            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="不死王（风）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                             <checkbox id="wind0SuperLV" text="超级"  textColor="#999999" textSize="14sp"/>
                            <checkbox id="wind0PlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>
                            <checkbox id="wind0UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>

            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="白虎（雷）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                             <checkbox id="elecSuperLV" text="超级"  textColor="#999999" textSize="14sp"/>
                            <checkbox id="elecPlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>
                            <checkbox id="elecUpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>

            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="机器人（光）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>                    
                            <checkbox id="light0UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>

            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="Sec（光）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                    
                            <checkbox id="light1UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="恶魔人（暗）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                             <checkbox id="dark0SuperLV" text="超级"  textColor="#999999" textSize="14sp"/>
                            <checkbox id="dark0PlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>
                            <checkbox id="dark0UpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="大蛇（无）" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>                  
                            <checkbox id="specUpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="活动" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>                
                            <checkbox id="eventPlusUpLV" text="上级+" textColor="#999999" textSize="14sp"/>  
                            <checkbox id="eventUpLV" text="上级" textColor="#999999" textSize="14sp"/>
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            </vertical>
            </ScrollView>
            </vertical>
            </frame>
            <frame>       
            <img src="file://./图片/背景2.jpg"/>
             <vertical>    
              <button id="ok2" text="确定"/>      
              <ScrollView>
                  <vertical>
              <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="周回开关" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                             <checkbox id="autoRepeatS" text="自动吃小药"  textColor="#999999" textSize="14sp"/>        
                             <checkbox id="autoRepeatM" text="自动吃中药"  textColor="#999999" textSize="14sp"/>   
                             <checkbox id="autoRepeatL" text="自动吃大药"  textColor="#999999" textSize="14sp"/>                                                    
                          </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" foreground="?selectableItemBackground" alpha = "0.7">
                <horizontal gravity="center_vertical">
                    <View h="*" w="10" />
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text text="不满足周回条件" textColor="#222222" textSize="16sp" maxLines="1" />                       
                            <radiogroup>
                            <horizontal>
                             <radio id="stopAuto" text="停止工作" checked="true"  textColor="#999999" textSize="14sp"/>        
                            
                             </horizontal>         
                             </radiogroup>                                                                                                                   
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
ui.viewpager.setTitles(["铃铛挂机","连续周回"]);
ui.tabs.setupWithViewPager(ui.viewpager);
ui.ok.click(function()
{
    initialBossList();
    //启动状态监控
    threads.start(function(){startAutoAlarmTask()});
});


var useRecS = false;
var useRecM = false;
var useRecL = false;
ui.ok2.click(function()
{
    if(ui.autoRepeatS.checked) useRecS = true;
    if(ui.autoRepeatM.checked) useRecM = true;
    if(ui.autoRepeatL.checked) useRecL = true;
     //启动状态监控
     threads.start(function(){startAutoRepeatTask()});
});

//#endregion

//状态监控显示
function ShowMsg()
{
    while(true)
    {
        toast(msg);
        sleep(10000);
    }
}

//初始化boss列表
function initialBossList()
{
     //清空数组
     bossList = [];
     //石头人
     if(ui.fire0SuperLV.checked) bossList.push(images.read("./关卡图/石头人超级.jpg"));   
     if(ui.fire0PlusUpLV.checked) bossList.push(images.read("./关卡图/石头人上级+.jpg"));   
     if(ui.fire0UpLV.checked) bossList.push(images.read("./关卡图/石头人上级.jpg"));   
     //螃蟹
     if(ui.water0SuperLV.checked) bossList.push(images.read("./关卡图/螃蟹超级.jpg"));  
     if(ui.water0PlusUpLV.checked) bossList.push(images.read("./关卡图/螃蟹上级+.jpg"));   
     if(ui.water0UpLV.checked) bossList.push(images.read("./关卡图/螃蟹上级.jpg"));  
     //章鱼哥
     if(ui.water1UpLV.checked) bossList.push(images.read("./关卡图/章鱼哥上级.jpg"));   
     //不死王
     if(ui.wind0SuperLV.checked) bossList.push(images.read("./关卡图/不死王超级.jpg"));  
     if(ui.wind0PlusUpLV.checked) bossList.push(images.read("./关卡图/不死王上级+.jpg"));   
     if(ui.wind0UpLV.checked) bossList.push(images.read("./关卡图/不死王上级.jpg"));  
     //白虎
     if(ui.elecSuperLV.checked) bossList.push(images.read("./关卡图/白虎超级.jpg"));   
     if(ui.elecPlusUpLV.checked) bossList.push(images.read("./关卡图/白虎上级+.jpg"));  
     if(ui.elecUpLV.checked) bossList.push(images.read("./关卡图/白虎上级.jpg"));   
     //机器人
     if(ui.light0UpLV.checked) bossList.push(images.read("./关卡图/机器人上级.jpg"));  
     //Sec
     if(ui.light1UpLV.checked) bossList.push(images.read("./关卡图/Sec上级.jpg"));   
     //恶魔人
     if(ui.dark0SuperLV.checked) bossList.push(images.read("./关卡图/恶魔人超级.jpg"));  
     if(ui.dark0PlusUpLV.checked) bossList.push(images.read("./关卡图/恶魔人上级+.jpg"));   
     if(ui.dark0UpLV.checked) bossList.push(images.read("./关卡图/恶魔人上级.jpg"));  
     //大蛇
     if(ui.specUpLV.checked) bossList.push(images.read("./关卡图/大蛇上级.jpg"));   
     //活动
     if(ui.eventPlusUpLV.checked) bossList.push(images.read("./关卡图/活动上级+.jpg"));  
     if(ui.eventUpLV.checked) bossList.push(images.read("./关卡图/活动上级.jpg"));  
}

//#region 自动铃铛工作流
var autoAlarm = new Object();
autoAlarm.WorkFlow = function()
{
    while(working)
    {
        //判断自己在什么界面
         var img = captureScreen();  
         //是否在报错界面？
       if(findImage(img,okpic, {threshold: 0.8}))
       {
           count = 0;
           msg = "报错界面，点击ok";
           var point = findImage(img,okpic, {threshold: 0.8});
            click(point.x+100,point.y+50);   
      }
         //是否在主界面？  
         else if(findImage(img,home, {threshold: 0.8}))
        {
            count = 0;
            msg = "等待铃铛中";    
             WaitAlarm(img);
        }
         //是否在boss选择界面？
         else if(findImage(img,enter, {threshold: 0.8}))
        {
            count = 0;
            msg = "boss确认界面";   
            CheckBoss(img);
         }
          //是否在等待开战界面？
          else if(findImage(img,battlePre, {threshold: 0.8}))
         {
            msg = "战斗等待界面";  
             count = 0;
            ReadyBattle(img);
        }
        //是否在战斗中
        else if(findImage(img,autopic, {threshold: 0.8}))
         {
             msg = "战斗中，等待结束";  
             count = 0;
        }
        //是否在战斗结算界面？
        else if(findImage(img,nextStep, {threshold: 0.8})||findImage(img,quitRoom, {threshold: 0.8}))
        {
            count = 0;            
            msg = "正在退出战斗";  
            CheckBattleEnd(img);
       }   
       //都不在，并且超时，就尝试返回   
       else
       {
          count = count+1;
          if(count >20)
          {
            msg = "在未知界面超过20s，尝试返回";
              click(500,500);
              back();         
              }
        }       
       sleep(1000);
    }
}
//#endregion

//#region 自动周回工作流
var autoRepeat = new Object();
autoRepeat.WorkFlow = function()
{
    sleep(5000);
    var img = captureScreen();          
    //启动时是否在准备界面？
    if(!findImage(img,startMission, {threshold: 0.8}))
    {
        msg = "周回功能请在战斗准备界面启动";  
        toast(msg);
        working = false;
        exit();
    }

    while(working)
    {
        //判断自己在什么界面
        var img = captureScreen();          
         //是否在报错界面？并且不在再挑战界面
       if(findImage(img,okpic, {threshold: 0.8}) && !findImage(img,restartMission, {threshold: 0.8}))
       {
           count = 0;
           msg = "报错界面，点击ok";
           var point = findImage(img,okpic, {threshold: 0.8});
            click(point.x+100,point.y+50);   
         }

         //是否在再挑战界面？
         if(findImage(img,restartMission, {threshold: 0.8}))
       {
           count = 0;
           msg = "再挑战";
           var point = findImage(img,restartMission, {threshold: 0.8});
            click(point.x+100,point.y+50);   
         }

          //是否在准备界面？
          else if(findImage(img,startMission, {threshold: 0.8}))
         {
            msg = "准备界面,点击开始";  
             count = 0;
             var point = findImage(img,startMission, {threshold: 0.8});
             click(point.x+100,point.y+50);   
        }
        //是否在战斗中
        else if(findImage(img,autopic, {threshold: 0.8}))
         {
             msg = "战斗中，等待结束";  
             count = 0;
        }
        //是否在战斗结算界面？
        else if(findImage(img,nextStep, {threshold: 0.8}))
        {
            count = 0;            
            msg = "正在退出战斗";  
            CheckBattleEnd(img);
       }   
       //是否在确认吃药界面？
       else if(findImage(img,cancel, {threshold: 0.8}))
       {                
            msg = "吃药界面";  
            
            if(useRecS) 
            {
                var recP = findImage(img,posionS, {threshold: 0.9})
                if(recP) click(recP.x+100,recP.y+50);   
                sleep(1000);
            }
            if(useRecM) 
            {
                var recP = findImage(img,posionM, {threshold: 0.9})
                if(recP) click(recP.x+100,recP.y+50);   
                sleep(1000);
            }
            if(useRecL) 
            {
                var recP = findImage(img,posionL, {threshold: 0.9})
                if(recP) click(recP.x+100,recP.y+50);   
                sleep(1000);
            }
            if(findImage(img,use, {threshold: 0.8}))
            {
                var recP = findImage(img,use, {threshold: 0.8})
                if(recP) click(recP.x+100,recP.y+50);   
            }           
            count = count+1;
            if(count >3)
             {
                msg = "尝试吃药失败，周回结束";                  
                back();        
                exit();
            }
       }
       //都不在，并且超时，就尝试点击屏幕激活下个阶段   
       else
       {
          count = count+1;
          if(count >20)
          {
            msg = "在未知界面超过20s，尝试返回";
              click(500,500);               
              back();        
           }
        }       
       sleep(1000);
    }
}

//#endregion

//#region 通用方法
function WaitAlarm(img)
{  

    var alarmp = findImage(img,alarm, {threshold: 0.6});
    if(alarmp)
    {
        click(alarmp.x+50,alarmp.y+50);   
    };
}

function CheckBoss(img)
{   
    var enterp = findImage(img, enter, {threshold: 0.8});   
    var quitp = findImage(img, quit, {threshold: 0.8}); 
    if(enterp&&quitp)
    {      
        //根据boss列表选择
        for(var j =0; j<bossList.length;j++)
        {
            if(findImage(img, bossList[j], {threshold: 0.8}))
            {             
                click(enterp.x+100,enterp.y+50);
                return;       
            }
        }
        click(quitp.x+100,quitp.y+50);
           
    }
}

function ReadyBattle(img)
{  
    var oreadyp = findImage(img, overReady, {threshold: 0.8});
    var readyp = findImage(img, waitReady, {threshold: 0.8});
    if(!oreadyp&&readyp)
    {              
        click(readyp.x+100,readyp.y+50);          
    }
}

function CheckBattleEnd(img)
{
    var endp = findImage(img, nextStep, {threshold:0.8});  
    var quitp = findImage(img, quitRoom, {threshold: 0.8});   
    if(endp)
    {            
    //进入退出房间阶段
       click(endp.x+100,endp.y+50);   
     }
    else if(quitp)
    {
      battleQuiting = false;           
      click(quitp.x+100,quitp.y+50);    
    }
    
}
//#endregion



function startAutoAlarmTask()
{
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
    }
    launchApp("ワーフリ");
     //启动自动铃铛线程
     threads.start(function(){autoAlarm.WorkFlow()});
    ShowMsg();
   
}

function startAutoRepeatTask()
{
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
    }
    launchApp("ワーフリ");
      //启动自动周回线程
    threads.start(function(){autoRepeat.WorkFlow()});
    ShowMsg();
  
}


