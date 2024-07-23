import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo,toggleTodoStatus } from "../redux/reducers/todoReducer";
// import { addTodo, deleteTodo, updateTodo,toggleTodoStatus } from "../redux/reducers/todoReducer";
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { addExpense } from "../redux/reducers/expenseReducer";
import TextInputCustom from "../components/inputCustom";
const TodoScreen  =()=>{
    //1. Khai báo các state để thực hiện thêm
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [total,setTotal] = useState('');
    const [type,setType]= useState(true);
    const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
    const [editdescription,seteditDescription] = useState('');
    const [editdate,seteditDate] = useState('');
    const [edittotal,seteditTotal] = useState('');
    const [edittype,setedtType]= useState(true);
    const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa
    const [search,setsearch] = useState('');

    const [totalChi,setTotalChi] = useState(0);
    const [totalThu,setTotalThu] = useState(0);
    const handleEdit = (id, title,description,total,date,type) =>{
        // hàm này để  ẩn hiện form sửa
        setEditTitle(title);
        seteditDescription(description);
        seteditTotal(total);
        seteditDate(date);
        setedtType(type);
        setIdEdit(id);
    }
    // &&editdescription.trim() !== '' &&edittotal.trim() !== '' &&editdate.trim() !== ''
    // hàm lưu kết quả sửa
    const handleUpdate =()=>{
        if(editTitle.trim() !== '' ||editdescription.trim() || edittotal.trim() !== '' ||editdate.trim() !== '' ){
            // có nội dung sửa
            dispatch( updateTodo ({id: idEdit, title: editTitle,description:editdescription,total:edittotal,date:editdate,type:edittype }) );
            setEditTitle('');
            seteditDescription('');
            seteditTotal('');
            setedtType('');
            seteditDate('');
            setIdEdit(null);
        }
    }
   
    //lấy  danh sách dữ liệu
    const  listTodo =  useSelector(state=>state.listTodo.listTodo);

    const TotalMoney =()=>{
        let totalThu =0;
        let totalChi=0;
        listTodo.forEach(expense=>{
            if(expense.type==false){
                totalThu+= parseFloat(expense.total);
            }else if(expense.type==true){
                totalChi+=parseFloat(expense.total);
            }
        })
        setTotalChi(totalThu);
        setTotalThu(totalChi);
    }

    useEffect(()=>{
        TotalMoney();
    },[listTodo]);

    const listSearch = listTodo.filter(expense=>
        expense.title.toLowerCase().includes(search.toLowerCase())
    )



  
    // const listExpense = useSelector(state=>state.listExpense.listExpense);
    // lấy đối tượng để điều khiển các action
    // const dispatch = useDispatch();// của redux
    const dispatch = useDispatch();
    // hàm xử lý việc thêm
    // const handleAddTodo = ()=>{
    //     let duLieuThem = { id: Math.random().toString(), title: title };
    //     dispatch( addTodo ( duLieuThem )  );
    // }
    const addListExpense = ()=>{
        let dataAdd = {id:Math.random().toString(),title:title,description:description,date:date,total:total,type:type}
        dispatch( addTodo ( dataAdd )  );
    }

    const DeleteListExpense = (id)=>{
        dispatch(deleteTodo (id));
    }
    const handleToggleTodo = id => {
        dispatch(toggleTodoStatus(id));
    };

    const statusthu= ()=>{
        setType(false);
    }
    const statustieu =()=>{
        setType(true);
    }

    // <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
    //         <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
    //     </TouchableOpacity>
     
    return (

        


       
        <View style={{flex:1,marginHorizontal:10}}>
            <ScrollView>

                
           <Text  style={{fontSize:30,color:'black',fontWeight:'bold',alignSelf:'center'}}>Chi tiêu</Text>
        <TextInputCustom placeholder="Nhập tiêu đề" onChangeText={setTitle} />
        <TextInputCustom placeholder="Nhập mô tả" onChangeText={setDescription} />
        <TextInputCustom placeholder="Nhập ngày thu chi" onChangeText={setDate} />
        <TextInputCustom placeholder="Nhập số tiền" onChangeText={setTotal} inputMode="numeric"/>
        
        <View style={{flexDirection:'row'}}>
               <Text  style={{fontSize:20,color:'black'}} >
            Loại chi tiêu :
        </Text>
        <TouchableOpacity onPress={statusthu}>
 <Text style={{fontSize:20,color:'black'}}>
            Chi -   
        </Text>
            
        </TouchableOpacity>

       
        <TouchableOpacity onPress={statustieu}>
 <Text  style={{fontSize:20,color:'black'}}>
            Thu 
        </Text>
            
        </TouchableOpacity>
        </View> 
    
     
      
            <TouchableOpacity style={{width: 100,alignSelf:'center',height:45,padding:10,backgroundColor:'aqua',alignItems:'center',marginVertical:10}} onPress={addListExpense}>
               <Text style={{fontWeight:'bold',color:'black'}}>Thêm</Text>
            </TouchableOpacity>
        
   
       

        <Text style={{fontSize:20,color:'black'}}>Tổng số tiền : Thu : {totalThu} - Chi : {totalChi}</Text>
        <TextInputCustom placeholder="Tìm kiếm theo tiêu đề" onChangeText={setsearch} value={search} />
        {/* Hiện danh sách: */}

        
        
        {
        listSearch.map(row =>(
      <View key={row.id}
        style={{padding: 10, margin: 10, backgroundColor: 'cyan'}}>
            
             
            {
                      (idEdit === row.id)?
                          (<>
                          
                              <TextInputCustom
                                      value={editTitle}
                                      onChangeText={setEditTitle}
                                      onBlur={handleUpdate

                                      }
                                      
                                  />
                                  <TextInputCustom
                                  value={editdescription}
                                  onChangeText={seteditDescription}
                                  onBlur={handleUpdate}
                               
                                  />
                                  <TextInputCustom
                                  value={editdate}
                                  onChangeText={seteditDate}
                                  onBlur={handleUpdate}
                                 
                                  />
                                  <TextInputCustom
                                  value={edittotal}
                                  onChangeText={seteditTotal}
                                  onBlur={handleUpdate}
                                  
                                  />
                                  
                                  {/* <Text>
            Loại chi tiêu :
        </Text>
        <Text>
            Thu -
        </Text>
        <Text>
            Chi
        </Text> */}

                                  
<TouchableOpacity style={{width: 100,alignSelf:'center',height:45,padding:10,backgroundColor:'aqua',alignItems:'center',marginVertical:10}} onPress={handleUpdate}>
               <Text style={{fontWeight:'bold',color:'black'}}>Thêm</Text>
            </TouchableOpacity>
                                 
                          </>
                          )
                      :
                          (
                              <>
                              
                                <Text>{row.title} </Text>
        <Text>{row.description}</Text>
        <Text>{row.date}</Text> 
        <Text>{row.total}</Text>
       
        <Text>{row.type}</Text>
        <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
            <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleToggleTodo(row.id)}>
              {row.type ?
                 <Text style={{ color: 'gray' }}>Thu</Text> :
                    <Text style={{ color: 'green' }}>Chi</Text>
               }
</TouchableOpacity>
                            <TouchableOpacity style={{position:'absolute',right:10,top:50}} onPress={() => handleEdit(row.id, row.title,row.description,row.total,row.date)}>
                                     <Image source={require('../img/edit.png')} style={{width:30,height:30}}/>
                                  </TouchableOpacity>

                              </>

                          )
                  }

        {/* <Text>{row.title} === {row.id}</Text>
        <Text>{row.description}</Text>
        <Text>{row.date}</Text>
        <Text>{row.type}</Text>
        <Text>{row.date}</Text>
        <TouchableOpacity style={{position:'absolute',right:10,top:10}} onPress={()=>DeleteListExpense(row.id)}>
            <Image source={require('../img/recyclebin.png')} style={{width:30,height:30}}/>
        </TouchableOpacity> */}



      </View> 
        ))
        }
     </ScrollView></View> 
    );
}
export default TodoScreen;