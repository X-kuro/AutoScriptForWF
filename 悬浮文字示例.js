var window = floaty.window(
    <frame gravity="center">
        <text id="text" text="点击可调整位置" textSize="16sp"/>
    </frame>
);

window.exitOnClose();

window.text.click(()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

setInterval(()=>{
    console.log("X坐标:"+window.getX());
    console.log("Y坐标:"+window.getY());
    console.log("宽度:"+window.getWidth());
    console.log("高度:"+window.getHeight());
}, 1000);