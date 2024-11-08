import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Chao from './ManChao'
import DN from './ManDangNhap'
import DK from './ManDangKi'
import TrangChu from './ManTrangChu'
import BietOn from './ManBietOn'
import BMI from './ManBMI'
import Thien from './ManThien'
import TTCN from './ManTTCN'
import SuaTTCN from './ManSuaTTCN'
import TuVan from './ManTuVan'
import NgheNhac from './ManNgheNhac'
import CaiDat from './ManCaiDat'
const StackDemo=createNativeStackNavigator();
const index = () => {
  return (
    <NavigationContainer>
        <StackDemo.Navigator>
            <StackDemo.Screen name='ChaoScreen' component={Chao} options={{headerShown:false}} />
            <StackDemo.Screen name='DangNhapScreen' component={DN} options={{headerShown:false}} />
            <StackDemo.Screen name='DangKiScreen' component={DK} options={{headerShown:false}} />
            <StackDemo.Screen name='TrangChuScreen' component={TrangChu} options={{headerShown:false}} />
            <StackDemo.Screen name='BietOnScreen' component={BietOn} options={{headerShown:false}} />
            <StackDemo.Screen name='BMIScreen' component={BMI} options={{headerShown:false}} />
            <StackDemo.Screen name='ThienScreen' component={Thien} options={{headerShown:false}} />
            <StackDemo.Screen name='TTCNScreen' component={TTCN} options={{headerShown:false}} />
            <StackDemo.Screen name='SuaTTCNScreen' component={SuaTTCN} options={{headerShown:false}} />
            <StackDemo.Screen name='TuVanScreen' component={TuVan} options={{headerShown:false}} />
            <StackDemo.Screen name='NgheNhacScreen' component={NgheNhac} options={{headerShown:false}} />
            <StackDemo.Screen name='CaiDatScreen' component={CaiDat} options={{headerShown:false}} />
        </StackDemo.Navigator>
    </NavigationContainer>
  )
}

export default index

const styles = StyleSheet.create({})