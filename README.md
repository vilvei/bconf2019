## Rehash of Blender conference 2019 page.

This is a unofficial version of original Blender conference 2019 page: <a href="https://conference.blender.org/2019/schedule/">https://conference.blender.org/2019/schedule/</a>


Demo at https://bconf2019.netlify.com/

The original version is good. But I needed a bit better support for mobile devices and automatic time zone converting.

* Svelte + Sapper =~ PWA
** <a href="https://svelte.dev/">Svelte.dev</a>
** <a href="https://sapper.svelte.dev/">https://sapper.svelte.dev/</a>
** <a href="https://developers.google.com/web/progressive-web-apps">PWA enables applike experience, such as offline usage.</a>
* <a href="https://date-fns.org/">date-fns</a> enables easily all times to be in local device time.
* Remembers favourite presentations using localStore.
* Main usage is sapper-export: the whole page is written down as files.

### Development

You need node. Easiest way to get it is using <a href="https://github.com/nvm-sh/nvm">nvm</a>

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install v12.9.0
```

```bash
git clone https://github.com/vilvei/bconf2019.git
# fetch testdata
cd bconf2019/crawl
npm i
node fetch
cd ..
#start serving data
npx http-server data --cors

# start dev-server in other terminal
cd bconf2019/bconfapp
npm i
npm run dev
# set browser location to http://localhost:3000
```

### Export

Exactly same steps as in Development, but the last command is.

```bash
npm run export
#And the export app is in folder: bconf2019/bconfapp/__sapper__/export
#You can test it again with http-server
npx http-server __sapper__/export
```

### Creation

The app was created with svelte+sapper+rollup -template. Edited with Atom.

```bash
npx degit "sveltejs/sapper-template#rollup" bconfapp
cd bconfapp
npm i

using atom 1.40 editor with ide-svelte package:
https://atom.io
https://atom.io/packages/ide-svelte
```
