
<h1 align="center">
mail2telegram
</h1>

<p align="center">
    <br> English | <a href="README_CN.md">中文</a>
</p>
<p align="center">
    <em>Use Telegram Bot to get your temporary email..</em>
</p>


This is a Telegram Bot based on Cloudflare Email Routing Worker, which can convert emails into Telegram messages. You can forward emails from recipients with any prefix to the Bot, and then a temporary mailbox Bot with an infinite address will be created.

<details>
<summary>Click to view the demo.</summary>
<img style="max-width: 600px;" alt="image" src="example.png">
</details>



## Installation

### 1. Deploy Workers

#### 1.1 Deploy via Command Line

- Clone the repository:

    `git clone git@github.com:TBXark/mail2telegram.git`
- Copy the configuration template and modify it with your own Telegram configuration: 

    `cp wrangler.example.toml wrangler.toml`
- Deploy 

    `yarn & yarn pub`

#### 1.2 Deploy via Copy and Paste

- If you don't want to deploy using the command line and prefer to copy and paste, you can use the precompiled version > [`index.js`](./build/index.js)
- When deploying via copy and paste, you need to manually set environment variables in the project's configuration page.
- To generate a whitelist/blacklist of regular expressions as a JSON array string, you can use this small tool which also includes some demos: [regexs2jsArray](https://codepen.io/tbxark/full/JjxdNEX)


### 2. Configure Cloudflare Email Routing

- Follow the official tutorial to configure [Cloudflare Email Routing](https://blog.cloudflare.com/introducing-email-routing/).
- Configure routing by changing the action of `Catch-all address` in `Email Routing - Routing Rules` to `Send to a Worker:mail2telegram`. Forward all remaining emails to this worker.
- If you set `Catch-all address` as workers, you won't be able to forward all remaining emails to your own email. If you need to backup emails, simply fill in your backup email in the `FORWARD_LIST` environment variable of the worker.



## Configuration

| KEY | Description |
| ---- | ---- |
| TELEGRAM_ID | Your Telegram ID |
| TELEGRAM_TOKEN | Telegram Bot Token |
| DOMAIN | Workers domain name |
| FORWARD_LIST | Backup emails, can be forwarded to your own email for backup, leave blank if not forwarding, multiple values can be separated by `,` |
| WHITE_LIST | Sender whitelist, an array of regular expressions converted to a string, example: `[\".*@10086\\\\.cn\"]` |
| BLOCK_LIST | Sender blacklist, an array of regular expressions converted to a string |
| MAIL_TTL | Email cache retention time in seconds, default is one day. After expiration, emails will no longer be previewable. Please make sure to back them up.|
| DB | Bind `KV Namespace Bindings` database to worker with the name `DB`.

> `WHITE_LIST` and `BLOCK_LIST` take effect on both recipients and senders at the same time, with `WHITE_LIST` having a higher priority than `BLOCK_LIST`.


## Usage

When the email forwarding notification is sent to Telegram, only the title, sender, recipient, and three buttons are included.

Using `Preview` allows you to directly preview the plain text mode of the email in the bot. However, there is a limit of 4096 characters. If it exceeds 4096 characters, you can use `TEXT` or `HTML` to view the complete email. Below the preview message, there is a `Read` button that can be clicked to close the preview.

Using `TEXT`, you can see plain text emails. Using `HTML`, you can see rich-text emails which may contain certain scripts or other tracking links. It is recommended to use rich-text mode only when necessary or when confirming that the source is reliable.

For security reasons, when exceeding the mail cache retention time set by `MAIL_TTL`, links opened by clicking on buttons will not work. You can modify environment variables yourself to adjust expiration time.

This Bot does not support attachments. If you need attachment support, you can combine it with my another project [testmail-viewer](https://github.com/TBXark/testmail-viewer) and forward emails to your testmail using `FORWARD_LIST`. This way, you can download your attachments using [testmail-viewer](https://github.com/TBXark/testmail-viewer).

## License

**mail2telegram** is released under the MIT license. [See LICENSE](LICENSE) for details.

