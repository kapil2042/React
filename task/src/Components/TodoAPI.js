import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function TodoAPI() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    let redirect = useNavigate();
    const handelSubmit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }

    const addTodo = (t, d) => {
        var obj = {
            "todo_title": t,
            "todo_details": d
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('https://akashsir.in/myapi/crud/todo-add-json.php', requestOptions)
            .then(response => response.json())
            .then(data => alert(data.message));
    }
    return (
        <div className="m-5">
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} className="form-control" onChange={(e) => setDesc(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    );
}

export default TodoAPI;
