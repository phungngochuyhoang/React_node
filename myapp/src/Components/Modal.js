

function Modal ({onPress}) {
    
    return (
        <div className={`modal`}>
            <p> Are you sure? </p>
            <div className="btn">
                <button className='btn__item btn__item--yes' onClick={() => onPress(true)}> Yes </button>
                <button className='btn__item btn__item--no' onClick={() => onPress(false)}> No </button>
            </div>           
        </div>
    );
}

export default Modal;