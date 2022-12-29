import { useGlobalContext } from './context'
import Loading from './loading'
import SetupForm from './setupForm'
import Modal from './modal'

function App() {
  const {
    waiting,
    loading,
    correct,
    index,
    questions,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) return <SetupForm />
  if (loading) return <Loading />
  const { question, correct_answer, incorrect_answers } = questions[index]
  const options = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    options.push(correct_answer)
  } else {
    options.push(options[tempIndex])
    options[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answer : {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className='btn-container'>
            {options.map((answer, index) => {
              return (
                <button
                  className='answer-btn'
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(answer === correct_answer)}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next-button{' '}
        </button>
      </section>
    </main>
  )
}

export default App
