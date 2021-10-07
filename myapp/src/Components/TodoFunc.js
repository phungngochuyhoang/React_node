import {useEffect, useState} from 'react';

import Modal from './Modal';

const itemSelected = 'item-selected';
const localStoreName = 'Data';

function TodoFunc (props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [listData, setListData] = useState([]);

    const openModal  = (isOpen) => setModalIsOpen(isOpen); 

    const generatesCodeId = () => Math.floor((Math.random() + 1) * 0x100000).toString(16).substring(1);

    const updateStore = (data) => {
        localStorage.setItem(localStoreName, JSON.stringify(data))
    }

    const addItem = () => { 
        const lsDataUpdate = [...listData, {id: generatesCodeId(), name: 'Hoang'}]
        setListData(lsDataUpdate); 
        updateStore(lsDataUpdate);
    }

    const deleteItem = () => {
        listItemSelected(itemSelected).forEach((item) => {
           var itemId = item.getAttribute('data-item-id');
           console.log(itemId);
        })
        setModalIsOpen(false);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStoreName));
        const updateData = [...listData, data];
        !data ? console.log('not data') :  setListData(updateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const listItemSelected = (selector) => {
        return Array.from(document.getElementsByClassName(selector));
    }

    const clickItem = function (obj)  {
        if(obj.target.getAttribute('class').includes(itemSelected)) 
        {
            obj.target.classList.remove(itemSelected);
        }
        else 
        {
            obj.target.classList.add(itemSelected);                  
        }     
    };

    const onPressModal = (isYes) =>  isYes ? deleteItem() : setModalIsOpen(isYes);

    const todolist = JSON.parse(localStorage.getItem(localStoreName))?.map((item) => {
        return (
            <li className='todolist__item' data-item-id={item.id} key={item.id} onClick={clickItem}> {item.name} </li>
        )
    })
    
    return (
    <div>
        <h1>{props.Name}</h1>
        <div className='todofunction'>
            <div className='todofunction__item todofunction__item--add' onClick={addItem}> Add </div>
            <div className='todofunction__item todofunction__item--remove' onClick={() => openModal(true)}> Remove </div>
        </div>
        <ul className='todolist'>
           {todolist}
        </ul>
        {modalIsOpen && <Modal onPress={onPressModal}/>}
    </div>
    )
}

export default TodoFunc;