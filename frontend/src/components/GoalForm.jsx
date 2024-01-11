import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGoal } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'


function GoalForm() {
    const [text, setText] = useState('')
    const Dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        Dispatch(addGoal({ text }))
        setText('')
        toast.success('Goal is created successfully')

    }
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal:</label>
                    <input type="text" name='text' id='text' value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>Add Goal</button>
                </div>
            </form>
        </section >
    )
}

export default GoalForm
