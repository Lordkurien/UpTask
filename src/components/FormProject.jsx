import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [client, setClient] = useState("");

    const { showAlert, alert, submitProject } = useProjects();

    const handleSubmit = async e => {
        e.preventDefault();

        if ([name, description, deadline, client].includes("")) {
            showAlert({
                msg: "All fields are required",
                error: true
            });
            return
        }

        await submitProject({
            name,
            description,
            deadline,
            client
        });

        setName("");
        setDescription("");
        setDeadline("");
        setClient("");

    };
    
    const { msg } = alert;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            
            {msg && <Alert alert={alert} />}

            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="text-gray-500 uppercase font-bold text-sm "
                >
                    Name
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="project name"
                    id="name"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="text-gray-500 uppercase font-bold text-sm "
                >
                    Description
                </label>
                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="project description"
                    id="description"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="deadline"
                    className="text-gray-500 uppercase font-bold text-sm "
                >
                    Deadline
                </label>
                <input
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                    id="deadline"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="date"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="client"
                    className="text-gray-500 uppercase font-bold text-sm "
                >
                    Client
                </label>
                <input
                    onChange={(e) => setClient(e.target.value)}
                    value={client}
                    id="client"
                    placeholder="client&apos;s name"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    type="text"
                />
            </div>

            <input type="submit" value="create project" className="bg-sky-600 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors" />
        </form>
    );
};

export default FormProject
