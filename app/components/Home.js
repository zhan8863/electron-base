// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { remote } from 'electron'
import Button from '@hi-ui/hiui/es/button'
import { ipcRenderer } from 'electron'
import { Theme, Logo } from '@hi-ui/classic-theme'
import routeConfig from './routeConfig'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      tips: ''
    }
    this.addUpdateListener()
  }
  addUpdateListener () {
    ipcRenderer.on('updateHttpError', () => {
      this.setState({
        tips: '联网失败'
      })
    })
    ipcRenderer.on('update-error', (e) => {
      this.setState({
        tips: '获取更新失败' + e
      })
    })
    ipcRenderer.on('checking-for-update', () => {
      this.setState({tips: '正在检查更新...'})
    })
    ipcRenderer.on('update-available', () => {
      this.setState({tips: '有可用更新...'})
    })
    ipcRenderer.on('update-not-available', () => {
      this.setState({
        tips: '已经是最新版本'
      })
    })
    ipcRenderer.on('download-progress', (e, progressObj) => {
      this.setState({tips: '正在下载更新' + Math.floor(progressObj.percent) + '%'})
    })
    ipcRenderer.on('update-downloaded', () => {
      this.setState({tips: '更新完毕重启应用'})
    })
  }
  checkEvent () {
    ipcRenderer.send('request_CHECK_UPDATE')
    // autoUpdater.checkForUpdatesAndNotify()
  }
  openMessage (type) {
    let options = {
      title: '信息框标题',
      body: '我是一条信息～～～',
    }
    if (type) {
      let myNotification = new window.Notification(options.title, options)
      myNotification.onclick = () => {
        this.setState({ message: '【你点击了信息框！！】' })
      }
    }  else {
      ipcRenderer.send('request_SEND_MESSATGE')
    }

  }
  render() {
    const logo = (
      <Logo
        url='https://xiaomi.github.io/hiui/#/'
        logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
        text='HIUI Demo'
        title='HIUI Classic Theme Demo'
        alt='Project Logo'
      />
    )

    return (
      //  下面的代码是简单示例
      <div className={styles.container} data-tid="container">
        <h2>Home!!</h2>
        <Button type="primary" onClick={this.checkEvent.bind(this)}>检查更新(在 develop 模式下无效，需打包后)</Button>
        <h3>{this.state.tips}</h3>
        <p>当前版本号：{remote.app.getVersion()}</p>
        <Link to={routes.COUNTER}>to Counter!!!@!</Link>
        <Button type="primary"  onClick={this.openMessage.bind(this, true)}>打开一个通知(渲染进程)</Button>
        <Button type="primary"  onClick={this.openMessage.bind(this)}>打开一个通知(主进程)</Button>
      </div>
      // 下面的 Theme 是 HIUI 主题的写法，可将上面的代码注释掉，换成下面的，查看 HIUI 主题的写法
      // <Theme
      //   routes={routeConfig}
      //   logo={logo}
      //   type='genuine'
      // />
    );
  }
}
