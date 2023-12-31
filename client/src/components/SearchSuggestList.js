import { Link } from "react-router-dom";

export default function SearchSuggestList({ suggestion }) {
  return (
    <div className="bg-slate-100 drop-shadow-lg rounded-md absolute z-10">
      {suggestion.map((suggest) => {
        return (
          <Link
            className="!text-black no-underline"
            to={`/product/${suggest.slug}`}
          >
            <div className="flex items-center p-4 w-[300px] max-w-[300px] lg:w-[500px] lg:max-w-[500px] hover:bg-slate-200 transition-colors">
              <img
                src={`/images/${suggest.image}`}
                alt="img"
                className="me-3 w-10 object-scale-down"
              />
              <p>{suggest.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
