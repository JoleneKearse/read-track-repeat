const AddForm = () => {
  return (
    <form className="w-5/6 max-w-sm mx-auto">
      <label
        htmlFor="searchMethod"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
      >
        Choose search method
      </label>
      <select
        name=""
        id="searchMethod"
        className="bg-orange-100 border border-orange-200 text-purple-700 text-sm tracking-wide rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 mb-8"
      >
        <option selected>Choose search method</option>
        <option value="isbn">ISBN</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      <label
        htmlFor="searchInput"
        className="block mb-2 font-bold tracking-wide text-orange-200 text-med dark:text-white"
      >
        Book detail
      </label>
      <input 
        type="text" 
        name="" 
        id="searchInput"
        className="block mb-8 p-2.5 bg-orange-100 border border-orange-200 text-gray-900 text-sm tracking-wide rounded-lg w-full placeholder:text-purple-500 focus:ring-purple-500 focus:border-purple-500" 
        placeholder="ISBN / Title / Author"
      />
    </form>
  );
};

export default AddForm;
