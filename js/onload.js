window.onload = function () {
    var maxHeight = document.getElementById('cell1').offsetHeight;
    document.getElementById('cell2').style.maxHeight = maxHeight + "px";
    setHotMap(2013, "PM2.5")
}
