# PlayWithMe.js
BiliBili直播开放平台 H5前端插件SDK

## 三分钟上手

### 跑通最小单元

1. 确认自己电脑上有必要的软件
   1. PlayWithMe.js 项目
   2. 一个原版Chrome浏览器  
   【如果你会用其他浏览器实现屏蔽域安全检测另说】
   3. 一个用着顺手的前端开发工具  
   【推荐Visual Studio Code】
2. 前往BiliBili饭盒的开发者中心，获取直播创意工坊的开发者Key【*access_key_id* 和 *access_key_secred*】，也可以通过邮件获得【如果忘了是哪个邮箱在这个页面也能看】    
 https://open-live.bilibili.com/open-manage?tab=2
3.  前往BiliBili饭盒的开发者中心，创建一个新H5插件    
 https://open-live.bilibili.com/open-manage?tab=0  
4. 打开插件详情页，获得插件的AppID
5. 将找到的Key填入根目录下的 /MyOpenLiveKey.js，位置大约在152行左右  
【为了防止不小心点开被人看到密钥，前面的90%都是无意义的占位内容，你要滚动到最底部填写】  
【别问，问就是直播的时候手滑点开手忙脚乱撤回直播N次之后一怒之下的暴躁处理方式】
6. 编辑 /本地Demo.html 里的AppID部分，填入自己新建的插件的AppID  
具体位置位置在 /本地Demo.html 里的大约54行左右，如：  
  ``    BiLive_PlayWithMeJS.AppID = 1657607678225;   ``
7. 使用 /启动没有CORS的Chrome.bat 启动Chrome【如果没有建议先安装】  
**一定要确认自己看到了Chrome的警告，这表示你成功运行在强制无CORS保护的模式下**  
这个警告一般会这样写： *您使用的是不受支持的命令行标记：--disable-web-security，稳定性和安全性会有所下降* 
8. 使用屏蔽了CORS策略不安全的浏览器打开 /本地Demo.html  
9.  填入你的主播身份码  
【前往主播中心提取：https://link.bilibili.com/p/center/index#/my-room/start-live】
10. 提示 申请AppStart启动成功 即可开始体验开平长链  
**【注意本地自签有严重问题，应该仅用于对开平长链的基本了解和插件开发的测试阶段】**

### CORS和跨域到底是什么意思
- B站的直播开放平台服务器端在 *https://live-open.biliapi.com/v2/* 下，实际的域是 *https://live-open.biliapi.com/*  
 而我们直接打开HTML文件时你的域名是 *null* 或者其他什么玩意  
- 当你身在我们现在的 *null*域 时试图请求 *https://live-open.biliapi.com/* 的接口，会造成跨域访问，这种行为被视为对 *https://live-open.biliapi.com/* 的攻击行为，会被浏览器的CORS策略自动叫停拦截
- 如果要想在浏览器前端网页内完成对B站服务器的请求，就必须要屏蔽CORS策略强制执行这个跨域请求，才能拿到B站服务器批准建立长链的数据
- 如果你使用Python或者Java之类的爬虫，爬虫是会无视跨域要求的，这个CORS策略一般是浏览器平台特有的
- 在没有屏蔽CORS策略时，本地的插件必须使用JSONP代签才能运行
- WEBSocket 属于特殊情况，WEBSocket 长链接不受 CORS跨域策略 的限制

### 爱心提示【误】
- **如果你是个好孩子，我希望你不要随便移除代码里的版权和开源许可信息，以及各种LICENSE**
- **我们收录了一批真实的请求数据放在了 /样本.js**  
- **网页 比较麻烦 *F12* 或者 *右键→审查元素* 接下来很有用**
- **很多重要数据都输出到了控制台(Console)，如果你想要了解开平长链的使用细节，一定要去看**
- 开平长链通讯部分使用的是DeBug级别，想看完整数据需要自己在控制台右上角勾选 *显示DeBug级别信息* 或者 *显示全部信息*
- **注意屏蔽了CORS策略之后的浏览器极度不安全，也正是因为如此，谷歌方面强制要求我们使用船新的独立的用户文件夹，避免自己的收藏夹和Cookies被盗**

 
## 进阶操作必要关键信息

### 基础文件结构

* ChromeDeveloperFile  
强制关闭跨域后Chrome浏览器强制要求的独立本地文件夹【不重要可忽略】  
* Lib  
引用的第三方JS库
  * h2non / jshashes.js  
