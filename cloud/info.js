/**
 * Created by wuhaolin on 4/4/15.
 * 静态信息提供
 */
"use strict";
var Request = require('request');

//所有专业
exports.Majors = [
    {
        "name": "哲学"
    },
    {
        "name": "逻辑学"
    },
    {
        "name": "宗教学"
    },
    {
        "name": "经济学"
    },
    {
        "name": "经济统计学"
    },
    {
        "name": "财政学"
    },
    {
        "name": "税收学"
    },
    {
        "name": "金融学"
    },
    {
        "name": "金融工程"
    },
    {
        "name": "保险学"
    },
    {
        "name": "投资学"
    },
    {
        "name": "国际经济与贸易"
    },
    {
        "name": "贸易经济"
    },
    {
        "name": "法学"
    },
    {
        "name": "政治学与行政学"
    },
    {
        "name": "国际政治"
    },
    {
        "name": "外交学"
    },
    {
        "name": "社会学"
    },
    {
        "name": "社会工作"
    },
    {
        "name": "民族学"
    },
    {
        "name": "科学社会主义"
    },
    {
        "name": "中国共产党历史"
    },
    {
        "name": "思想政治教育"
    },
    {
        "name": "治安学"
    },
    {
        "name": "侦查学"
    },
    {
        "name": "边防管理"
    },
    {
        "name": "教育学"
    },
    {
        "name": "科学教育"
    },
    {
        "name": "人文教育"
    },
    {
        "name": "教育技术学"
    },
    {
        "name": "艺术教育"
    },
    {
        "name": "学前教育"
    },
    {
        "name": "小学教育"
    },
    {
        "name": "特殊教育"
    },
    {
        "name": "体育教育"
    },
    {
        "name": "运动训练"
    },
    {
        "name": "社会体育指导与管理"
    },
    {
        "name": "武术与民族传统体育"
    },
    {
        "name": "运动人体科学"
    },
    {
        "name": "汉语言文学"
    },
    {
        "name": "汉语言"
    },
    {
        "name": "汉语国际教育"
    },
    {
        "name": "中国少数民族语言文学"
    },
    {
        "name": "古典文献学"
    },
    {
        "name": "英语"
    },
    {
        "name": "俄语"
    },
    {
        "name": "德语"
    },
    {
        "name": "法语"
    },
    {
        "name": "西班牙语"
    },
    {
        "name": "阿拉伯语"
    },
    {
        "name": "日语"
    },
    {
        "name": "波斯语"
    },
    {
        "name": "朝鲜语"
    },
    {
        "name": "菲律宾语"
    },
    {
        "name": "梵语巴利语"
    },
    {
        "name": "印度尼西亚语"
    },
    {
        "name": "印地语"
    },
    {
        "name": "柬埔寨语"
    },
    {
        "name": "老挝语"
    },
    {
        "name": "缅甸语"
    },
    {
        "name": "马来语"
    },
    {
        "name": "蒙古语"
    },
    {
        "name": "僧伽罗语"
    },
    {
        "name": "泰语"
    },
    {
        "name": "乌尔都语"
    },
    {
        "name": "希伯来语"
    },
    {
        "name": "越南语"
    },
    {
        "name": "豪萨语"
    },
    {
        "name": "斯瓦希里语"
    },
    {
        "name": "阿尔巴尼亚语"
    },
    {
        "name": "保加利亚语"
    },
    {
        "name": "波兰语"
    },
    {
        "name": "捷克语"
    },
    {
        "name": "斯洛伐克语"
    },
    {
        "name": "罗马尼亚语"
    },
    {
        "name": "葡萄牙语"
    },
    {
        "name": "瑞典语"
    },
    {
        "name": "塞尔维亚语"
    },
    {
        "name": "土耳其语"
    },
    {
        "name": "希腊语"
    },
    {
        "name": "匈牙利语"
    },
    {
        "name": "意大利语"
    },
    {
        "name": "泰米尔语"
    },
    {
        "name": "普什图语"
    },
    {
        "name": "世界语"
    },
    {
        "name": "孟加拉语"
    },
    {
        "name": "尼泊尔语"
    },
    {
        "name": "克罗地亚语"
    },
    {
        "name": "荷兰语"
    },
    {
        "name": "芬兰语"
    },
    {
        "name": "乌克兰语"
    },
    {
        "name": "挪威语"
    },
    {
        "name": "丹麦语"
    },
    {
        "name": "冰岛语"
    },
    {
        "name": "爱尔兰语"
    },
    {
        "name": "拉脱维亚语"
    },
    {
        "name": "立陶宛语"
    },
    {
        "name": "斯洛文尼亚语"
    },
    {
        "name": "爱沙尼亚语"
    },
    {
        "name": "马耳他语"
    },
    {
        "name": "哈萨克语"
    },
    {
        "name": "乌兹别克语"
    },
    {
        "name": "祖鲁语"
    },
    {
        "name": "拉丁语"
    },
    {
        "name": "翻译"
    },
    {
        "name": "商务英语"
    },
    {
        "name": "新闻学"
    },
    {
        "name": "广播电视学"
    },
    {
        "name": "广告学"
    },
    {
        "name": "传播学"
    },
    {
        "name": "编辑出版学"
    },
    {
        "name": "历史学"
    },
    {
        "name": "世界史"
    },
    {
        "name": "考古学"
    },
    {
        "name": "文物与博物馆学"
    },
    {
        "name": "数学与应用数学"
    },
    {
        "name": "信息与计算科学"
    },
    {
        "name": "物理学"
    },
    {
        "name": "应用物理学"
    },
    {
        "name": "核物理"
    },
    {
        "name": "化学"
    },
    {
        "name": "应用化学"
    },
    {
        "name": "天文学"
    },
    {
        "name": "地理科学"
    },
    {
        "name": "自然地理与资源环境"
    },
    {
        "name": "人文地理与城乡规划"
    },
    {
        "name": "地理信息科学"
    },
    {
        "name": "大气科学"
    },
    {
        "name": "应用气象学"
    },
    {
        "name": "海洋科学"
    },
    {
        "name": "海洋技术"
    },
    {
        "name": "地球物理学"
    },
    {
        "name": "空间科学与技术"
    },
    {
        "name": "地质学"
    },
    {
        "name": "地球化学"
    },
    {
        "name": "生物科学"
    },
    {
        "name": "生物技术"
    },
    {
        "name": "生物信息学"
    },
    {
        "name": "生态学"
    },
    {
        "name": "心理学"
    },
    {
        "name": "应用心理学"
    },
    {
        "name": "统计学"
    },
    {
        "name": "应用统计学"
    },
    {
        "name": "理论与应用力学"
    },
    {
        "name": "工程力学"
    },
    {
        "name": "机械工程"
    },
    {
        "name": "机械设计制造及其自动化"
    },
    {
        "name": "材料成型及控制工程"
    },
    {
        "name": "机械电子工程"
    },
    {
        "name": "工业设计"
    },
    {
        "name": "过程装备与控制工程"
    },
    {
        "name": "车辆工程"
    },
    {
        "name": "汽车服务工程"
    },
    {
        "name": "测控技术与仪器"
    },
    {
        "name": "材料科学与工程"
    },
    {
        "name": "材料物理"
    },
    {
        "name": "材料化学"
    },
    {
        "name": "冶金工程"
    },
    {
        "name": "金属材料工程"
    },
    {
        "name": "无机非金属材料工程"
    },
    {
        "name": "高分子材料与工程"
    },
    {
        "name": "复合材料与工程"
    },
    {
        "name": "能源与动力工程"
    },
    {
        "name": "电气工程及其自动化"
    },
    {
        "name": "电子信息工程"
    },
    {
        "name": "电子科学与技术"
    },
    {
        "name": "通信工程"
    },
    {
        "name": "微电子科学与工程"
    },
    {
        "name": "光电信息科学与工程"
    },
    {
        "name": "信息工程"
    },
    {
        "name": "自动化"
    },
    {
        "name": "计算机科学与技术"
    },
    {
        "name": "软件工程"
    },
    {
        "name": "网络工程"
    },
    {
        "name": "信息安全"
    },
    {
        "name": "物联网工程"
    },
    {
        "name": "数字媒体技术"
    },
    {
        "name": "土木工程"
    },
    {
        "name": "建筑环境与能源应用工程"
    },
    {
        "name": "给排水科学与工程"
    },
    {
        "name": "建筑电气与智能化"
    },
    {
        "name": "水利水电工程"
    },
    {
        "name": "水文与水资源工程"
    },
    {
        "name": "港口航道与海岸工程"
    },
    {
        "name": "测绘工程"
    },
    {
        "name": "遥感科学与技术"
    },
    {
        "name": "化学工程与工艺"
    },
    {
        "name": "制药工程"
    },
    {
        "name": "地质工程"
    },
    {
        "name": "勘查技术与工程"
    },
    {
        "name": "资源勘查工程"
    },
    {
        "name": "采矿工程"
    },
    {
        "name": "石油工程"
    },
    {
        "name": "矿物加工工程"
    },
    {
        "name": "油气储运工程"
    },
    {
        "name": "纺织工程"
    },
    {
        "name": "服装设计与工程"
    },
    {
        "name": "轻化工程"
    },
    {
        "name": "包装工程"
    },
    {
        "name": "印刷工程"
    },
    {
        "name": "交通运输"
    },
    {
        "name": "交通工程"
    },
    {
        "name": "航海技术"
    },
    {
        "name": "轮机工程"
    },
    {
        "name": "飞行技术"
    },
    {
        "name": "船舶与海洋工程"
    },
    {
        "name": "航空航天工程"
    },
    {
        "name": "飞行器设计与工程"
    },
    {
        "name": "飞行器制造工程"
    },
    {
        "name": "飞行器动力工程"
    },
    {
        "name": "飞行器环境与生命保障工程"
    },
    {
        "name": "武器系统与工程"
    },
    {
        "name": "武器发射工程"
    },
    {
        "name": "探测制导与控制技术"
    },
    {
        "name": "弹药工程与爆炸技术"
    },
    {
        "name": "特种能源技术与工程"
    },
    {
        "name": "装甲车辆工程"
    },
    {
        "name": "信息对抗技术"
    },
    {
        "name": "核工程与核技术"
    },
    {
        "name": "辐射防护与核安全"
    },
    {
        "name": "工程物理"
    },
    {
        "name": "核化工与核燃料工程"
    },
    {
        "name": "农业工程"
    },
    {
        "name": "农业机械化及其自动化"
    },
    {
        "name": "农业电气化"
    },
    {
        "name": "农业建筑环境与能源工程"
    },
    {
        "name": "农业水利工程"
    },
    {
        "name": "森林工程"
    },
    {
        "name": "木材科学与工程"
    },
    {
        "name": "林产化工"
    },
    {
        "name": "环境科学与工程"
    },
    {
        "name": "环境工程"
    },
    {
        "name": "环境科学"
    },
    {
        "name": "环境生态工程"
    },
    {
        "name": "生物医学工程"
    },
    {
        "name": "食品科学与工程"
    },
    {
        "name": "食品质量与安全"
    },
    {
        "name": "粮食工程"
    },
    {
        "name": "乳品工程"
    },
    {
        "name": "酿酒工程"
    },
    {
        "name": "建筑学"
    },
    {
        "name": "城乡规划"
    },
    {
        "name": "风景园林"
    },
    {
        "name": "安全工程"
    },
    {
        "name": "生物工程"
    },
    {
        "name": "刑事科学技术"
    },
    {
        "name": "消防工程"
    },
    {
        "name": "农学"
    },
    {
        "name": "园艺"
    },
    {
        "name": "植物保护"
    },
    {
        "name": "植物科学与技术"
    },
    {
        "name": "种子科学与工程"
    },
    {
        "name": "设施农业科学与工程"
    },
    {
        "name": "农业资源与环境"
    },
    {
        "name": "野生动物与自然保护区管理"
    },
    {
        "name": "水土保持与荒漠化防治"
    },
    {
        "name": "动物科学"
    },
    {
        "name": "动物医学"
    },
    {
        "name": "动物药学"
    },
    {
        "name": "林学"
    },
    {
        "name": "园林"
    },
    {
        "name": "森林保护"
    },
    {
        "name": "水产养殖学"
    },
    {
        "name": "海洋渔业科学与技术"
    },
    {
        "name": "草业科学"
    },
    {
        "name": "基础医学"
    },
    {
        "name": "临床医学"
    },
    {
        "name": "口腔医学"
    },
    {
        "name": "预防医学"
    },
    {
        "name": "食品卫生与营养学"
    },
    {
        "name": "中医学"
    },
    {
        "name": "针灸推拿学"
    },
    {
        "name": "藏医学"
    },
    {
        "name": "蒙医学"
    },
    {
        "name": "维医学"
    },
    {
        "name": "壮医学"
    },
    {
        "name": "哈医学"
    },
    {
        "name": "中西医临床医学"
    },
    {
        "name": "药学"
    },
    {
        "name": "药物制剂"
    },
    {
        "name": "中药学"
    },
    {
        "name": "中药资源与开发"
    },
    {
        "name": "法医学"
    },
    {
        "name": "医学检验技术"
    },
    {
        "name": "医学实验技术"
    },
    {
        "name": "医学影像技术"
    },
    {
        "name": "眼视光学"
    },
    {
        "name": "康复治疗学"
    },
    {
        "name": "口腔医学技术"
    },
    {
        "name": "卫生检验与检疫"
    },
    {
        "name": "护理学"
    },
    {
        "name": "管理科学"
    },
    {
        "name": "信息管理与信息系统"
    },
    {
        "name": "工程管理"
    },
    {
        "name": "房地产开发与管理"
    },
    {
        "name": "工程造价"
    },
    {
        "name": "工商管理"
    },
    {
        "name": "市场营销"
    },
    {
        "name": "会计学"
    },
    {
        "name": "财务管理"
    },
    {
        "name": "国际商务"
    },
    {
        "name": "人力资源管理"
    },
    {
        "name": "审计学"
    },
    {
        "name": "资产评估"
    },
    {
        "name": "物业管理"
    },
    {
        "name": "劳动与社会保障"
    },
    {
        "name": "文化产业管理"
    },
    {
        "name": "农林经济管理"
    },
    {
        "name": "农村区域发展"
    },
    {
        "name": "公共事业管理"
    },
    {
        "name": "行政管理"
    },
    {
        "name": "土地资源管理"
    },
    {
        "name": "城市管理"
    },
    {
        "name": "图书馆学"
    },
    {
        "name": "档案学"
    },
    {
        "name": "信息资源管理"
    },
    {
        "name": "物流管理"
    },
    {
        "name": "物流工程"
    },
    {
        "name": "工业工程"
    },
    {
        "name": "电子商务"
    },
    {
        "name": "旅游管理"
    },
    {
        "name": "酒店管理"
    },
    {
        "name": "会展经济与管理"
    },
    {
        "name": "艺术史论"
    },
    {
        "name": "音乐表演"
    },
    {
        "name": "音乐学"
    },
    {
        "name": "作曲与作曲技术理论"
    },
    {
        "name": "舞蹈表演"
    },
    {
        "name": "舞蹈学"
    },
    {
        "name": "舞蹈编导"
    },
    {
        "name": "表演"
    },
    {
        "name": "戏剧学"
    },
    {
        "name": "电影学"
    },
    {
        "name": "戏剧影视文学"
    },
    {
        "name": "广播电视编导"
    },
    {
        "name": "戏剧影视导演"
    },
    {
        "name": "戏剧影视美术设计"
    },
    {
        "name": "录音艺术"
    },
    {
        "name": "播音与主持艺术"
    },
    {
        "name": "动画"
    },
    {
        "name": "美术学"
    },
    {
        "name": "绘画"
    },
    {
        "name": "雕塑"
    },
    {
        "name": "摄影"
    },
    {
        "name": "艺术设计学"
    },
    {
        "name": "视觉传达设计"
    },
    {
        "name": "环境设计"
    },
    {
        "name": "产品设计"
    },
    {
        "name": "服装与服饰设计"
    },
    {
        "name": "公共艺术"
    },
    {
        "name": "工艺美术"
    },
    {
        "name": "数字媒体艺术"
    }
];

