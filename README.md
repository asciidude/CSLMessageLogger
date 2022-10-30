<sub>Sorry to developers that may find this "too informative", trying my best to make this available to everyone. :)</sub>

# ❗❗ THIS IS AGAINST TOS! ❗❗ (same with BD)
Discord doesn't take self bots lightly. I recommend looking into other options before moving forward with the use of this. Though, this bot will **NOT** and will **NEVER** interact with your account other than logging in and will simply log events, so it is **undetectable** in a way, but still advised *against* use.

https://discord.com/tos

## CSLMessageLogger - What is it?
CSLMessageLogger was created as an alternative to MessageLoggerV2 (Discord plugin). This bot is, once again, against TOS and I recommend against using it (as with BetterDiscord).

## How do I use CSLMessageLogger?
### YOU NEED NODE FOR THIS TO WORK!
*After installing node, make sure to run `npm install` in the console to install all dependencies*\
https://nodejs.dev/en/

1. **Firstly**, you need to download this GitHub repository. Handle that how you will, but I recommend using `git clone <repositoryURL>` - doesn't matter how you do it though.

2. **Afterwards**, you need to rename `.env.TEMPLATE` to `.env`.

**.ENV: DO NOT SHARE THIS FILE WITH ANYONE, IT CONTAINS EXTREMELY SENSITIVE INFORMATION.**

3. **Now**, get your token

Get your Discord token using this script in the Discord console (key combination: `CTRL+SHIFT+I`):

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);

console.log('%cGrabber worked!', 'font-size: 50px');
console.log(`%cThe token has been copied to your clipboard!`, 'font-size: 16px');
console.log(`%cDo not share this token with anyone.`, 'font-size: 14px');
```

This script has been created by https://github.com/hxr404/Discord-Console-hacks

4. **In `.env`**, add all the information required.

5. Edit the config (`config.json`) to your liking

6. **Run the script with `npm run start`**
