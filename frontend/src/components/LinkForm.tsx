import React, { useState } from "react";
import axiosAPI from "../axiosAPI";
import 'bootstrap/dist/css/bootstrap.min.css';

const LinkForm = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortURL, setShortURL] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axiosAPI.post("/links", { longUrl });
            setShortURL(response.data.shortUrl);
        } catch (err) {
           console.error(err);
        }
    };

    return (
        <div className="container p-3">
            <h1 className="text-center">Shorten your link!</h1>
            <form onSubmit={handleSubmit} className="text-center mt-4">
                <input
                    type="url"
                    className="form-control"
                    placeholder="Enter your URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                />
                <button className="btn btn-primary mt-4" type="submit">
                    Shorten
                </button>
            </form>

            {shortURL && (
                <p className="mt-4">
                    Your link now looks like this:
                    <a href={`http://localhost:8000/${shortURL}`} target="_blank">
                        {`http://localhost:8000/${shortURL}`}
                    </a>
                </p>
            )}
        </div>
    );
};

export default LinkForm;