/**
 * 图书分类
 * @type {{文学: string[], 流行: string[], 文化: string[], 生活: string[], 经管: string[], 科技: string[]}}
 */
exports.BookTags = {
    "经管": [
        "经济学",
        "管理",
        "经济",
        "金融",
        "商业",
        "投资",
        "营销",
        "理财",
        "创业",
        "广告",
        "股票",
        "企业史",
        "策划"
    ],
    "科技": [
        "科普",
        "互联网",
        "编程",
        "科学",
        "交互设计",
        "用户体验",
        "算法",
        "web",
        "科技",
        "UE",
        "通信",
        "UCD",
        "交互",
        "神经网络",
        "程序"
    ],
    "文学": [
        "小说",
        "外国文学",
        "文学",
        "随笔",
        "中国文学",
        "经典",
        "散文",
        "日本文学",
        "村上春树",
        "童话",
        "诗歌",
        "杂文",
        "王小波",
        "张爱玲",
        "儿童文学",
        "古典文学",
        "余华",
        "名著",
        "钱钟书",
        "当代文学",
        "鲁迅",
        "外国名著",
        "诗词",
        "茨威格",
        "昆德拉",
        "杜拉斯",
        "港台"
    ],
    "流行": [
        "漫画",
        "绘本",
        "推理",
        "青春",
        "言情",
        "科幻",
        "悬疑",
        "东野圭吾",
        "武侠",
        "韩寒",
        "奇幻",
        "日本漫画",
        "耽美",
        "亦舒",
        "三毛",
        "安妮宝贝",
        "网络小说",
        "郭敬明",
        "穿越",
        "推理小说",
        "金庸",
        "轻小说",
        "几米",
        "克里斯蒂",
        "幾米",
        "张小娴",
        "魔幻",
        "青春文学",
        "罗琳",
        "高木直子",
        "沧月",
        "古龙",
        "科幻小说",
        "落落",
        "张悦然",
        "蔡康永"
    ],
    "文化": [
        "历史",
        "心理学",
        "哲学",
        "传记",
        "文化",
        "社会学",
        "设计",
        "艺术",
        "政治",
        "社会",
        "建筑",
        "宗教",
        "电影",
        "数学",
        "政治学",
        "回忆录",
        "思想",
        "国学",
        "中国历史",
        "音乐",
        "人文",
        "戏剧",
        "人物传记",
        "绘画",
        "艺术史",
        "佛教",
        "军事",
        "西方哲学",
        "近代史",
        "二战",
        "自由主义",
        "考古",
        "美术"
    ],
    "生活": [
        "爱情",
        "旅行",
        "生活",
        "励志",
        "成长",
        "摄影",
        "心理",
        "女性",
        "职场",
        "美食",
        "游记",
        "教育",
        "灵修",
        "情感",
        "健康",
        "手工",
        "养生",
        "两性",
        "家居",
        "人际关系",
        "自助游"
    ]
};

