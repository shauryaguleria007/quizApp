import { useGlobalContext } from './context'

const Modal = () => {
  const { modal, closeModal, correct, questions } = useGlobalContext()
  return (
    <div className={`modal-container ${modal ? 'isOpen' : ''}`}>
      <div className='modal-content'>
        <h2>congracts!</h2>
        <p>
          you answered {((correct / questions.length) * 100).toFixed(0)}% of the
          questions correctly
        </p>
        <button className='close-btn' onClick={closeModal}>
          Play again
        </button>
      </div>
    </div>
  )
}

export default Modal
