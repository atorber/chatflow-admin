import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn } from 'child_process';
let apiProcess = null;
let win = null;
function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // 允许在渲染器进程中使用Node.js
      contextIsolation: false, // 禁用上下文隔离
    },
  });

  // 并且为你的应用加载index.html
  win.loadFile('index.html');
  // 打开开发者工具
  win.webContents.openDevTools();
  win.setMenuBarVisibility(false);
}

function startChatFlowAdmin() {
  // 假设API项目位于Electron项目的'backend'目录中
  // 获取当前目录
  const cwd = process.cwd();
  console.log(cwd);

  apiProcess = spawn('npm.cmd', ['run', 'dev'], { cwd });

  apiProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    win.webContents.send(
      'chatflow-admin-started',
      '启动成功，API地址：http://127.0.0.1:9503',
    );
  });

  apiProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    win.webContents.send('chatflow-admin-started', data.toString());
  });
}

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    // 执行 $OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 设置编码格式
    console.log('Electron app is ready.');
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('quit', () => {
  // 当Electron应用退出时，也关闭API服务
  if (apiProcess !== null) {
    apiProcess.kill();
  }
});

// 创建Electron窗口等代码...

// 监听从渲染进程发送的启动API服务的消息
ipcMain.on('start-chatflow-admin', () => {
  console.log('Starting chatflow-admin process...');
  if (apiProcess === null) {
    startChatFlowAdmin();
  } else {
    console.log('chatflow-admin process is already running.');
  }
});

// 监听从渲染进程发送的停止API服务的消息
ipcMain.on('stop-chatflow-admin', () => {
  console.log('Stopping chatflow-admin process...');
  if (apiProcess !== null) {
    apiProcess.kill();
    apiProcess = null;
    console.log('chatflow-admin process stopped.');
    win.webContents.send('chatflow-admin-stopped', 'API服务已停止...');
  } else {
    console.log('chatflow-admin process is not running.');
    win.webContents.send('chatflow-admin-stopped', 'API服务未启动...');
  }
});
