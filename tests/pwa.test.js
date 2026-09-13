const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const test=require('node:test');

const root=path.resolve(__dirname,'..');

test('manifest defines an installable scoped Groovy app',function(){
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
  assert.equal(manifest.short_name,'Groovy');
  assert.equal(manifest.start_url,'/groovy/');
  assert.equal(manifest.scope,'/groovy/');
  assert.equal(manifest.display,'standalone');
  assert.deepEqual(manifest.display_override,['standalone']);
  assert.deepEqual(manifest.icons.map(function(icon){return icon.sizes;}),['192x192','512x512']);
});

test('service worker does not cache old application files',function(){
  const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
  assert.doesNotMatch(worker,/caches\.open\s*\(/);
  assert.doesNotMatch(worker,/addAll\s*\(/);
  assert.match(worker,/fetch\(event\.request\)/);
});

test('mobile header offers app installation instead of a delete toggle',function(){
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const pwa=fs.readFileSync(path.join(root,'js','pwa.js'),'utf8');
  assert.match(html,/id="installAppShortcutButton"/);
  assert.doesNotMatch(html,/id="deleteModeButton"/);
  assert.match(pwa,/installShortcutButton\.addEventListener\('click',startInstall\)/);
});

test('long press enters delete mode before movement starts sorting',function(){
  const app=fs.readFileSync(path.join(root,'js','app.js'),'utf8');
  assert.match(app,/touchLongPressActive=true;[\s\S]*setDeleteMode\(true\)/);
  assert.match(app,/touchLongPressActive&&\(movedX>8\|\|movedY>8\)[\s\S]*startPointerDrag/);
  assert.match(app,/\.delete-cover-button,\.wishlist-remove-button,#removeAlbumModal/);
});