JavaScript的Hash支持，用于实现MD5和SHA256以及HMAC的支持
  * LinusU / decode-utf8.js  
将二进制数据使用UTF-8解码成字符串【已经集成进入 BiLive_PlayWithMe.js，此处仅供参考】
  * nebobyeoli / hexbytes.js  
同上，但是功能更全【暂未使用】
  * PlayWithMe.js  
主角，核心库  
    * BiLive_PlayWithMe.Full.js   
完整版，包含一套在本地使用屏蔽安全检查的Chrome浏览器自行完成请求签名的完整代码
    * BiLive_PlayWithMe.js  
标准版，为线上发布精简掉了本地签名部分，使用POST同域签名或者JSONP跨域签名
    * BiLive_PlayWithMe.Min.js  
上述版本压缩后的文件，用于实际发布
    * GiftList.js  
爬取B站数据后得到的礼物数据库，用来解决开平长链不传礼物图片的问题
* 样本.js  
简单的通讯内容样本数据结构参考
* MyOpenLiveKey.js  
独立文件，用来存放你的开放平台开发者Key，仅用于本地签名  
**这个文件只应该在开发测试中使用，发布时一定要删除，慎防开发者密钥泄露**

### 核心文件结构
- 参考JS文件内的注释，不在另行赘述

## 使用PlayWithMe.js进行H5插件开发

### 注意事项
- **你的插件网页里一定要允许屏蔽Referrer，不然调用腾讯云图库拉取B站头像和表情会被拦截**  
为此你需要在插件网页HTML的Head部分写上  
`` <meta content="never" name="referrer"> ``
- **你发到开放平台饭贩的插件会额外再被套一层iFrame，所以一定要给 *https://play-live.bilibili.com/* 这个域 挂一个iFrame套壳白名单，不然会被误认为是套壳网页攻击被拦截**   
你需要在服务器端的对此Get请求的Response标注  
``X-Frame-Options: ALLOW-FROM https://play-live.bilibili.com/``
- Sign签名是唯一能证明用户来自饭贩商店的东西，而且注意是必须要订阅你的插件才能拿到哦，个人建议还是验一下
- **如果你不知道如何校验Sign签名，可以看看 *BiLive_PlayWithMeJS_Authorizer* 类里的*LocalAuthorizer_SignCheck*  方法**
- H5插件会有一个额外参数plug_env，为1时是设置页面，为0时是正常页面，当然你也可以无视这个参数


## 模仿与借鉴

- 你可以考虑去翻翻网页调试控制台里的 *网络(Network)* 模块，注意里面有筛选器可以单独只看WEBSocket哦
- 注意要先打开网页的调试控制台，再刷新网页， *网络(Network)* 模块只会在控制台激活后录制各种网络活动
- *网络(Network)* 模块下请求列表里，写着 *start* 或者 * https://live-open.biliapi.com/v2/app/start * 的就是开放平台启动应用时申请启动并获取开平长链密钥的请求  
  - 接口定义参考 https://open-live.bilibili.com/document/doc&tool/api/interactPlay.html  
  - 可以额外留意一下上述 */app/start* 接口*请求标头* 里的特殊字段，这些字段是证明你是开发者的必要内容  
  - 字段内容、含义和取得方式参考  https://open-live.bilibili.com/document/doc&tool/auth.html  
  - 这部分代码位于 /Lib/PlayWithMe.js/BiLive_PlayWithMe.Full.js 里
    - 请求B站服务器申报App启动并请求开平长链密钥的代码位于  
    *BiLive_PlayWithMeJS* 类里的 *AppStart_Local*  方法
    - 为上述请求进行签名的代码位于 
    *BiLive_PlayWithMeJS_Authorizer* 类里的*LocalAuthorizer_GenerateAuthorizedHead*  方法
- *网络(Network)* 模块下请求列表里，写着 *sub* 或者 *wss://broadcastlv.chat.bilibili.com/sub* 的就是开平长链的 WEBSocket长链接  
  - 通讯协议参考 https://open-live.bilibili.com/document/doc&tool/api/websocket.html
  - 收到的数据内容参考 https://open-live.bilibili.com/document/liveRoomData.html
  - 长链接的代码位于 
  *BiLive_PlayWithMeJS_WEBSocketClient* 类
    - Login 方法为长链接的登录握手包发送
    - HeartBeat 方法为心跳包的制作和发送
    - NewPkg 方法为收到数据包后的解包处理
    - NewJSONMsg 方法为收到事件JSON的后处理
