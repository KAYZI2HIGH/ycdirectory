import Form from "next/form";
import FormReseButton from "./FormReseButton";
import { Search } from "lucide-react";

const SearchForm = ({ query }) => {
  return (
    <Form className="w-full max-w-[700px] mx-auto search_form">
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="SEARCH STARTUP"
        className="input_fields"
      />
      <div className="flex gap-2 mr-3">
        {query && <FormReseButton />}

        <button
          type="submit"
          className="input_btn"
        >
          <Search size={18}/>
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
