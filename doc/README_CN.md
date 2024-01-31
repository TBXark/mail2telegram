
<h1 align="center">
mail2telegram
</h1>

<p align="center">
    <br> <a href="../README.md">English</a> | 中文
</p>
<p align="center">
    <em>使用Telegram机器人获取您的临时电子邮件..</em>
</p>


这是一个基于 Cloudflare Email Routing Worker的 Telegram Bot，能够将邮件转换成telegram消息。你可以将任意前缀的收件人的邮件转发到Bot，然后一个无限地址的临时邮箱Bot就诞生了。

<details>
<summary>点击查看Demo</summary>
<img style="max-width: 600px;" alt="image" src="example.png">
</details>



## 安装流程

### 1.部署Workers

#### 1.1 使用命令行部署

- 克隆项目

    `git clone git@github.com:TBXark/mail2telegram.git`
- 复制配置模板，修改成自己的telegram配置 

    `cp wrangler.example.toml wrangler.toml` 
- 部署 

    `yarn & yarn pub`

#### 1.2 使用复制粘贴部署

- 如果你不想使用命令行部署只想复制粘贴可以使用我编译好的版本 > [`index.js`](../build/index.js)
- 使用复制粘贴部署需要手动在项目配置页面设置环境变量
-  需要生成白名单/黑名单的正则JSON数组字符串可以使用这个小工具，里面还有几个demo。 [regexs2jsArray](https://codepen.io/tbxark/full/JjxdNEX)


### 2. 配置Cloudflare Email Routing

1. 按照官方教程配置[Cloudflare Email Routing](https://blog.cloudflare.com/zh-cn/introducing-email-routing-zh-cn/)
2. 配置路由 在`Email Routing - Routing Rules` 中 `Catch-all address` 的 action 改成 `Send to a Worker:mail2telegram`。 把所有剩余的邮件都转发到我这个worker。
3. 如果将`Catch-all address`设置成workers后就没有办法将剩余所有邮件转发到你自己的邮件，如果你需要备份邮件，你只需要在worker环境变量中的`FORWARD_LIST`填入你的备份邮箱即可。

### 3. 绑定Telegram Webhook

调用`https://project_name.user_name.workers.dev/init`即可绑定Webhook，查看返回结果确认绑定状态。


## 配置

| KEY                    | 描述                                                                                                                                                                    |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TELEGRAM_ID            | 你的Telegram ID, 纯数字可以通过`/id`指令获取                                                                                                                                       |
| TELEGRAM_TOKEN         | Telegram Bot Token                                                                                                                                                    |
| DOMAIN                 | Workers的域名, 例子: `project_name.user_name.workers.dev`                                                                                                                  |
| FORWARD_LIST           | 备份邮件，可以转发到自己的邮箱备份, 留空则不转发，可以填入多个使用`,`分隔                                                                                                                               |
| WHITE_LIST             | 发件人白名单，一个正则表达式数组转成字符串，例：`[\".*@10086\\\\.cn\"]`                                                                                                                       |
| BLOCK_LIST             | 发件人黑名单，一个正则表达式数组转成字符串                                                                                                                                                 |
| MAIL_TTL               | 邮件缓存保存时间，单位秒, 默认为一天, 过期之后邮件将无法预览，请注意备份                                                                                                                                |
| OPENAI_API_KEY         | OpenAI API Key, 用于邮件内容总结，如果不填写则不会出现`Summary`按钮                                                                                                                        |
| OPENAI_COMPLETIONS_API | 可自定义API，默认值为 `https://api.openai.com/v1/chat/completions`                                                                                                             |
| OPENAI_CHAT_MODEL      | 可自定义模型，默认值为 `gpt-3.5-turbo`                                                                                                                                           |
| SUMMARY_TARGET_LANG    | 可自定义总结的语言，默认值为 `english`                                                                                                                                              |
| GUARDIAN_MODE          | 守护模式，默认关闭，若要开启则填入`true`                                                                                                                                               |
| MAX_EMAIL_SIZE         | 最大邮件大小，单位字节，超过此大小的邮件将会根据`MAX_EMAIL_SIZE_POLICY`判断处理逻辑。主要作用是防止邮件附件过大导致worker函数超时。默认为512*1024                                                                           |
| MAX_EMAIL_SIZE_POLICY  | 可选值为`unhandled`,`truncate`,`continute`。 `unhandled`表示不处理只返回邮件头信息不解析邮件正文，`truncate`表示截断邮件正文只解析允许的大小，`continute`表示继续处理不管大小限制。默认为`truncate`。这个策略只影响Telegram推送消息，不影响邮件转发。 |
| DB                     | 绑定 `KV Namespace Bindings` 数据库到worker, 名字必须为`DB`                                                                                                                      |

> `WHITE_LIST`和`BLOCK_LIST`同时对收件人和发件人生效，`WHITE_LIST`的优先级高于`BLOCK_LIST`。

> `FORWARD_LIST`中的邮箱地址应该是要在 `Cloudflare Dashboard - Email Routing - Destination addresses` 中添加认证之后才能收到邮件


## 特别说明

默认消息结构如下
```
[Subject]

-----------
From : [sender]
To: [recipient]

(Preview)(Summary)(Text)(HTML)

```


当邮件转发通知到Telegram的时候只有标题，发件人，收件人还有四个按钮。

使用`Preview`可以在bot中直接预览纯文本模式的邮件，但是有4096个字符的限制，如果超过了4096个字符，你可以使用`TEXT`或者`HTML`查看完整的邮件。预览消息下面有`Back`按钮，点击后即可关闭预览。

当你配置了`OPENAI_API_KEY`就会出现`Summary`按钮，这样你可以对邮件进行内容总结。总结消息下面有`Back`按钮，点击后即可关闭总结。

使用`TEXT`可以看到纯文本的邮件，`HTML`可以看到富文本的邮件，但是他其中可能包含某些脚本或者其他追踪链接。建议只有当你有需要的时候或者确认来源没有问题的时候才使用富文本模式。

为了安全起见，当超过`MAIL_TTL`邮件缓存保存时间，按钮跳转的链接无法打开。你可以自行修改环境变量调整过期时间。

此Bot展示不支持附件，如果你需要附件支持可以联合我的另外一个项目[testmail-viewer](https://github.com/TBXark/testmail-viewer), 使用`FORWARD_LIST`将邮件转发到你的testmail，这样你就可以使用[testmail-viewer](https://github.com/TBXark/testmail-viewer)下载你的附件。

由于Workers限制，邮件大小（主要是附件大小）一旦太大就会执行函数超时，此时Workers会进行多次重试，可能导致你收到多次的通知，备份邮箱也会收到多次的邮件。而且这个重试是有次数限制的，一旦超过限制就不会继续重试了。这就有可能导致你的邮件丢失。所以建议你在`FORWARD_LIST`中填入你的备份邮箱，这样即使你的邮件丢失了，你也可以在备份邮箱中找到你的邮件。如果你经常遇到这个问题你可以尝试打开守护模式（`GUARDIAN_MODE`），这样他就会记录已经执行过的操作并不在下一次重试时执行。从而减少重复消息的干扰，而且增加worker的成功概率。但是这个操作会消耗较多的KV写入次数，所以建议你在有需要的时候开启。

## 许可证

**mail2telegram** 以 MIT 许可证发布。[详见 LICENSE](../LICENSE) 获取详情。

