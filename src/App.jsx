import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  let [formData, setFormData] = useState([])
 
  useEffect(renderUI, [])
  
  function renderUI(){
    const data =  JSON.parse(localStorage.getItem('array')) || []
    console.log(data)
    setFormData(data)
  
  }


  let [subject, setSubject] = useState("");
  let [hour, setHour] = useState(0);



  function subjectChangeHandler(event) {
    console.log(event.target.value)
    setSubject(event.target.value)
  }
  function hourChangeHandler(event) {
    console.log(event.target.value)
    setHour(event.target.value)
  }

  //  async function increment(ind) {
  //   const formDataCopy = [...formData]
  //   formDataCopy[ind] = { ...formDataCopy[ind], hour: formDataCopy[ind].hour + 1 }
  //   setFormData(formDataCopy);
  //   console.log(formData)
  //   setLocalStorage(formData)
  // }
  
  async function increment(ind) {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[ind] = { ...updatedFormData[ind], hour: updatedFormData[ind].hour + 1 };
      setLocalStorage(updatedFormData);
      return updatedFormData;
    });
  }

  function setLocalStorage(formData){
    localStorage.setItem('array', JSON.stringify(formData));
    
  }
  // function decrement(ind) {
  //   const formDataCopy = [...formData]
  //   formDataCopy[ind] = { ...formDataCopy[ind], hour: formDataCopy[ind].hour - 1 > 0 ? formDataCopy[ind].hour - 1 : 0 }
  //   setFormData(formDataCopy);
  //   localStorage.setItem('array', JSON.stringify(formData));
    
  // }

  function decrement(ind) {
    setFormData(prevFormData => {
      const updatedFormData = [...prevFormData];
      updatedFormData[ind] = { ...updatedFormData[ind], hour: Math.max(updatedFormData[ind].hour - 1, 0) };
      localStorage.setItem('array', JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  }
  
   function formSubmit(event) {
    event.preventDefault()
    let newObject = {
      subject: subject,
      hour: +hour
    }
    const formDataCopy = [...formData]
    formDataCopy.push(newObject)
    // console.log(formDataCopy)
    setFormData(formDataCopy);
    event.target.reset()


    
    localStorage.setItem('array', JSON.stringify(formData));
    console.log(JSON.parse(localStorage.getItem('array')));
  }



  return (
    <>
      <h1>Geekster Education Planner</h1>

      <form action="" onSubmit={formSubmit} className='form'>
        <input type="text" placeholder="Subject" name='subject'
          onChange={subjectChangeHandler} required />
        <input type="number" name="hour" id="" placeholder="hour" min="0" onChange={hourChangeHandler}
          required />
        <button type="submit">Add</button>
      </form>

      { formData.map((data, index) => {
        return (
          <div key={index} className="subjects_container">
            <div>
              <span>{data.subject} - </span>
              <span>{data.hour} hours</span>
            </div>
            <div>
              <button className="increase" onClick={() => increment(index)}>+</button>
              <button className="decrease" onClick={() => decrement(index)}>-</button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default App;
