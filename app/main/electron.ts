/**
 * @desc electron 主入口
 */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';

function isDev() {
  // 👉 配置中通过 webpack.DefinePlugin 定义构建变量
  return process.env.NODE_ENV === 'development';
}

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });

  if (isDev()) {
    // 👇 在开发环境下，我们加载的是运行在 7001 端口的 React
    mainWindow.loadURL(`http://127.0.0.1:7001`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const ROOT_PATH = path.join(app.getAppPath(), '../');

ipcMain.on('get-root-path', (event, arg) => {
  event.reply('reply-root-path', ROOT_PATH);
});

ipcMain.on('change-window-size', (event, arg) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  mainWindow?.setSize(arg.width, arg.height);
  mainWindow?.center();
});
