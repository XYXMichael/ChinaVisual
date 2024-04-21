window.onload = function () {

    var maxHeight = document.getElementById('cell1').offsetHeight;
    document.getElementById('cell2').style.maxHeight = maxHeight + "px";
    setTogether("2013-01-01", "AQI")
}
