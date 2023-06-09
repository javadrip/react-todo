import { Fragment, useEffect, useState } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const style = {
  quoteContainer: `flex justify-center items-center`,
  quoteWrapper: `w-[500px] p-4`,
  quote: `max-w-[420px] text-left italic text-sm`,
  author: `text-right font-semibold text-xs pt-2`,
};

function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const category = "funny";
      const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
      const apiKey = import.meta.env.VITE_QUOTES_API_KEY;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const result = await response.json();
        setQuote(result[0].quote);
        setAuthor(result[0].author);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.quoteContainer}>
      {quote && author && (
        <Fragment>
          <div className={style.quoteWrapper}>
            <div className="flex flex-col">
              <div className="-mb-1">
                <RiDoubleQuotesL size={15} />
              </div>
              <div className="flex justify-center">
                <p className={style.quote}>{quote}</p>
              </div>
              <div className="-mt-1 flex justify-end">
                <RiDoubleQuotesR size={15} />
              </div>
            </div>
            <p className={style.author}>— {author}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Quote;
