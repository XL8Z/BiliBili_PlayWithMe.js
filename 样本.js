开平长链 = {
    弹幕事件: {
        "data": {
            "fans_medal_level": 21,
            "fans_medal_name": "官方",
            "fans_medal_wearing_status": false,
            "guard_level": 0,
            "msg": "你们谁扔个小心心呗",
            "timestamp": 1650717881,
            "uid": 3102384,
            "uname": "猫裙少年泽远喵",
            "uface": "http://i0.hdslb.com/bfs/face/7ced8612a3f3ef10e7238ee22b4c6948d3f53139.jpg",
            "msg_id": "eb805544-0cf2-4688-bca1-88299e5344bf",
            "room_id": 4639581
        },
        "cmd": "LIVE_OPEN_PLATFORM_DM"
    },
    礼物事件: {
        "data": {
            "uid": 114439178,
            "uname": "不忘韩文初心",
            "uface": "http://i2.hdslb.com/bfs/face/e549b18085113c6f824c0eefaf2c9d9dcaf5a1d5.jpg",
            "gift_id": 30607,
            "gift_name": "小心心",
            "gift_num": 1,
            "price": 0,
            "paid": false,
            "fans_medal_level": 25,
            "fans_medal_name": "官方",
            "guard_level": 3,
            "timestamp": 1650717898,
            "anchor_info": {
                "uface": "http://i0.hdslb.com/bfs/face/7ced8612a3f3ef10e7238ee22b4c6948d3f53139.jpg",
                "uid": 3102384,
                "uname": "猫裙少年泽远喵"
            },
            "msg_id": "e0677be6-4d08-49bc-a722-17238b0f370b",
            "room_id": 4639581
        },
        "cmd": "LIVE_OPEN_PLATFORM_SEND_GIFT"
    },
    上舰事件: {
        "data": {
            "user_info": {
                "uid": 616066,
                "uname": "你的魔法",
                "uface": "http://i1.hdslb.com/bfs/face/f1d9def953795085dd42aecb2e57a08a3cdf65ac.jpg"
            },
            "guard_level": 3,
            "guard_num": 1,
            "guard_unit": "月",
            "fans_medal_level": 0,
            "fans_medal_name": "",
            "fans_medal_wearing_status": false,
            "timestamp": 1654801753,
            "msg_id": "415d1592-9f76-4c84-9a59-4a2ee081a4dd",
            "room_id": 4639581
        },
        "cmd": "LIVE_OPEN_PLATFORM_GUARD"
    },
    SC事件: {
        "data": {
            "guard_level": 0,
            "uid": 1270482,
            "uname": "Sequbre",
            "uface": "http://i0.hdslb.com/bfs/face/061e978938b8a60b4920fad15596657e77465170.jpg",
            "message_id": 3992851,
            "message": "进行一个鱼的摸",
            "rmb": 30,
            "timestamp": 1652413567,
            "start_time": 1652413567,
            "end_time": 1652413627,
            "fans_medal_level": 0,
            "fans_medal_name": "",
            "fans_medal_wearing_status": false,
            "msg_id": "968e07ea-49e6-478c-867e-b721ccbd0d62",
            "room_id": 4639581
        },
        "cmd": "LIVE_OPEN_PLATFORM_SUPER_CHAT"
    }
}

/**
 * 现在v2接口只有通过身份码【Code】发起请求
 * 才会给你房间号、主播信息和用于发起开平长链的签名JSON【auth_body】
 */
v2接口请求AppStart = {
    // 注意只有code是0才是请求成功，如果不是0……
    // https://open-live.bilibili.com/document/doc&tool/auth.html#%E5%85%AC%E5%85%B1%E9%94%99%E8%AF%AF%E7%A0%81
    "code": 0,
    "message": "0",
    "request_id": "1534992646149816320",
    "data": {
        // 主播的各种八卦信息，注意你是先有身份码才有房间号，防止通过房间号直接未经主播同意建立长链
        "anchor_info": {
            "room_id": 4639581,
            "uface": "http://i0.hdslb.com/bfs/face/7ced8612a3f3ef10e7238ee22b4c6948d3f53139.jpg",
            "uid": 3102384,
            "uname": "猫裙少年泽远喵"
        },
        "game_info": {
            // 开放平台互动游戏场次ID，如果你做插件可以不用管
            "game_id": "93594bf8-70e0-4b30-a5e9-0d60c4e11e17"
        },
        "websocket_info": {
            // 签名JSON，表示本次开平长链连接行为是得到批准的
            "auth_body": "{\"roomid\":4639581,\"protover\":2,\"uid\":1081499745,\"key\":\"rn6HS6_gfZjI4J1jki0kDSvnsS_kLWithuUJFcMGg-cmiS0zn-Mh2n8fGMJUa20X6hUMlGKCOisEgii0syDoMzUZdyCQ2D-_Xg9cnfgvxExejNe4GgFb3g03enQw_E9Roau5z17FrGraWlAaJ_Yl2Xus7g==\",\"group\":\"open\"}",
            "wss_link": [
                // 谢天谢地他们可算把/sub加上去了，单给个域名坑了多少人
                "wss://tx-sh-live-comet-03.chat.bilibili.com:443/sub",
                "wss://tx-gz-live-comet-05.chat.bilibili.com:443/sub",
                "wss://broadcastlv.chat.bilibili.com:443/sub"
            ]
        }
    }
}

v1API = {
    请求应用启动: { "code": 0, "message": "0", "request_id": "1541720746409832448", "data": {} },
    请求开平长链: {
        "code": 0,
        "message": "0",
        "request_id": "1537258105452707840",
        "data": {
            "auth_body": "{\"roomid\":4639581,\"protover\":2,\"uid\":1081499745,\"key\":\"tNV3lanTm5YHV4sE_Acvk2kO3bd6sw-7ZBeQ6tuoKZlrswdPbEXCZciNAAXvL-hMihGeVrcoHlL6zyHsHPDwXdk7nhwdKhKYrn_H9J9Dj5JCGl7FmyC_2LsRPiUItikq5jg4Cn_y2Qn7RUkONEIbpQAU4UI=\",\"group\":\"open\"}",
            "host": ["tx-gz-live-comet-04.chat.bilibili.com", "tx-sh-live-comet-02.chat.bilibili.com", "broadcastlv.chat.bilibili.com"],
            "ip": ["106.53.122.92", "49.235.252.229", "broadcastlv.chat.bilibili.com"],
            "tcp_port": [2243, 80],
            "ws_port": [2244],
            "wss_port": [443]
        }
    }
}