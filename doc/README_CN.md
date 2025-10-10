
<h1 align="center">
mail2telegram
</h1>

<p align="center">
    <br> <a href="../README.md">English</a> | 中文
</p>
<p align="center">
    <em>使用Telegram机器人获取您的临时电子邮件..</em>
</p>

![](./social_preview.png)

这是一个基于 Cloudflare Email Routing Worker的 Telegram Bot，能够将邮件转换成telegram消息。你可以将任意前缀的收件人的邮件转发到Bot，然后一个无限地址的临时邮箱Bot就诞生了。

<details>
<summary>点击查看Demo</summary>
<img style="max-width: 600px;" alt="image" src="example.png">
</details>



## 安装流程

### 0. 配置Telegram

1. 创建bot获得token，使用`@BotFather > /newbot`，创建一个机器人然后复制token。
2. 调用 `https://project_name.user_name.workers.dev/init` 即可绑定Webhook，查看返回结果确认绑定状态。
3. 为了使用Telegram小程序你必须得设置隐私政策，请访问 `@BotFather > /mybots > （选择一个） > 编辑机器人 > 编辑隐私政策`，然后设置成telegram小程序默认的隐私政策：`https://telegram.org/privacy-tpa`

### 1.部署Workers

#### 1.1 使用命令行部署

1. 克隆项目

    `git clone git@github.com:TBXark/mail2telegram.git`
2. 复制配置模板，修改成自己的telegram配置 

    `cp wrangler.example.jsonc wrangler.jsonc` 
3. 部署 

    `yarn & yarn pub`

#### 1.2 使用复制粘贴部署

1. 如果你不想使用命令行部署只想复制粘贴可以使用我编译好的版本 > [`index.ts`](../build/index.js)
2. 使用复制粘贴部署需要手动在项目配置页面设置环境变量
3. 绑定 `KV Namespace Bindings` 数据库到worker, 名字必须为`DB`


### 2. 配置Cloudflare Email Routing

