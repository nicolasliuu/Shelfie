import { Configuration, OpenAIApi } from "openai";
import React, { useState, useMemo, useEffect } from 'react';


const configuration = new Configuration({
    apiKey: "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",
  });



const openai = new OpenAIApi(configuration);

const Gpt = React.memo(({img_prompt}) => {

    // const handleSubmit = (event: React.FormEvent) => {
    //   event.preventDefault();
    // };
  
    const [prompt, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       if (img_prompt !== "") {
      setPrompt(img_prompt);
       }
    }, [img_prompt]);
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      setLoading(true);
      try {
        const result = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "List at most five recipes that can be made with " + prompt + ". The recipe names should NOT include the names of the aforementioned ingredients provided.",
          temperature: 0.5,
          max_tokens: 4000,
        });
        // console.log("response", result.data.choices[0].text);
        if (result.data.choices[0] && result.data.choices[0].text) {
          setApiResponse(result.data.choices[0].text);
        }
      } catch (e) {
        setApiResponse("Something is going wrong, Please try again.");
      }
      setLoading(false);
    };
  
    return (
      <>
        <div className="flex w-full justify-center bg-[#F1F2F6]">
          <div className="h-4/5 w-4/5 max-w-4xl rounded-lg bg-[#F1F2F6] p-3">
            <div
              style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", fontSize: "1.3rem", marginTop: "15px"}}>
                <textarea
                  autoFocus
                  value={prompt}
                  placeholder="Or input ingredients..."
                  onChange={(e) => setPrompt(e.target.value)}
                  style={{
                    border: "0.5px solid",
                  }}
                ></textarea>
                <button
                  disabled={loading || prompt.length === 0}
                  type="submit"
                  style={{
                    content: "center",
                    alignItems: "center",
                    textAlign: "center",
                    border: "1px solid",
                    marginTop: "5px",
                    fontSize: "1.2rem",
                    borderRadius: "20px",
                  }}
                >
                  {loading ? "Finding good food..." : "Generate recipes!"}
                </button>
              </form>
              {apiResponse && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                  style={{
                    padding: "20px",
                  }}>
                    <strong>Here are some recipes you may find useful with your current ingredients:</strong>
                    {apiResponse.split(/\r?\n/).map((line, i) => (
                  <p key={i}>{line}</p>))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  });
  
  export default Gpt;
  