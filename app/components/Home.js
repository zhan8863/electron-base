// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { remote } from 'electron'
import Button from '@hi-ui/hiui/es/button'
import { ipcRenderer } from 'electron'
import { autoUpdater } from 'electron-updater'

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
    console.log('swsj ')
    autoUpdater.checkForUpdatesAndNotify()
  }
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home!!</h2>
        <Button type="primary" onClick={this.checkEvent.bind(this)}>检查更新</Button>
        <h3>{this.state.tips}</h3>
        <p>当前版本号：{remote.app.getVersion()}</p>
        <Link to={routes.COUNTER}>to Counter!!!@!</Link>
      </div>
    );
  }
}