1. 按照官方教程配置[Cloudflare Email Routing](https://blog.cloudflare.com/zh-cn/introducing-email-routing-zh-cn/)
2. 配置路由 在`Email Routing - Routing Rules` 中 `Catch-all address` 的 action 改成 `Send to a Worker:mail2telegram`。 把所有剩余的邮件都转发到我这个worker。
3. 如果将`Catch-all address`设置成workers后就没有办法将剩余所有邮件转发到你自己的邮件，如果你需要备份邮件，你只需要在worker环境变量中的`FORWARD_LIST`填入你的备份邮箱即可。
4. `FORWARD_LIST`中的邮箱地址应该是要在 `Cloudflare Dashboard - Email Routing - Destination addresses` 中添加认证之后才能收到邮件


## 配置

位置：Workers和Pages - 你的worker名称 - 设置 - 变量

| KEY                    | 描述                                                                                                                                                                    |
|:-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TELEGRAM_ID            | Bot发送目的地的Chat ID（比如你自己Telegram账号的ID），可以通过bot的`/id`指令获取, 一般为一串数字，群组以-100开头, 多个ID以英文逗号分隔                                                                                |
| TELEGRAM_TOKEN         | Telegram Bot Token 例如：`7123456780:AAjkLAbvSgDdfsDdfsaSK0`                                                                                                             |
| DOMAIN                 | Workers的域名, 例如: `project_name.user_name.workers.dev`                                                                                                                  |
| FORWARD_LIST           | 备份邮件，可以转发到自己的邮箱备份, 留空则不转发，可以填入多个使用`,`分隔                                                                                                                               |
| ~~WHITE_LIST~~         | **即将废弃,改用内置小程序进行编辑**，发件人白名单，一个正则表达式或者邮箱地址数组转成字符串，例：`[\".*@10086\\\\.cn\"]`                                                                                            |
| ~~BLOCK_LIST~~         | **即将废弃,改用内置小程序进行编辑**，发件人黑名单，一个正则表达式或者邮箱地址数组转成字符串                                                                                                                      |
| MAIL_TTL               | 邮件缓存保存时间，单位秒, 默认为一天, 过期之后邮件将无法预览，请注意备份                                                                                                                                |
| WORKERS_AI_MODEL       | Workers AI 模型名称。绑定 `AI` 服务并设置此值后，邮件总结将优先使用 Workers AI。                                                                                                                     |
| OPENAI_API_KEY         | OpenAI API Key，在未配置 Workers AI 时用于生成总结；若 `WORKERS_AI_MODEL` 与此变量都未配置则不会出现 `Summary` 按钮。                                                                                         |
| OPENAI_COMPLETIONS_API | 可自定义API，默认值为 `https://api.openai.com/v1/chat/completions`                                                                                                             |
| OPENAI_CHAT_MODEL      | 可自定义模型，默认值为 `gpt-4o-mini`                                                                                                                                             |
| SUMMARY_TARGET_LANG    | 可自定义总结的语言，默认值为 `english`                                                                                                                                              |
| GUARDIAN_MODE          | 守护模式，默认关闭，若要开启则填入`true`                                                                                                                                               |
| MAX_EMAIL_SIZE         | 最大邮件大小，单位字节，超过此大小的邮件将会根据`MAX_EMAIL_SIZE_POLICY`判断处理逻辑。主要作用是防止邮件附件过大导致worker函数超时。默认为512*1024                                                                           |
| MAX_EMAIL_SIZE_POLICY  | 可选值为`unhandled`,`truncate`,`continute`。 `unhandled`表示不处理只返回邮件头信息不解析邮件正文，`truncate`表示截断邮件正文只解析允许的大小，`continute`表示继续处理不管大小限制。默认为`truncate`。这个策略只影响Telegram推送消息，不影响邮件转发。 |
| RESEND_API_KEY         | Resend API Key, https://resend.com/docs/introduction, 回复消息以回复电子邮件。                                                                                                    |
| DB                     | 在下方的 `KV 命名空间绑定` 处将数据库绑定到worker, `变量名称`必须为`DB`，`KV 命名空间`选新建好的任意KV                                                                                                     |


## Telegram Mini Apps

旧版使用命令方式管理黑白名单已废弃，现在使用小程序的方式管理黑白名单。环境变量中的黑白名单无法在小程序中显示和修改。
> 使用小程序需要重新调用 `/init` 接口绑定指令

| 黑名单                            | 白名单                            | 名单测试                             |
|:-------------------------------|:-------------------------------|:---------------------------------|
| ![image](./tma_block_list.png) | ![image](./tma_white_list.png) | ![image](./tma_test_address.png) |


## 使用说明

默认消息结构如下
```
[Subject]

-----------
From : [sender]
To: [recipient]

(Preview)(Summary)(Text)(HTML)

```


### 邮件预览
当邮件转发通知到Telegram的时候只有标题，发件人，收件人还有四个按钮。

1. `Preview`模式: 可以在bot中直接预览纯文本模式的邮件，但是有4096个字符的限制。
2. `Summary`模式: 绑定 Workers AI 并设置 `WORKERS_AI_MODEL` 后将由 Workers AI 生成总结；否则在配置 `OPENAI_API_KEY` 时使用 OpenAI。两者都未配置时不会显示 `Summary` 按钮。
3. `TEXT`模式: 使用网页查看纯文本的邮件，可以阅读长度超过4096的邮件。
4. `HTML`模式: 可以看到富文本的邮件，但是他其中可能包含某些脚本或者其他追踪链接。建议只有当你有需要的时候或者确认来源没有问题的时候才使用富文本模式。

### 安全与邮件缓存
1. `MAIL_TTL`: 为了安全起见，当超过`MAIL_TTL`邮件缓存保存时间，按钮跳转的链接无法打开。你可以自行修改环境变量调整过期时间。
2. 由于Workers限制，邮件（特别是附件较大时）可能导致函数超时和多次重试，从而可能收到重复通知。建议在FORWARD_LIST中添加备份邮箱，以防邮件丢失。
3. 开启`GUARDIAN_MODE`可减少重复消息干扰，提高worker成功率，但会消耗较多KV写入次数。建议在必要时开启。

### 黑名单与白名单
关于黑白名单匹配规则，下面以白名单举例，首先会从环境变量中读取`WHITE_LIST`转换成数组，然后再从KV中读取`WHITE_LIST`转换成数组,然后将两个数组合并得到完整的白名单规则。匹配时会先判断数组的元素是不是和待匹配的字符串相等，如果相等则匹配成功，如果不相等则会将数组的元素转换成正则表达式，然后再匹配，如果匹配成功则返回成功。如果所有的元素都匹配失败则返回失败。 

需要生成白名单/黑名单的正则JSON数组字符串可以使用这个小工具，里面还有几个demo。 [regexs2jsArray](https://codepen.io/tbxark/full/JjxdNEX)

建议使用小程序进行黑白名单的管理，可以更方便的添加和删除。现有环境变量中的黑白名单即将废弃。

### 邮件附件
此Bot展示不支持附件，如果你需要附件支持可以联合我的另外一个项目[testmail-viewer](https://github.com/TBXark/testmail-viewer), 使用`FORWARD_LIST`将邮件转发到你的testmail，这样你就可以使用[testmail-viewer](https://github.com/TBXark/testmail-viewer)下载你的附件。


## 许可证

**mail2telegram** 以 MIT 许可证发布。[详见 LICENSE](../LICENSE) 获取详情。
