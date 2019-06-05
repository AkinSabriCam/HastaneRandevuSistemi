/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/Components/AppNavigator'
import HastaMevcutRandevu from './src/Components/Hasta/HastaMevcutRandevu';
import HastaFavoriDoktor from './src/Components/Hasta/HastaFavoriDoktor';
import HastaGecmisRandevu from './src/Components/Hasta/HastaGecmisRandevu';
import AdminDoktorIslemleri  from './src/Components/Admin/AdminDoktorIslemleri';
import AdminYeniDoktor  from './src/Components/Admin/AdminYeniDoktor';
import AdminDoktorGuncelle from './src/Components/Admin/AdminDoktorGuncelle';
import AdminMenu from './src/Components/Admin/AdminMenu';
import LoginMenu from './src/Components/LoginMenu';

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}


