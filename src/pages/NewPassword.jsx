

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 text-center font-black text-5xl capitalize">
        Don&apos;t lose your 
        <span className="text-5xl block text-slate-800">
          Access
        </span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Choose your new Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
      
        <input
          type="submit"
          value="Save New Password"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
}

export default NewPassword
