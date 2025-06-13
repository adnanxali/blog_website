import axios from "axios";
import { useState } from "react";
import { BACKEND_URL_LOCAL } from "../../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const navigate = useNavigate();

    async function publishPost() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                `${BACKEND_URL_LOCAL}/blogs`,
                { title, content },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setStatus("Post published successfully!");
            console.log("Post published:", response.data);
            navigate('/blogs')
        } catch (error) {
            setStatus("Error publishing post");
            console.error("Error:", error);
        }
    }

    return (
        <div className="px-40 py-20">
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <label className="block mb-2 mt-10 text-sm font-medium text-gray-900 dark:text-white">Write content here</label>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                ></textarea>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        publishPost();
                    }}
                    className="text-white mt-5 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5"
                >
                    Publish
                </button>
                {status && (
                    <p className={`mt-5 ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
                        {status}
                    </p>
                )}
            </form>
        </div>
    );
};
