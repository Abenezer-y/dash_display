import { Table, Typography, Tag } from 'antd';
import { Layout } from 'antd';
import React, {useState, useEffect} from 'react';


const { Header, Content } = Layout;
const { Title } = Typography;
// tag.length > 5 ? 'geekblue' :

const columns = [
  { title: 'Ride Name', dataIndex: 'name', key: 'name',},
  { title: 'Status', key: 'status', dataIndex: 'status',  width: '20%',
    render: status => {
      let color = 'green';
      if (status[0] === 'Closed') 
          { color = 'volcano'; }
          return ( <Tag color={color} key={status[1]}> {status[0].toUpperCase()} </Tag> );
        }}];


const DisplayTable = () => {
  const [ride, setTable] = useState([])

  const fetchStatus = () => {
     fetch("https://dashapi.herokuapp.com/rides", ).then(
      response => {
        if (response.ok){return response.json()} throw response }).then( data => { setTable(data) }
      )}

  useEffect(() => { fetchStatus() }, [])

    return(
      <Layout>
      <Header  style={{height:150, textAlign: 'center', padding:6}}>
      <Typography>
        <Title style={{color: "white", fontSize:28}}>
           Lusail Winter Wonderland - Rides Status
        </Title>
     </Typography>
      </Header>
      <Content style={{margin:5, padding:3, alignContent:'center'}}>   

        <Table style={{margin:5, padding:3, alignContent:'center'}} columns={columns} dataSource={ride} pagination={false}/>

      </Content>
    </Layout>
    
    )}

export default DisplayTable;