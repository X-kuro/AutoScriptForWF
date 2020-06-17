//加载UI模式
"ui";
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
        <list id="bossList">
                <card w="*" h="70" margin="10 5" cardCornerRadius="2dp" alpha = "0.7"
                    cardElevation="1dp" foreground="?selectableItemBackground">
                    <horizontal gravity="center_vertical">
                    <View h="*" w="10"/>
                    <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                        <text id="title" text="{{this.title}}" textColor="#222222" textSize="16sp" maxLines="1" />
                        <horizontal>
                            <checkbox id="{{this.superLV}}" text="超级" visibility="{{this.superLVEnable}}" textColor="#999999" textSize="14sp"/>
                            <checkbox id="{{this.upPlusLV}}" text="上级+" visibility="{{this.upPlusLVEnable}}" textColor="#999999" textSize="14sp"/>
                            <checkbox id="{{this.upLV}}" text="上级" textColor="#999999" textSize="14sp"/>
                        </horizontal>                       
                    </vertical>               
                </horizontal>
            </card>
            </list>
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
                        <horizontal>
                            <radiogroup>
                             <radio id="stopAuto" text="停止工作" checked="true"  textColor="#999999" textSize="14sp"/>        
                             <radio id="startAlramAuto" text="转为自动铃铛"  textColor="#999999" textSize="14sp"/>         
                             </radiogroup>>                                                                      
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
//storages.remove("bossList")
var storage = storages.create("bossList");
//从storage获取todo列表
var bossList = storage.get("items", [
    {
        title: "石头人（火）",
        superLV: "fire0SuperLV",
        superLVEnable:"gone",
        upPlusLV: "fire0PlusUpLV",
        upPlusLVEnable:"gone",
        upLV: "fire0UpLV"
    }
]);;

ui.bossList.setDataSource(bossList);


ui.viewpager.setTitles(["铃铛挂机","连续周回"]);
ui.tabs.setupWithViewPager(ui.viewpager);