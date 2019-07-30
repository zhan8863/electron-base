// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import { remote } from 'electron'
export default class Home extends Component {

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home!!!</h2>
        <p>当前版本号：{remote.app.getVersion()}</p>
        <Link to={routes.COUNTER}>to Counter!!!@!</Link>
      </div>
    );
  }
}