/**
 * 去超级课程表抓取全国大学信息,添加到School表里
 */
exports.spiderSchoolsFromMyFriday = function () {
    var url = 'http://course.myfriday.cn:80/V2/School/getNewSchoolList.action';
    var AvosSchool = AV.Object.extend('School');
    Request.post(url, function (err, res, body) {
        if (!err) {
            var json = JSON.parse(body);
            var schools = json.data.updateList;
            for (var i = 0; i < schools.length; i++) {
                var name = schools[i].name;
                var school = new AvosSchool();
                school.save({
                    name: name
                })
            }
        }
    })
};

/**
 * 去豆瓣图书获取最新图书
 * @param start 开始位置
 * @param count 取多少个
 * @returns {AV.Promise}
 */
exports.getNewBooks = function (start, count) {
    var url1 = 'http://topbook.zconly.com/v1/top/category/10104/books';
    var url2 = 'http://topbook.zconly.com/v1/top/category/10105/books';
    var start1 = Math.ceil(start / 2);
    var start2 = start - start1;
    var count1, count2;
    if (start % 2 == 0) {
        count1 = Math.ceil(count / 2);
    } else {
        count1 = Math.floor(count / 2);
    }
    count2 = count - count1;

    var rePromise = new AV.Promise(null);
    var hasDone1 = false, hasDone2 = false;
    var reJSON = [];
    Request.get({
        url: url1,
        qs: {
            start: start1,
            count: count1
        }
    }, function (err, res, body) {
        if (err) {
            rePromise.reject(err);
        } else {
            var json = JSON.parse(body);
            var books = json.books;
            for (var i = 0; i < books.length; i++) {
                var oneBook = JSON.parse(books[i].book);
                reJSON.push(simpleOneBook(oneBook));
            }
            hasDone1 = true;
            re();
        }
    });
    Request.get({
        url: url2,
        qs: {
            start: start2,
            count: count2
        }
    }, function (err, res, body) {
        if (err) {
            rePromise.reject(err);
        } else {
            var json = JSON.parse(body);
            var books = json.books;
            for (var i = 0; i < books.length; i++) {
                var oneBook = JSON.parse(books[i].book);
                reJSON.push(simpleOneBook(oneBook));
            }
            hasDone2 = true;
            re();
        }
    });

    /**
     * 简化信息,去掉不必要的信息
     * @param book
     */
    function simpleOneBook(book) {
        return {
            title: book.title,
            isbn13: book.isbn13,
            image: book.image,
            price: book.price,
            publisher: book.publisher,
            author: book.author,
            pubdate: book.pubdate
        }
    }

    function re() {
        if (hasDone1 && hasDone2) {
            rePromise.resolve(reJSON);
        }
    }

    return rePromise;
};