import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TodoAPI() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [eTitle, seteTitle] = useState("");
    const [eDesc, seteDesc] = useState("");
    const [eTodo_id, setId] = useState("");
    const [todoes, setTodoes] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (i) => {
        setId(i);
        setShow(true);
    }

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
    const getTodoes = () => {
        fetch('https://akashsir.in/myapi/crud/todo-list-api.php')
            .then(response => response.json())
            .then(data => setTodoes(data));
    }

    useEffect(() => {
        getTodoes()
    }, [])

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
        getTodoes();
    }

    const onDelete = (tId) => {
        var obj = {
            "todo_id": tId,
        }
        const requestOptionsDelete = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch('https://akashsir.in/myapi/crud/todo-delete-json.php', requestOptionsDelete)
            .then(response => response.json())
            .then(data => alert(data.message));
        
        getTodoes();
    }

    const handelEdit = (e) => {
        e.preventDefault();
        if (!eTitle || !eDesc) {
            alert("Title or Description cannot be blank");
        }
        else {
            var obj = {
                "todo_id": eTodo_id,
                "todo_title": eTitle,
                "todo_details": eDesc
            }
            const requestOptionsEdit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            fetch('https://akashsir.in/myapi/crud/todo-edit-json.php', requestOptionsEdit)
                .then(response => response.json())
                .then(data => alert(data.message));
            getTodoes();
            handleClose();
            seteTitle("");
            seteDesc("");
        }
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
            {todoes?.todo_list?.slice(0).reverse().map((item, key) => {
                return (
                    <div className="mt-5 d-flex justify-content-between align-items-center w-50" key={key}>
                        <div>
                            <h4>{item.todo_title}</h4>
                            <p>{item.todo_details}</p>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-success me-3" onClick={() => { handleShow(item.todo_id) }}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => { onDelete(item.todo_id) }}>Delete</button>
                        </div>
                    </div>
                )
            })}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handelEdit}>
                        <div className="mb-3">
                            <input type="text" value={eTodo_id} className="form-control" hidden />
                            <label htmlFor="title" className="form-label">Todo Title</label>
                            <input type="text" value={eTitle} className="form-control" onChange={(e) => seteTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Todo Description</label>
                            <input type="text" value={eDesc} className="form-control" onChange={(e) => seteDesc(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-sm btn-success">Update Todo</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TodoAPI;
