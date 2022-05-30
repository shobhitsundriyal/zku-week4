import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <div className='flex justify-center h-[100vh] items-center'>

    <form  onSubmit={onSubmit} >
      <input className="inputFeild" {...register("firstName", { required: true, maxLength: 20 })} placeholder={'First Name'}/>
      <input className="inputFeild" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} placeholder={'Last Name'}/>
      <input className="inputFeild" type="number" {...register("age", { min: 18, max: 99 })} placeholder={'Age'}/>
      <input className="inputFeild" {...register("address")} placeholder={'Address'}/>
      <input className="inputFeild hover:bg-white hover:text-black transition-colors duration-150" type="submit" />
    </form>
    </div>
  )
}

export default Form