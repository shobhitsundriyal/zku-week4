import { useForm } from 'react-hook-form'

function Form() {
	const { register, handleSubmit, formState } = useForm()
	const onSubmit = handleSubmit((data) => {
		console.log(data)
	})

	return (
		<div className='flex justify-center h-[100vh] items-center'>
			<form
				onSubmit={onSubmit}
				className='w-full  flex flex-col items-center space-y-12'
			>
				<div className='feild-container relative p-2 w-1/5'>
					<input
						type='text'
						autoComplete='off'
						id='fname'
						required
						className=' bg-transparent outline-none px-1 peer relative text-slate-800 z-10 font-mono font-semibold'
						{...register('firstName', {
							required: true,
							maxLength: 20,
							pattern: /^[a-zA-Z]*$/, //only alphabets
						})}
					></input>
					<label
						// for='name'
						className='absolute left-4 top-2 text-lime-400 peer-focus:text-sm peer-focus:-top-6 peer-valid:text-sm peer-valid:-top-6 transition-all duration-150'
					>
						First Name
					</label>
					<div
						className={`line h-[2px] w-full bg-lime-400 transition-all -z-0 duration-200 ease-out absolute -bottom-0 peer-focus:h-full rounded-sm peer-valid:h-full ${
							formState.errors.firstName
								? 'bg-red-400'
								: 'bg-lime-400'
						}`}
					></div>
				</div>

				<div className='feild-container relative p-2 w-1/5'>
					<input
						autoComplete='off'
						type='text'
						id='lname'
						required
						className=' bg-transparent outline-none px-1 peer relative text-slate-800 z-10 font-mono font-semibold w-full'
						{...register('lastName', {
							required: true,
							maxLength: 20,
							pattern: /^[a-zA-Z]*$/,
						})}
					></input>
					<label
						// for='lname'
						className='absolute left-4 top-2 text-lime-400 peer-focus:text-sm peer-focus:-top-6 peer-valid:text-sm peer-valid:-top-6 transition-all duration-150'
					>
						Last Name
					</label>
					<div
						className={`line h-[2px] w-full bg-lime-400 transition-all -z-0 duration-200 ease-out absolute -bottom-0 peer-focus:h-full rounded-sm peer-valid:h-full ${
							formState.errors.lastName
								? 'bg-red-400'
								: 'bg-lime-400'
						}`}
					></div>
				</div>

				<div className='feild-container relative p-2 w-1/5'>
					<input
						autoComplete='off'
						type='number'
						id='age'
						required
						className=' bg-transparent outline-none px-1 peer relative text-slate-800 z-10 font-mono font-semibold w-full
            '
						{...register('age', { min: 18, max: 99 })}
					></input>
					<label
						// for='ease-out'
						className='absolute left-4 top-2 text-lime-400 peer-focus:text-sm peer-focus:-top-6 peer-valid:text-sm peer-valid:-top-6 transition-all duration-150'
					>
						Age
					</label>
					<div
						className={`line h-[2px] w-full bg-lime-400 transition-all -z-0 duration-200 ease-out absolute -bottom-0 peer-focus:h-full rounded-sm peer-valid:h-full ${
							formState.errors.age ? 'bg-red-400' : 'bg-lime-400'
						}`}
					></div>
				</div>

				<div className='feild-container relative p-2 w-1/5'>
					<input
						autoComplete='off'
						type='text'
						id='address'
						required
						className=' bg-transparent outline-none px-1 peer relative text-slate-800 z-10 font-mono font-semibold w-full
            '
						{...register('ethAddress', {
							required: true,
							pattern: /^(0x)?[0-9a-fA-Z]{40}$/,
						})}
					></input>
					<label
						// for='ease-out'
						className='absolute left-4 top-2 text-lime-400 peer-focus:text-sm peer-focus:-top-6 peer-valid:text-sm peer-valid:-top-6 transition-all duration-150'
					>
						Eth Address
					</label>
					<div
						className={`line h-[2px] w-full bg-lime-400 transition-all -z-0 duration-200 ease-out absolute -bottom-0 peer-focus:h-full rounded-sm peer-valid:h-full ${
							formState.errors.ethAddress
								? 'bg-red-400'
								: 'bg-lime-400'
						}`}
					></div>
				</div>

				<input
					className='btn text-lime-400 hover:bg-lime-400 hover:text-black transition-all duration-150 active:scale-95 active:translate-y-1'
					type='submit'
				/>
			</form>
		</div>
	)
}

export default Form
