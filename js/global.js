// 从缩写到大写
const provinceSimp2All = {
  安徽: "安徽省",
  福建: "福建省",
  甘肃: "甘肃省",
  广东: "广东省",
  广西: "广西壮族自治区",
  贵州: "贵州省",
  海南: "海南省",
  河北: "河北省",
  河南: "河南省",
  黑龙江: "黑龙江省",
  湖北: "湖北省",
  湖南: "湖南省",
  吉林: "吉林省",
  江苏: "江苏省",
  江西: "江西省",
  辽宁: "辽宁省",
  内蒙古: "内蒙古自治区",
  宁夏: "宁夏回族自治区",
  青海: "青海省",
  山东: "山东省",
  山西: "山西省",
  陕西: "陕西省",
  上海: "上海市",
  四川: "四川省",
  天津: "天津市",
  西藏: "西藏自治区",
  新疆: "新疆维吾尔自治区",
  云南: "云南省",
  浙江: "浙江省",
  重庆: "重庆市",
  香港: "香港特别行政区",
  澳门: "澳门特别行政区",
  台湾: "台湾省",
  北京: "北京市",
};
// 中文到英文省份
const provinceToEnglish = {
  北京: "beijing",
  天津: "tianjin",
  河北: "hebei",
  山西: "shanxi",
  内蒙古: "inner mongolia",
  辽宁: "liaoning",
  吉林: "jilin",
  黑龙江: "heilongjiang",
  上海: "shanghai",
  江苏: "jiangsu",
  浙江: "zhejiang",
  安徽: "anhui",
  福建: "fujian",
  江西: "jiangxi",
  山东: "shandong",
  河南: "henan",
  湖北: "hubei",
  湖南: "hunan",
  广东: "guangdong",
  广西: "guangxi",
  海南: "hainan",
  重庆: "chongqing",
  四川: "sichuan",
  贵州: "guizhou",
  云南: "yunnan",
  西藏: "tibet",
  陕西: "shaanxi",
  甘肃: "gansu",
  青海: "qinghai",
  宁夏: "ningxia",
  新疆: "xinjiang",
  香港: "hongkong",
  澳门: "aomen",
  台湾: "taiwan",
};

const province2Capitals = {
  安徽省: "合肥市",
  福建省: "福州市",
  甘肃省: "兰州市",
  广东省: "广州市",
  贵州省: "贵阳市",
  海南省: "海口市",
  河北省: "石家庄市",
  河南省: "郑州市",
  黑龙江省: "哈尔滨市",
  湖北省: "武汉市",
  湖南省: "长沙市",
  吉林省: "长春市",
  江苏省: "南京市",
  江西省: "南昌市",
  辽宁省: "沈阳市",
  青海省: "西宁市",
  山东省: "济南市",
  山西省: "太原市",
  陕西省: "西安市",
  上海市: "上海市",
  四川省: "成都市",
  天津市: "天津市",
  西藏自治区: "拉萨市",
  新疆维吾尔自治区: "乌鲁木齐市",
  云南省: "昆明市",
  浙江省: "杭州市",
  重庆市: "重庆市",
  内蒙古自治区: "呼和浩特市",
};

var current_attr = "AQI";
var current_date = "2013-01-01";
var current_province = "广东省";
var current_province_abbr = "广东";
var current_city = "深圳市";
var is_province = false; // 是否为省份地图
//省份缩写

window.onload = function () {
  var maxHeight = document.getElementById("cell1").offsetHeight;
  document.getElementById("cell2").style.maxHeight = maxHeight + "px";
  setTogether("2013-01-01", "AQI");
};
