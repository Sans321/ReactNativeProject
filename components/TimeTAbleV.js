import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { gStyle } from '../styles/style';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
export default function TimeTableV(){
    const [tableHead, setTableHead]=useState(['Header1','Header2','Header3','Header4']);
    const [tableData, setTableData]=useState([
        ['Row11', 'Row12', 'Row13', 'Row14'],
        ['Row21', 'Row22', 'Row23', 'Row24'],
        ['Row31', 'Row32', 'Row33', 'Row34'],
        ['Row41', 'Row42', 'Row43', 'Row44'],
    ]);
    
    return(
      <View>
        <Table>
            <Row data={tableHead}/>
            <Rows data={tableData}/>
        </Table>
        <Table>
            <Row data={tableHead}/>
            <Rows data={tableData}/>
        </Table>
        <Table>
            <Row data={tableHead}/>
            <Rows data={tableData}/>
        </Table>
        <Table>
            <Row data={tableHead}/>
            <Rows data={tableData}/>
        </Table>
      </View>
   );
}