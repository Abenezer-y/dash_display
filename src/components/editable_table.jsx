import { Table, Typography } from 'antd';
import { Layout, Switch } from 'antd';
import React, {useState, useEffect} from 'react';


const { Header, Content } = Layout;
const { Title } = Typography;




const Edit_Table = () => {
  const [ride, setTable] = useState([])
  const fetchStatus = async () => {
    await fetch("http://localhost:8000/rides",).then(
      response => {
        if (response.ok){return response.json()} throw response }).then( data => { setTable(data) }
      )}
  useEffect(() => { fetchStatus() }, [])


  const onChange =  async (key, check) => {

     await fetch("http://localhost:8000/editStatus", {
            method: "POST",
            mode:'cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({'_id': key, 'status': check})})
      fetchStatus()
    }

    const columns = [
      { title: 'Ride Name', dataIndex: 'name', key: 'name'},
      { title: 'Action',  width: '20%',
        render: (_, record) => {
          if (record.status[0] === 'Open') 
              {return ( <Switch id={record.status[1]}  checkedChildren="Open" unCheckedChildren="Closed" onChange={(checked)=>{onChange(record.key, checked)}} defaultChecked /> );}
          else if (record.status[0] === 'Closed') 
              {return ( <Switch id={record.status[1]}  checkedChildren="Open" unCheckedChildren="Closed"  onChange={(checked)=>{onChange(record.key, checked)}} /> );}
            }}];
    return(
    <Layout>
      <Header  style={{height:100, textAlign: 'center', padding:6}}>
        <Typography>
          <Title style={{color: "white", fontSize:28}}>
              Wonderland Rides
          </Title>
      </Typography>
      </Header>
      <Content style={{margin:5, padding:3, alignContent:'center'}}>    
        <Table  style={{margin:5, padding:3, alignContent:'center'}} columns={columns} dataSource={ride} />
      </Content>
      </Layout>
    )

}

export default Edit_Table;